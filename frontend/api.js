// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api';

// Função para fazer requisições à API
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    // Adicionar token se existir
    const token = localStorage.getItem('token');
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Erro na requisição');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

// Funções específicas da API
const api = {
    // Cadastro
    cadastrar: async (dados) => {
        return apiRequest('/usuarios/cadastro', {
            method: 'POST',
            body: JSON.stringify(dados),
        });
    },
    
    // Login
    login: async (email, senha) => {
        return apiRequest('/usuarios/login', {
            method: 'POST',
            body: JSON.stringify({ email, senha }),
        });
    },
    
    // Obter perfil (requer autenticação)
    getPerfil: async () => {
        return apiRequest('/usuarios/perfil');
    },
};

