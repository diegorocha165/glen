// Elementos do formulário
const cadastroForm = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const enderecoInput = document.getElementById('endereco');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

// Máscara para CPF (apenas números)
cpfInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Máscara para telefone
telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
        e.target.value = value;
    }
});

// Função para mostrar mensagem de erro
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

// Função para mostrar mensagem de sucesso
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

// Função para esconder mensagens
function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Função para habilitar/desabilitar botão
function setLoading(loading) {
    submitBtn.disabled = loading;
    submitText.style.display = loading ? 'none' : 'inline';
    submitLoader.style.display = loading ? 'inline-block' : 'none';
}

// Validação do formulário
function validateForm() {
    const nome = nomeInput.value.trim();
    const cpf = cpfInput.value.replace(/\D/g, '');
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    
    // Validar nome
    if (nome.length < 2) {
        showError('Nome deve ter pelo menos 2 caracteres');
        return false;
    }
    
    // Validar CPF
    if (cpf.length !== 11) {
        showError('CPF deve ter exatamente 11 dígitos');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Email inválido');
        return false;
    }
    
    // Validar senha
    if (senha.length < 6) {
        showError('Senha deve ter pelo menos 6 caracteres');
        return false;
    }
    
    // Validar confirmação de senha
    if (senha !== confirmarSenha) {
        showError('As senhas não coincidem');
        return false;
    }
    
    return true;
}

// Event listener do formulário
cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessages();
    
    if (!validateForm()) {
        return;
    }
    
    setLoading(true);
    
    // Preparar dados
    const dados = {
        nome: nomeInput.value.trim(),
        cpf: cpfInput.value.replace(/\D/g, ''),
        email: emailInput.value.trim(),
        senha: senhaInput.value,
    };
    
    // Adicionar campos opcionais se preenchidos
    const telefone = telefoneInput.value.replace(/\D/g, '');
    if (telefone) {
        dados.telefone = telefone;
    }
    
    const endereco = enderecoInput.value.trim();
    if (endereco) {
        dados.endereco = endereco;
    }
    
    try {
        const response = await api.cadastrar(dados);
        
        // Salvar token e dados do usuário
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        
        showSuccess('Cadastro realizado com sucesso! Redirecionando...');
        
        // Redirecionar após 1 segundo
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        
    } catch (error) {
        showError(error.message || 'Erro ao cadastrar. Tente novamente.');
    } finally {
        setLoading(false);
    }
});

// Validação em tempo real da confirmação de senha
confirmarSenhaInput.addEventListener('input', () => {
    if (confirmarSenhaInput.value && senhaInput.value !== confirmarSenhaInput.value) {
        confirmarSenhaInput.setCustomValidity('As senhas não coincidem');
    } else {
        confirmarSenhaInput.setCustomValidity('');
    }
});

senhaInput.addEventListener('input', () => {
    if (confirmarSenhaInput.value && senhaInput.value !== confirmarSenhaInput.value) {
        confirmarSenhaInput.setCustomValidity('As senhas não coincidem');
    } else {
        confirmarSenhaInput.setCustomValidity('');
    }
});

