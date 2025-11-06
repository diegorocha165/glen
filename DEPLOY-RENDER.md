# 🚀 Guia Completo de Deploy no Render

## 📍 Estrutura do Projeto

```
glen/
├── backend/          ← Backend (deploy separado)
│   ├── src/
│   │   └── server.js
│   └── package.json
├── frontend/         ← Frontend (deploy separado)
│   ├── server.js
│   └── package.json
└── .gitignore
```

## 🔧 Deploy do Backend

### 1. Criar Web Service para Backend

1. Acesse [https://render.com](https://render.com)
2. Clique em **"New +"** > **"Web Service"**
3. Conecte seu repositório GitHub
4. Configure:

- **Name**: `hotel-backend`
- **Environment**: `Node`
- **Root Directory**: `backend/src` ⚠️ **IMPORTANTE**
- **Build Command**: `cd ../.. && cd backend && npm install`
- **Start Command**: `npm start`
- **Plan**: Free ou Paid

### 2. Variáveis de Ambiente do Backend

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=24h
PORT=10000
NODE_ENV=production
```

### 3. Deploy do Backend

Clique em **"Create Web Service"** e aguarde. Anote a URL gerada (ex: `https://hotel-backend.onrender.com`)

## 🎨 Deploy do Frontend

### 1. Criar Web Service para Frontend

1. No Render, clique em **"New +"** > **"Web Service"**
2. Selecione o mesmo repositório
3. Configure:

- **Name**: `hotel-frontend`
- **Environment**: `Node`
- **Root Directory**: `frontend` ⚠️ **IMPORTANTE: Sem `src/`**
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free ou Paid

### 2. Variáveis de Ambiente do Frontend

```
API_URL=https://hotel-backend.onrender.com/api
PORT=10000
NODE_ENV=production
```

**⚠️ IMPORTANTE**: Substitua `hotel-backend.onrender.com` pela URL real do seu backend.

### 3. Deploy do Frontend

Clique em **"Create Web Service"** e aguarde.

## ✅ Verificação

Após o deploy:

1. **Backend**: Acesse `https://hotel-backend.onrender.com/health`
   - Deve retornar: `{"success":true,"message":"API está funcionando",...}`

2. **Frontend**: Acesse a URL do frontend (ex: `https://hotel-frontend.onrender.com`)
   - Deve carregar a página inicial

## 🔍 Troubleshooting

### Erro: "Could not read package.json" no Frontend

**Causa**: Root Directory configurado incorretamente

**Solução**:
1. Vá em Settings do serviço frontend
2. Verifique o campo **Root Directory**
3. Deve estar: `frontend` (não `src/frontend` ou vazio)
4. Salve e faça Manual Deploy

### Erro: "Cannot find module" no Backend

**Causa**: Build Command não está instalando dependências corretamente

**Solução**:
- Altere Build Command para: `cd ../.. && cd backend && npm install`
- Ou configure Root Directory como `backend` e Build Command como `npm install`

### Frontend não conecta com Backend

**Causa**: URL da API incorreta ou CORS não configurado

**Solução**:
1. Verifique se `API_URL` está correta no frontend
2. Verifique se o backend tem CORS configurado para aceitar requisições do frontend
3. Verifique os logs do backend para erros de CORS

## 📝 Notas Importantes

1. **Root Directory é crítico**: Deve apontar para a pasta correta onde está o `package.json`
2. **Backend primeiro**: Sempre faça deploy do backend antes do frontend
3. **Variáveis de ambiente**: Nunca commite arquivos `.env`, configure no Render
4. **Logs**: Use a aba "Logs" no Render para debugar problemas

## 🔄 Atualizações

Após fazer push para o GitHub, o Render faz deploy automático. Para forçar um deploy:

1. Vá no serviço no Render
2. Clique em **"Manual Deploy"**
3. Selecione o branch e commit

