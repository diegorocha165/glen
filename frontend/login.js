// Elementos do formulário
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

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

// Event listener do formulário
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessages();
    
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    
    // Validação básica
    if (!email || !senha) {
        showError('Por favor, preencha todos os campos');
        return;
    }
    
    setLoading(true);
    
    try {
        const response = await api.login(email, senha);
        
        // Salvar token e dados do usuário
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        
        showSuccess('Login realizado com sucesso! Redirecionando...');
        
        // Redirecionar após 1 segundo
        setTimeout(() => {
            // Você pode redirecionar para uma página de dashboard aqui
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        showError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
        setLoading(false);
    }
});

// Verificar se já está logado
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Opcional: redirecionar se já estiver logado
        // window.location.href = 'dashboard.html';
    }
});

