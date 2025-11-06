# Configuração do Backend

## Variáveis de Ambiente

Para o servidor funcionar, você precisa criar um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

### 1. Criar o arquivo .env

Crie um arquivo chamado `.env` na pasta `backend/` com o seguinte conteúdo:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
```

### 2. Obter as credenciais do Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Vá em **Settings** > **API**
5. Copie os seguintes valores:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Gerar JWT_SECRET

Para o `JWT_SECRET`, você pode gerar uma string aleatória segura. Algumas opções:

**Opção 1: Usando Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Opção 2: Usando OpenSSL**
```bash
openssl rand -hex 64
```

**Opção 3: Usar uma string aleatória qualquer (mínimo 32 caracteres)**
```env
JWT_SECRET=minha_chave_secreta_super_segura_123456789
```

### 4. Criar a tabela no Supabase

Execute o SQL do arquivo `database/schema.sql` no SQL Editor do Supabase:

1. Acesse seu projeto no Supabase
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Cole o conteúdo do arquivo `database/schema.sql`
5. Execute a query

### 5. Exemplo de arquivo .env completo

```env
# Supabase Configuration
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTg5ODQwMCwiZXhwIjoxOTYxNDc0NDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1ODk4NDAwLCJleHAiOjE5NjE0NzQ0MDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRES_IN=24h
```

### 6. Instalar dependências

```bash
cd backend
npm install
```

### 7. Iniciar o servidor

```bash
npm start
```

## Troubleshooting

### Erro: "Missing Supabase configuration"
- Verifique se o arquivo `.env` existe na pasta `backend/`
- Verifique se todas as variáveis estão preenchidas corretamente
- Certifique-se de que não há espaços extras nas variáveis

### Erro de conexão com Supabase
- Verifique se as credenciais estão corretas
- Verifique se o projeto do Supabase está ativo
- Verifique se a tabela `usuarios` foi criada

### Erro de autenticação JWT
- Verifique se o `JWT_SECRET` está configurado
- Certifique-se de usar o mesmo `JWT_SECRET` em todas as requisições

