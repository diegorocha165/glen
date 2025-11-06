// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado:', err);

  // Erro de validação do Joi
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Erro de sintaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido'
    });
  }

  // Erro de conexão com banco de dados
  if (err.code && err.code.startsWith('PGRST')) {
    return res.status(500).json({
      success: false,
      message: 'Erro de conexão com o banco de dados'
    });
  }

  // Erro padrão
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// Middleware para rotas não encontradas
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota ${req.method} ${req.originalUrl} não encontrada`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};


