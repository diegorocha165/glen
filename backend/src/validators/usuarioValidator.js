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
    .pattern(/^[\d\s\(\)\-\+]+$/)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Telefone deve ter no máximo 15 caracteres',
      'string.pattern.base': 'Telefone deve conter apenas números, espaços, parênteses, hífens e +'
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
    .pattern(/^[\d\s\(\)\-\+]+$/)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Telefone deve ter no máximo 15 caracteres',
      'string.pattern.base': 'Telefone deve conter apenas números, espaços, parênteses, hífens e +'
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
}).min(1).messages({
  'object.min': 'Pelo menos um campo deve ser fornecido para atualização'
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

// Schema para parâmetros de paginação
const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Página deve ser um número',
      'number.integer': 'Página deve ser um número inteiro',
      'number.min': 'Página deve ser maior que 0'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.base': 'Limite deve ser um número',
      'number.integer': 'Limite deve ser um número inteiro',
      'number.min': 'Limite deve ser maior que 0',
      'number.max': 'Limite deve ser menor ou igual a 100'
    })
});

// Middleware de validação
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors
      });
    }
    
    req.body = value;
    next();
  };
};

// Middleware de validação para query parameters
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Parâmetros de consulta inválidos',
        errors
      });
    }
    
    req.query = value;
    next();
  };
};

module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  loginSchema,
  paginationSchema,
  validate,
  validateQuery
};


