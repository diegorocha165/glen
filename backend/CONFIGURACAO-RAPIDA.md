# ⚡ Configuração Rápida

## 🚨 Erro: "Invalid supabaseUrl" ou "Missing Supabase configuration"

Este erro ocorre porque o arquivo `.env` ainda não foi configurado com as credenciais reais do Supabase.

## 📝 Passo a Passo

### 1. Obter credenciais do Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta gratuita
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: Nome do seu projeto (ex: "hotel-glen")
   - **Database Password**: Escolha uma senha forte
   - **Region**: Escolha a região mais próxima
5. Aguarde alguns minutos enquanto o projeto é criado

### 2. Copiar as credenciais

1. No projeto criado, vá em **Settings** (ícone de engrenagem) no menu lateral
2. Clique em **API**
3. Na seção **Project API keys**, você verá:
   - **Project URL** → Copie este valor
   - **service_role** key → Copie este valor (⚠️ **NÃO** use a `anon` key)

### 3. Gerar JWT Secret

Execute no terminal (na pasta `backend/`):

```bash
npm run generate-secret
```

Ou:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie a chave gerada.

### 4. Editar o arquivo .env

Abra o arquivo `backend/.env` e substitua os valores:

```env
# Substitua pelos valores reais do Supabase
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1ODk4NDAwLCJleHAiOjE5NjE0NzQ0MDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Substitua pela chave gerada
JWT_SECRET=d590f7e9d6acd6565e3283bdd6d5a5b8a2df23bab7d0ef5deac984a04936db1bf6c22165ad83a8b02b1a90ded10d3cea24e8a3454f5d793b71466eda0f72e6df

# Estes podem ficar como estão
PORT=3000
NODE_ENV=development
JWT_EXPIRES_IN=24h
```

### 5. Criar a tabela no banco de dados

1. No Supabase, vá em **SQL Editor** (no menu lateral)
2. Clique em **New Query**
3. Abra o arquivo `backend/database/schema.sql` e copie todo o conteúdo
4. Cole no SQL Editor do Supabase
5. Clique em **Run** (ou pressione Ctrl+Enter)

### 6. Validar a configuração

Execute:

```bash
npm run validate-env
```

Se tudo estiver correto, você verá:
```
✅ Todas as variáveis obrigatórias estão configuradas!
🚀 Você pode iniciar o servidor com: npm start
```

### 7. Iniciar o servidor

```bash
npm start
```

## 🔍 Verificar se está funcionando

Após iniciar o servidor, você deve ver:

```
🚀 Servidor rodando na porta 3000
📊 Ambiente: development
🔗 Health check: http://localhost:3000/health
👥 API de usuários: http://localhost:3000/api/usuarios
```

Teste acessando: http://localhost:3000/health

## ❓ Problemas Comuns

### Erro: "Invalid supabaseUrl"
- Verifique se a URL começa com `https://`
- Verifique se não há espaços extras
- Certifique-se de copiar a URL completa

### Erro: "Missing Supabase configuration"
- Verifique se o arquivo `.env` existe na pasta `backend/`
- Verifique se não há espaços antes ou depois do `=`
- Execute `npm run validate-env` para diagnosticar

### Erro de conexão com o banco
- Verifique se o projeto do Supabase está ativo
- Verifique se você copiou a `service_role` key (não a `anon` key)
- Verifique se a tabela `usuarios` foi criada

## 📚 Mais informações

Consulte `SETUP.md` para documentação completa.

