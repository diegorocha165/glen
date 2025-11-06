const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/database');
const Usuario = require('../models/Usuario');

class UsuarioController {
  // Criar novo usuário (cadastro)
  static async create(req, res) {
    try {
      const { nome, cpf, email, telefone, endereco, senha } = req.body;

      // Verificar se email já existe
      const { data: existingEmail } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .single();

      if (existingEmail) {
        return res.status(400).json({
          error: 'Email já cadastrado',
          message: 'Este email já está sendo usado por outro usuário'
        });
      }

      // Verificar se CPF já existe
      const { data: existingCPF } = await supabase
        .from('usuarios')
        .select('id')
        .eq('cpf', cpf)
        .single();

      if (existingCPF) {
        return res.status(400).json({
          error: 'CPF já cadastrado',
          message: 'Este CPF já está sendo usado por outro usuário'
        });
      }

      // Criptografar senha
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      // Inserir usuário no banco
      const { data: newUsuario, error } = await supabase
        .from('usuarios')
        .insert([{
          nome,
          cpf,
          email,
          telefone: telefone || null,
          endereco: endereco || null,
          senha: hashedPassword
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({
          error: 'Erro interno do servidor',
          message: 'Não foi possível criar o usuário'
        });
      }

      // Criar token JWT
      const token = jwt.sign(
        { userId: newUsuario.id, email: newUsuario.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      const usuario = new Usuario(newUsuario);

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        usuario: usuario.toPublic(),
        token
      });

    } catch (error) {
      console.error('Erro no create:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao criar usuário'
      });
    }
  }

  // Login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Buscar usuário por email
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !usuario) {
        return res.status(401).json({
          error: 'Credenciais inválidas',
          message: 'Email ou senha incorretos'
        });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Credenciais inválidas',
          message: 'Email ou senha incorretos'
        });
      }

      // Criar token JWT
      const token = jwt.sign(
        { userId: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      const userObj = new Usuario(usuario);

      res.json({
        message: 'Login realizado com sucesso',
        usuario: userObj.toPublic(),
        token
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao fazer login'
      });
    }
  }

  // Buscar todos os usuários (apenas para admin)
  static async getAll(req, res) {
    try {
      const { data: usuarios, error } = await supabase
        .from('usuarios')
        .select('id, nome, cpf, email, telefone, endereco, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({
          error: 'Erro interno do servidor',
          message: 'Não foi possível buscar os usuários'
        });
      }

      res.json({
        message: 'Usuários encontrados',
        usuarios,
        total: usuarios.length
      });

    } catch (error) {
      console.error('Erro no getAll:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao buscar usuários'
      });
    }
  }

  // Buscar usuário por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('id, nome, cpf, email, telefone, endereco, created_at, updated_at')
        .eq('id', id)
        .single();

      if (error || !usuario) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
          message: 'Não foi possível encontrar o usuário com o ID fornecido'
        });
      }

      res.json({
        message: 'Usuário encontrado',
        usuario
      });

    } catch (error) {
      console.error('Erro no getById:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao buscar usuário'
      });
    }
  }

  // Atualizar usuário
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Se estiver atualizando a senha, criptografar
      if (updateData.senha) {
        const saltRounds = 12;
        updateData.senha = await bcrypt.hash(updateData.senha, saltRounds);
      }

      // Se estiver atualizando email, verificar se já existe
      if (updateData.email) {
        const { data: existingEmail } = await supabase
          .from('usuarios')
          .select('id')
          .eq('email', updateData.email)
          .neq('id', id)
          .single();

        if (existingEmail) {
          return res.status(400).json({
            error: 'Email já cadastrado',
            message: 'Este email já está sendo usado por outro usuário'
          });
        }
      }

      // Se estiver atualizando CPF, verificar se já existe
      if (updateData.cpf) {
        const { data: existingCPF } = await supabase
          .from('usuarios')
          .select('id')
          .eq('cpf', updateData.cpf)
          .neq('id', id)
          .single();

        if (existingCPF) {
          return res.status(400).json({
            error: 'CPF já cadastrado',
            message: 'Este CPF já está sendo usado por outro usuário'
          });
        }
      }

      // Atualizar usuário
      const { data: updatedUsuario, error } = await supabase
        .from('usuarios')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('id, nome, cpf, email, telefone, endereco, created_at, updated_at')
        .single();

      if (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({
          error: 'Erro interno do servidor',
          message: 'Não foi possível atualizar o usuário'
        });
      }

      res.json({
        message: 'Usuário atualizado com sucesso',
        usuario: updatedUsuario
      });

    } catch (error) {
      console.error('Erro no update:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao atualizar usuário'
      });
    }
  }

  // Deletar usuário
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({
          error: 'Erro interno do servidor',
          message: 'Não foi possível deletar o usuário'
        });
      }

      res.json({
        message: 'Usuário deletado com sucesso'
      });

    } catch (error) {
      console.error('Erro no delete:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao deletar usuário'
      });
    }
  }

  // Buscar perfil do usuário logado
  static async getProfile(req, res) {
    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('id, nome, cpf, email, telefone, endereco, created_at, updated_at')
        .eq('id', req.user.id)
        .single();

      if (error || !usuario) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
          message: 'Não foi possível encontrar o perfil do usuário'
        });
      }

      res.json({
        message: 'Perfil encontrado',
        usuario
      });

    } catch (error) {
      console.error('Erro no getProfile:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro inesperado ao buscar perfil'
      });
    }
  }
}

module.exports = UsuarioController;

