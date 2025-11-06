const supabase = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.email = data.email;
    this.telefone = data.telefone;
    this.endereco = data.endereco;
    this.senha = data.senha;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at;
  }

  // Criar novo usuário
  static async create(usuarioData) {
    try {
      // Hash da senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);

      const { data, error } = await supabase
        .from('usuarios')
        .insert([
          {
            nome: usuarioData.nome,
            cpf: usuarioData.cpf,
            email: usuarioData.email,
            telefone: usuarioData.telefone,
            endereco: usuarioData.endereco,
            senha: hashedPassword,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return new Usuario(data);
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // Buscar usuário por ID (incluindo soft deleted)
  static async findById(id, includeDeleted = false) {
    try {
      let query = supabase
        .from('usuarios')
        .select('*')
        .eq('id', id);

      if (!includeDeleted) {
        query = query.is('deleted_at', null);
      }

      const { data, error } = await query.single();

      if (error) throw error;
      return data ? new Usuario(data) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  // Buscar usuário por email
  static async findByEmail(email, includeDeleted = false) {
    try {
      let query = supabase
        .from('usuarios')
        .select('*')
        .eq('email', email);

      if (!includeDeleted) {
        query = query.is('deleted_at', null);
      }

      const { data, error } = await query.single();

      if (error) throw error;
      return data ? new Usuario(data) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  // Buscar usuário por CPF
  static async findByCpf(cpf, includeDeleted = false) {
    try {
      let query = supabase
        .from('usuarios')
        .select('*')
        .eq('cpf', cpf);

      if (!includeDeleted) {
        query = query.is('deleted_at', null);
      }

      const { data, error } = await query.single();

      if (error) throw error;
      return data ? new Usuario(data) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por CPF: ${error.message}`);
    }
  }

  // Listar todos os usuários (sem soft deleted)
  static async findAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact' })
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        usuarios: data.map(usuario => new Usuario(usuario)),
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      };
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  // Atualizar usuário
  async update(updateData) {
    try {
      const updateFields = {
        ...updateData,
        updated_at: new Date().toISOString()
      };

      // Se estiver atualizando a senha, fazer hash
      if (updateData.senha) {
        const saltRounds = 10;
        updateFields.senha = await bcrypt.hash(updateData.senha, saltRounds);
      }

      const { data, error } = await supabase
        .from('usuarios')
        .update(updateFields)
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;

      // Atualizar propriedades da instância
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  // Soft delete - marcar como deletado
  async softDelete() {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .update({ 
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;

      this.deleted_at = data.deleted_at;
      this.updated_at = data.updated_at;
      return this;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  // Restaurar usuário (remover soft delete)
  async restore() {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .update({ 
          deleted_at: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;

      this.deleted_at = null;
      this.updated_at = data.updated_at;
      return this;
    } catch (error) {
      throw new Error(`Erro ao restaurar usuário: ${error.message}`);
    }
  }

  // Verificar senha
  async checkPassword(password) {
    return await bcrypt.compare(password, this.senha);
  }

  // Converter para objeto público (sem senha)
  toPublicObject() {
    const { senha, ...publicData } = this;
    return publicData;
  }
}

module.exports = Usuario;


