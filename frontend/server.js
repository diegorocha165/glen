const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// URL da API do backend (configurável via variável de ambiente)
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Habilitar CORS
app.use(cors());

// Função para injetar a URL da API no HTML
function injectApiUrl(html) {
  const apiScript = `<script>window.API_BASE_URL = '${API_URL}';</script>`;
  // Injetar antes do fechamento do </head> ou no início do <body> se não houver </head>
  if (html.includes('</head>')) {
    return html.replace('</head>', `${apiScript}</head>`);
  } else if (html.includes('<body>')) {
    return html.replace('<body>', `<body>${apiScript}`);
  }
  return html;
}

// Rota para todas as páginas HTML (com injeção da URL da API)
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');
  html = injectApiUrl(html);
  res.send(html);
});

app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, 'login.html');
  let html = fs.readFileSync(filePath, 'utf8');
  html = injectApiUrl(html);
  res.send(html);
});

app.get('/cadastro', (req, res) => {
  const filePath = path.join(__dirname, 'cadastro.html');
  let html = fs.readFileSync(filePath, 'utf8');
  html = injectApiUrl(html);
  res.send(html);
});

// Servir arquivos estáticos (CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname)));

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Frontend está funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
  console.log(`📄 Página inicial: http://localhost:${PORT}`);
  console.log(`🔐 Login: http://localhost:${PORT}/login`);
  console.log(`📝 Cadastro: http://localhost:${PORT}/cadastro`);
  console.log(`🔗 API URL configurada: ${API_URL}`);
});

