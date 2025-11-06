# 🚀 Deploy no Render

## ⚠️ IMPORTANTE: Configuração do Root Directory

O erro `Could not read package.json: Error: ENOENT: no such file or directory, open '/opt/render/project/src/frontend/package.json'` ocorre porque o Render está procurando o arquivo no caminho errado.

## ✅ Configuração Correta no Render

### 1. Criar um novo serviço Web no Render

1. Acesse [https://render.com](https://render.com)
2. Clique em **"New +"** > **"Web Service"**
3. Conecte seu repositório GitHub
4. Configure as seguintes opções:

#### Configurações Obrigatórias:

- **Name**: `hotel-frontend` (ou o nome que preferir)
- **Environment**: `Node`
- **Root Directory**: `frontend` ⚠️ **IMPORTANTE: Deixe como `frontend` (sem `src/` antes)**
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Escolha o plano (Free tier funciona)

### 2. Configurar Variáveis de Ambiente

No painel do Render, vá em **Environment** e adicione:

```
API_URL=https://seu-backend.onrender.com/api
PORT=10000
NODE_ENV=production
```

**Importante**: 
- Substitua `seu-backend.onrender.com` pela URL real do seu backend no Render
- Se você ainda não fez deploy do backend, faça primeiro e depois atualize esta variável

### 3. Deploy

Clique em **"Create Web Service"** e aguarde o deploy.

## 🔧 Se o Erro Persistir

### Opção 1: Verificar Root Directory

1. No painel do Render, vá em **Settings**
2. Verifique o campo **Root Directory**
3. Deve estar configurado como: `frontend` (não `src/frontend` ou vazio)
4. Se estiver errado, altere e salve
5. Faça um novo deploy manual (Menu > Manual Deploy)

### Opção 2: Usar Build Command com caminho

Se por algum motivo o Root Directory não funcionar, use:

- **Build Command**: `cd frontend && npm install`
- **Start Command**: `cd frontend && npm start`
- **Root Directory**: deixe vazio (raiz do repositório)

### Opção 3: Verificar estrutura do repositório

Certifique-se de que a estrutura do repositório está assim:

```
glen/
├── backend/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── package.json  ← Este arquivo deve existir
│   ├── server.js
│   └── ...
└── .gitignore
```

## 📋 Checklist de Deploy

- [ ] Repositório conectado ao Render
- [ ] Root Directory configurado como `frontend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Variável `API_URL` configurada com a URL do backend
- [ ] Variável `PORT` configurada (opcional, Render define automaticamente)
- [ ] Variável `NODE_ENV` configurada como `production`

## 🧪 Testar Localmente Antes do Deploy

Para garantir que tudo funciona:

```bash
cd frontend
npm install
npm start
```

O frontend deve iniciar em `http://localhost:3001` (ou na porta definida pela variável PORT).

## 📚 Estrutura de Arquivos

O frontend inclui:
- `package.json` - Dependências e scripts
- `server.js` - Servidor Express para servir arquivos estáticos
- `render.yaml` - Configuração do Render (opcional, pode ser ignorado se configurar manualmente)

## 🔍 Troubleshooting

### Erro: "Missing script: build"

**Causa**: O Render está tentando executar `npm run build`, mas o script não existe.

**Solução**: ✅ **JÁ CORRIGIDO** - O script `build` foi adicionado ao `package.json`. Se o erro persistir:
1. Verifique se o `package.json` tem o script `build`
2. Faça um novo deploy

### Erro: "Could not read package.json"
- ✅ Verifique se o **Root Directory** está configurado como `frontend`
- ✅ Verifique se o arquivo `frontend/package.json` existe no repositório
- ✅ Verifique se o repositório foi atualizado no GitHub

### Erro: "Cannot find module"
- ✅ Execute `npm install` localmente para verificar dependências
- ✅ Verifique se o `package.json` tem todas as dependências necessárias

### Frontend não consegue conectar com o backend
- ✅ Verifique se a variável de ambiente `API_URL` está configurada corretamente
- ✅ Verifique se o backend está rodando e acessível
- ✅ Verifique as configurações de CORS no backend

### Páginas retornam 404
- ✅ Verifique se o `server.js` está configurado corretamente
- ✅ Verifique se todas as rotas estão definidas

## 📞 Suporte

Se o problema persistir:
1. Verifique os logs do Render (aba "Logs")
2. Verifique se o repositório está atualizado no GitHub
3. Tente fazer um deploy manual após corrigir as configurações
