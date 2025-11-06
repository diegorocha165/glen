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

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Função para servir arquivo HTML com tratamento de erro
function serveHtml(fileName, req, res) {
  try {
    const filePath = path.join(__dirname, fileName);
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      console.error(`Arquivo não encontrado: ${filePath}`);
      return res.status(404).send(`
        <html>
          <head><title>404 - Arquivo não encontrado</title></head>
          <body>
            <h1>404 - Arquivo não encontrado</h1>
            <p>O arquivo ${fileName} não foi encontrado.</p>
            <p>Diretório atual: ${__dirname}</p>
          </body>
        </html>
      `);
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    html = injectApiUrl(html);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error(`Erro ao servir ${fileName}:`, error);
    res.status(500).send(`
      <html>
        <head><title>500 - Erro do servidor</title></head>
        <body>
          <h1>500 - Erro do servidor</h1>
          <p>Erro ao carregar a página: ${error.message}</p>
        </body>
      </html>
    `);
  }
}

// Rota de health check (antes de tudo)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Frontend está funcionando',
    directory: __dirname,
    files: fs.readdirSync(__dirname).filter(f => f.endsWith('.html'))
  });
});

// Rotas específicas para páginas HTML (antes do static)
app.get('/', (req, res) => {
  serveHtml('index.html', req, res);
});

app.get('/login', (req, res) => {
  serveHtml('login.html', req, res);
});

app.get('/cadastro', (req, res) => {
  serveHtml('cadastro.html', req, res);
});

// Servir arquivos estáticos (CSS, JS, imagens, etc.) - DEPOIS das rotas específicas
app.use(express.static(__dirname, {
  index: false, // Não servir index.html automaticamente
  extensions: ['html', 'css', 'js', 'json', 'png', 'jpg', 'jpeg', 'gif', 'svg']
}));

// Rota catch-all para 404
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head><title>404 - Página não encontrada</title></head>
      <body>
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <p><a href="/">Voltar para a página inicial</a></p>
      </body>
    </html>
  `);
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).send(`
    <html>
      <head><title>500 - Erro do servidor</title></head>
      <body>
        <h1>500 - Erro do servidor</h1>
        <p>Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.</p>
      </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
  console.log(`📄 Página inicial: http://localhost:${PORT}`);
  console.log(`🔐 Login: http://localhost:${PORT}/login`);
  console.log(`📝 Cadastro: http://localhost:${PORT}/cadastro`);
  console.log(`🔗 API URL configurada: ${API_URL}`);
  console.log(`📁 Diretório: ${__dirname}`);
  console.log(`📋 Arquivos HTML disponíveis:`, fs.readdirSync(__dirname).filter(f => f.endsWith('.html')));
});

