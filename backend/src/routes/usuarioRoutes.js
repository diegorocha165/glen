const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { 
  validate, 
  validateQuery,
  createUsuarioSchema, 
  updateUsuarioSchema, 
  loginSchema, 
  paginationSchema 
} = require('../validators/usuarioValidator');

const router = express.Router();

// Rota para login
router.post('/login', validate(loginSchema), UsuarioController.login);

// Rota para cadastro (criar usuário)
router.post('/', validate(createUsuarioSchema), UsuarioController.create);

// Rota para listar todos os usuários (com paginação)
router.get('/', validateQuery(paginationSchema), UsuarioController.findAll);

// Rota para buscar usuário por ID
router.get('/:id', UsuarioController.findById);

// Rota para atualizar usuário
router.put('/:id', validate(updateUsuarioSchema), UsuarioController.update);

// Rota para soft delete
router.delete('/:id', UsuarioController.delete);

// Rota para restaurar usuário
router.patch('/:id/restore', UsuarioController.restore);

module.exports = router;


