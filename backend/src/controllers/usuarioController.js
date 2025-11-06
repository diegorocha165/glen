const Usuario = require('../models/Usuario');

class UsuarioController {
  // Criar novo usuário
  static async create(req, res) {
    try {
      const { nome, cpf, email, telefone, endereco, senha } = req.body;

      // Verificar se email já existe
      const existingEmail = await Usuario.findByEmail(email);
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'Email já está em uso'
        });
      }

      // Verificar se CPF já existe
      const existingCpf = await Usuario.findByCpf(cpf);
      if (existingCpf) {
        return res.status(409).json({
          success: false,
          message: 'CPF já está em uso'
        });
      }

      const usuario = await Usuario.create({
        nome,
        cpf,
        email,
        telefone,
        endereco,
        senha
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: usuario.toPublicObject()
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Buscar usuário por ID
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const includeDeleted = req.query.includeDeleted === 'true';

      const usuario = await Usuario.findById(id, includeDeleted);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: usuario.toPublicObject()
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Listar todos os usuários
  static async findAll(req, res) {
    try {
      const { page, limit } = req.query;

      const result = await Usuario.findAll(page, limit);

      res.json({
        success: true,
        data: result.usuarios.map(usuario => usuario.toPublicObject()),
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages
        }
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Atualizar usuário
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const usuario = await Usuario.findById(id);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Verificar se email já existe (se estiver sendo atualizado)
      if (updateData.email && updateData.email !== usuario.email) {
        const existingEmail = await Usuario.findByEmail(updateData.email);
        if (existingEmail) {
          return res.status(409).json({
            success: false,
            message: 'Email já está em uso'
          });
        }
      }

      // Verificar se CPF já existe (se estiver sendo atualizado)
      if (updateData.cpf && updateData.cpf !== usuario.cpf) {
        const existingCpf = await Usuario.findByCpf(updateData.cpf);
        if (existingCpf) {
          return res.status(409).json({
            success: false,
            message: 'CPF já está em uso'
          });
        }
      }

      await usuario.update(updateData);

      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuario.toPublicObject()
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Soft delete - deletar usuário
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findById(id);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      await usuario.softDelete();

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Restaurar usuário
  static async restore(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findById(id, true); // includeDeleted = true
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      if (!usuario.deleted_at) {
        return res.status(400).json({
          success: false,
          message: 'Usuário não está deletado'
        });
      }

      await usuario.restore();

      res.json({
        success: true,
        message: 'Usuário restaurado com sucesso',
        data: usuario.toPublicObject()
      });
    } catch (error) {
      console.error('Erro ao restaurar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findByEmail(email);
      
      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      const isPasswordValid = await usuario.checkPassword(senha);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: usuario.toPublicObject()
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = UsuarioController;


