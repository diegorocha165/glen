const Joi = require('joi');

// Schema para criação de usuário
const createUsuarioSchema = Joi.object({
  nome: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres',
      'any.required': 'Nome é obrigatório'
    }),
  
  cpf: Joi.string()
    .length(11)
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.length': 'CPF deve ter exatamente 11 dígitos',
      'string.pattern.base': 'CPF deve conter apenas números',
      'any.required': 'CPF é obrigatório'
    }),
  
  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.email': 'Email deve ter um formato válido',
      'string.max': 'Email deve ter no máximo 100 caracteres',
      'any.required': 'Email é obrigatório'
    }),
  
  telefone: Joi.string()
    .max(15)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Telefone deve ter no máximo 15 caracteres'
    }),
  
  endereco: Joi.string()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Endereço deve ter no máximo 200 caracteres'
    }),
  
  senha: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'string.max': 'Senha deve ter no máximo 255 caracteres',
      'any.required': 'Senha é obrigatória'
    })
});

// Schema para atualização de usuário
const updateUsuarioSchema = Joi.object({
  nome: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres'
    }),
  
  cpf: Joi.string()
    .length(11)
    .pattern(/^\d{11}$/)
    .optional()
    .messages({
      'string.length': 'CPF deve ter exatamente 11 dígitos',
      'string.pattern.base': 'CPF deve conter apenas números'
    }),
  
  email: Joi.string()
    .email()
    .max(100)
    .optional()
    .messages({
      'string.email': 'Email deve ter um formato válido',
      'string.max': 'Email deve ter no máximo 100 caracteres'
    }),
  
  telefone: Joi.string()
    .max(15)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Telefone deve ter no máximo 15 caracteres'
    }),
  
  endereco: Joi.string()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Endereço deve ter no máximo 200 caracteres'
    }),
  
  senha: Joi.string()
    .min(6)
    .max(255)
    .optional()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'string.max': 'Senha deve ter no máximo 255 caracteres'
    })
});

// Schema para login
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email deve ter um formato válido',
      'any.required': 'Email é obrigatório'
    }),
  
  senha: Joi.string()
    .required()
    .messages({
      'any.required': 'Senha é obrigatória'
    })
});

module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  loginSchema
};

