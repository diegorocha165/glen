# 🚀 Deploy no Render

## Configuração do Frontend no Render

### 1. Criar um novo serviço Web no Render

1. Acesse [https://render.com](https://render.com)
2. Clique em **"New +"** > **"Web Service"**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `hotel-frontend` (ou o nome que preferir)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `frontend` (se o repositório tiver backend e frontend na raiz)

### 2. Configurar Variáveis de Ambiente

No painel do Render, vá em **Environment** e adicione:

```
API_URL=https://seu-backend.onrender.com/api
PORT=10000
NODE_ENV=production
```

**Importante**: Substitua `seu-backend.onrender.com` pela URL real do seu backend no Render.

### 3. Deploy

Clique em **"Create Web Service"** e aguarde o deploy.

## Estrutura de Arquivos

O frontend agora inclui:
- `package.json` - Dependências e scripts
- `server.js` - Servidor Express para servir arquivos estáticos
- `render.yaml` - Configuração do Render (opcional)

## Como Funciona

1. O servidor Express (`server.js`) serve os arquivos HTML, CSS e JavaScript
2. A URL da API é injetada automaticamente nos arquivos HTML via JavaScript
3. O frontend detecta automaticamente se está em desenvolvimento ou produção

## Configuração da URL da API

A URL da API pode ser configurada de 3 formas (em ordem de prioridade):

1. **Variável de ambiente `API_URL`** (recomendado para produção)
2. **Meta tag no HTML** (fallback)
3. **Detecção automática** (desenvolvimento local)

## Troubleshooting

### Erro: "Could not read package.json"
- Certifique-se de que o `package.json` existe na pasta `frontend/`
- Verifique se o **Root Directory** está configurado corretamente no Render

### Erro: "Cannot find module"
- Execute `npm install` localmente para verificar se todas as dependências estão corretas
- Verifique se o `package.json` tem todas as dependências necessárias

### Frontend não consegue conectar com o backend
- Verifique se a variável de ambiente `API_URL` está configurada corretamente
- Certifique-se de que o backend está rodando e acessível
- Verifique as configurações de CORS no backend

### Páginas retornam 404
- Verifique se o `server.js` está configurado corretamente
- Certifique-se de que todas as rotas estão definidas

## Desenvolvimento Local

Para testar localmente:

```bash
cd frontend
npm install
npm start
```

O frontend estará disponível em `http://localhost:3001`

## Produção

Após o deploy, o Render fornecerá uma URL como:
`https://hotel-frontend.onrender.com`

Certifique-se de configurar a variável `API_URL` com a URL do seu backend.

