# API CRUD de Usuários com Soft Delete

API RESTful para gerenciamento de usuários com soft delete, desenvolvida com Node.js, Express e Supabase.

## 🚀 Funcionalidades

- ✅ CRUD completo de usuários
- ✅ Soft delete (exclusão lógica)
- ✅ Sistema de login e cadastro
- ✅ Validação de dados com Joi
- ✅ Paginação
- ✅ Rate limiting
- ✅ Tratamento de erros
- ✅ Logs de requisições
- ✅ Segurança com Helmet e CORS

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Conta no Supabase
- Banco de dados PostgreSQL (via Supabase)

## 🛠️ Instalação

1. Clone o repositório e navegue até a pasta backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

4. Edite o arquivo `.env` com suas credenciais do Supabase:
```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
PORT=3000
NODE_ENV=development
```

## 🗄️ Estrutura da Tabela

A tabela `usuarios` deve ter a seguinte estrutura:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(15),
  endereco VARCHAR(200),
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);
```

## 🚀 Executando a API

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api/usuarios
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

#### 2. Login
```http
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "usuario@exemplo.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua das Flores, 123",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z",
    "deleted_at": null
  }
}
```

#### 3. Cadastro (Criar Usuário)
```http
POST /api/usuarios
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "usuario@exemplo.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123",
  "senha": "senha123"
}
```

#### 4. Listar Usuários (com paginação)
```http
GET /api/usuarios?page=1&limit=10
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "cpf": "12345678901",
      "email": "usuario@exemplo.com",
      "telefone": "(11) 99999-9999",
      "endereco": "Rua das Flores, 123",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z",
      "deleted_at": null
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

#### 5. Buscar Usuário por ID
```http
GET /api/usuarios/1
```

#### 6. Atualizar Usuário
```http
PUT /api/usuarios/1
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "telefone": "(11) 88888-8888"
}
```

#### 7. Deletar Usuário (Soft Delete)
```http
DELETE /api/usuarios/1
```

#### 8. Restaurar Usuário
```http
PATCH /api/usuarios/1/restore
```

### Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (email/CPF já existe)
- `429` - Muitas tentativas (rate limit)
- `500` - Erro interno do servidor

### Estrutura de Resposta de Erro

```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": [
    {
      "field": "email",
      "message": "Email deve ter um formato válido"
    }
  ]
}
```

## 🔒 Segurança

- **Rate Limiting**: 100 requests por 15 minutos por IP
- **Login Rate Limiting**: 5 tentativas por 15 minutos por IP
- **Helmet**: Headers de segurança
- **CORS**: Configurado para domínios específicos
- **Validação**: Todos os dados são validados com Joi
- **Senhas**: Hash com bcrypt (salt rounds: 10)

## 🧪 Testando a API

### Com cURL

**Login:**
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@exemplo.com","senha":"senha123"}'
```

**Criar usuário:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome":"João Silva",
    "cpf":"12345678901",
    "email":"usuario@exemplo.com",
    "telefone":"(11) 99999-9999",
    "endereco":"Rua das Flores, 123",
    "senha":"senha123"
  }'
```

### Com Postman/Insomnia

Importe as rotas e configure o ambiente com a base URL: `http://localhost:3000`

## 📝 Logs

A API gera logs detalhados incluindo:
- Requisições HTTP
- Erros e exceções
- Tempo de resposta
- IP do cliente

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente
2. Defina `NODE_ENV=production`
3. Configure o CORS para seu domínio
4. Use um processo manager como PM2
5. Configure um proxy reverso (Nginx)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.