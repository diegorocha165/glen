const jwt = require('jsonwebtoken');
const supabase = require('../config/database');

// Middleware para verificar token JWT
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acesso requerido',
      message: 'Você precisa estar logado para acessar este recurso'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar se o usuário ainda existe no banco
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('id, nome, email, cpf')
      .eq('id', decoded.userId)
      .single();

    if (error || !usuario) {
      return res.status(401).json({ 
        error: 'Token inválido',
        message: 'Usuário não encontrado'
      });
    }

    req.user = usuario;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        message: 'Faça login novamente'
      });
    }
    
    return res.status(403).json({ 
      error: 'Token inválido',
      message: 'Token malformado ou inválido'
    });
  }
};

// Middleware opcional - não bloqueia se não houver token
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('id, nome, email, cpf')
      .eq('id', decoded.userId)
      .single();

    req.user = usuario || null;
  } catch (error) {
    req.user = null;
  }

  next();
};

module.exports = {
  authenticateToken,
  optionalAuth
};

