/**
 * Modelo de Usuário baseado na estrutura da tabela usuarios
 * Campos: id, nome, cpf, email, telefone, endereco, senha
 */

class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.email = data.email;
    this.telefone = data.telefone || null;
    this.endereco = data.endereco || null;
    this.senha = data.senha;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Retorna dados públicos (sem senha)
  toPublic() {
    return {
      id: this.id,
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
      endereco: this.endereco,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  // Valida se o CPF tem 11 dígitos
  static isValidCPF(cpf) {
    return /^\d{11}$/.test(cpf);
  }

  // Valida formato do email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Valida se o nome tem pelo menos 2 caracteres
  static isValidNome(nome) {
    return nome && nome.trim().length >= 2;
  }

  // Valida se a senha tem pelo menos 6 caracteres
  static isValidSenha(senha) {
    return senha && senha.length >= 6;
  }
}

module.exports = Usuario;

