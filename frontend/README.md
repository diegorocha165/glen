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

## Como usar

1. Certifique-se de que o backend está rodando na porta 3000 (ou ajuste a URL em `api.js`)

2. Abra o arquivo `index.html` em um navegador ou use um servidor local:

   ```bash
   # Usando Python
   python -m http.server 8000
   
   # Usando Node.js (http-server)
   npx http-server -p 8000
   ```

3. Acesse `http://localhost:8000` no navegador

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

A URL da API está configurada em `api.js`. Por padrão, está configurada para:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

Se o backend estiver rodando em outra porta ou URL, ajuste essa constante.

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

