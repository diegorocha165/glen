// Configuração da API
// A URL da API é injetada pelo servidor Express via window.API_BASE_URL
// Se não estiver definida, usa valores padrão baseados no ambiente
function getApiBaseUrl() {
  // Prioridade 1: URL injetada pelo servidor
  if (typeof window !== 'undefined' && window.API_BASE_URL) {
    return window.API_BASE_URL;
  }
  
  // Prioridade 2: Meta tag (fallback)
  if (typeof document !== 'undefined') {
    const apiUrlMeta = document.querySelector('meta[name="api-url"]');
    if (apiUrlMeta) {
      return apiUrlMeta.getAttribute('content');
    }
  }
  
  // Prioridade 3: Detecção automática baseada no hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Em desenvolvimento local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000/api';
    }
    
    // Em produção no Render, tenta detectar a URL do backend
    // Assumindo que o backend está em um serviço separado
    // Você deve configurar API_URL no Render Dashboard
    return 'https://seu-backend.onrender.com/api';
  }
  
  // Fallback para Node.js (SSR)
  return process.env.API_URL || 'http://localhost:3000/api';
}

const API_BASE_URL = getApiBaseUrl();

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

