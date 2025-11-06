const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { authenticateToken } = require('../middleware/auth');
const { createUsuarioSchema, updateUsuarioSchema, loginSchema } = require('../validators/usuarioValidator');

// Middleware para validação
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Dados inválidos',
        message: error.details[0].message,
        details: error.details
      });
    }
    next();
  };
};

// Rotas públicas
router.post('/cadastro', validate(createUsuarioSchema), UsuarioController.create);
router.post('/login', validate(loginSchema), UsuarioController.login);

// Rotas protegidas (requerem autenticação)
router.get('/perfil', authenticateToken, UsuarioController.getProfile);
router.get('/', authenticateToken, UsuarioController.getAll);
router.get('/:id', authenticateToken, UsuarioController.getById);
router.put('/:id', authenticateToken, validate(updateUsuarioSchema), UsuarioController.update);
router.delete('/:id', authenticateToken, UsuarioController.delete);

module.exports = router;

