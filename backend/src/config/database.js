const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ ERRO: Variáveis de ambiente do Supabase não configuradas!\n');
  console.error('Por favor, configure o arquivo .env na pasta backend/');
  console.error('\nInstruções:');
  console.error('1. Acesse https://supabase.com e crie/login em uma conta');
  console.error('2. Crie um novo projeto');
  console.error('3. Vá em Settings > API');
  console.error('4. Copie Project URL → SUPABASE_URL');
  console.error('5. Copie service_role key → SUPABASE_SERVICE_ROLE_KEY');
  console.error('6. Edite o arquivo backend/.env e preencha os valores');
  console.error('\nPara validar sua configuração, execute: node validate-env.js\n');
  throw new Error('Missing Supabase configuration. Please check your environment variables.');
}

// Validar formato da URL
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.error('\n❌ ERRO: SUPABASE_URL deve ser uma URL válida (começar com http:// ou https://)');
  console.error(`Valor atual: ${supabaseUrl}`);
  console.error('\nVerifique se você preencheu corretamente o arquivo .env\n');
  throw new Error('Invalid SUPABASE_URL format. Must start with http:// or https://');
}

// Verificar se não é placeholder
if (supabaseUrl.includes('your_') || supabaseUrl.includes('here')) {
  console.error('\n❌ ERRO: SUPABASE_URL ainda contém valores placeholder');
  console.error('Por favor, substitua "your_supabase_url_here" pela URL real do seu projeto Supabase');
  console.error('\nExecute: node validate-env.js para mais informações\n');
  throw new Error('SUPABASE_URL contains placeholder value. Please update .env file with real credentials.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;


