# Frontend - Hotel

Frontend para o sistema de hotel com páginas de cadastro e login.

## Estrutura

- `index.html` - Página inicial com opções de login e cadastro
- `login.html` - Página de login
- `cadastro.html` - Página de cadastro
- `styles.css` - Estilos CSS modernos e responsivos
- `api.js` - Configuração e funções da API
- `login.js` - Lógica de login
- `cadastro.js` - Lógica de cadastro
- `server.js` - Servidor Express para servir arquivos estáticos
- `package.json` - Dependências e configuração do projeto

## Como usar

### Desenvolvimento Local

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Certifique-se de que o backend está rodando na porta 3000

3. Inicie o servidor:
   ```bash
   npm start
   ```

4. Acesse `http://localhost:3001` no navegador

### Usando servidor HTTP simples (alternativa)

Se preferir não usar o servidor Express:

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server -p 8000
```

**Nota**: Ao usar servidor HTTP simples, você precisará configurar a URL da API manualmente no arquivo `api.js`.

## Funcionalidades

### Página de Cadastro
- Campos: Nome, CPF, Email, Telefone (opcional), Endereço (opcional), Senha
- Validação de CPF (11 dígitos)
- Validação de email
- Confirmação de senha
- Máscara para CPF e telefone
- Feedback visual de erros e sucesso

### Página de Login
- Campos: Email e Senha
- Validação de credenciais
- Armazenamento de token JWT no localStorage
- Redirecionamento após login bem-sucedido

## Configuração da API

A URL da API é configurada automaticamente:

1. **Em desenvolvimento local**: Usa `http://localhost:3000/api` automaticamente
2. **Em produção**: Configurada via variável de ambiente `API_URL` no servidor
3. **Fallback**: Pode ser configurada manualmente no arquivo `api.js`

### Configurar URL da API em produção

No Render ou outro serviço de hospedagem, configure a variável de ambiente:
```
API_URL=https://seu-backend.onrender.com/api
```

O servidor Express injeta automaticamente essa URL nos arquivos HTML.

## Armazenamento

O frontend usa `localStorage` para armazenar:
- `token`: Token JWT de autenticação
- `usuario`: Dados do usuário logado

## Design

O frontend possui um design moderno e responsivo com:
- Gradiente de fundo
- Cards com sombras
- Animações suaves
- Layout responsivo para mobile
- Feedback visual para ações do usuário

## Deploy

Para fazer deploy no Render ou outro serviço, consulte `README-DEPLOY.md`.

### Comandos disponíveis

- `npm start` - Inicia o servidor de produção
- `npm run dev` - Inicia o servidor (mesmo que start)
- `npm install` - Instala as dependências

