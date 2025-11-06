/**
 * Script para validar as variáveis de ambiente
 * Execute: node validate-env.js
 */

require('dotenv').config();

const requiredVars = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};

const optionalVars = {
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
};

console.log('🔍 Validando variáveis de ambiente...\n');

let hasErrors = false;
const errors = [];
const warnings = [];

// Validar variáveis obrigatórias
Object.entries(requiredVars).forEach(([key, value]) => {
  if (!value || value.includes('your_') || value.includes('here')) {
    hasErrors = true;
    errors.push(`❌ ${key}: Não configurado ou valor placeholder detectado`);
  } else {
    console.log(`✅ ${key}: Configurado`);
    
    // Validações específicas
    if (key === 'SUPABASE_URL') {
      if (!value.startsWith('http://') && !value.startsWith('https://')) {
        hasErrors = true;
        errors.push(`❌ ${key}: Deve ser uma URL válida (começar com http:// ou https://)`);
      } else if (!value.includes('.supabase.co')) {
        warnings.push(`⚠️  ${key}: Não parece ser uma URL do Supabase válida`);
      }
    }
    
    if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
      if (!value.startsWith('eyJ')) {
        warnings.push(`⚠️  ${key}: Não parece ser um JWT válido`);
      }
    }
    
    if (key === 'JWT_SECRET') {
      if (value.length < 32) {
        warnings.push(`⚠️  ${key}: Recomendado ter pelo menos 32 caracteres para segurança`);
      }
    }
  }
});

// Mostrar variáveis opcionais
console.log('\n📋 Variáveis opcionais:');
Object.entries(optionalVars).forEach(([key, value]) => {
  console.log(`   ${key}: ${value}`);
});

// Mostrar erros
if (errors.length > 0) {
  console.log('\n❌ ERROS ENCONTRADOS:');
  errors.forEach(error => console.log(`   ${error}`));
}

// Mostrar avisos
if (warnings.length > 0) {
  console.log('\n⚠️  AVISOS:');
  warnings.forEach(warning => console.log(`   ${warning}`));
}

// Instruções
if (hasErrors) {
  console.log('\n📖 INSTRUÇÕES PARA CONFIGURAR:');
  console.log('\n1. Acesse https://supabase.com e crie/login em uma conta');
  console.log('2. Crie um novo projeto ou selecione um existente');
  console.log('3. Vá em Settings > API');
  console.log('4. Copie os seguintes valores:');
  console.log('   - Project URL → SUPABASE_URL');
  console.log('   - service_role key → SUPABASE_SERVICE_ROLE_KEY');
  console.log('\n5. Para JWT_SECRET, gere uma chave segura:');
  console.log('   node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"');
  console.log('\n6. Edite o arquivo .env na pasta backend/ e preencha os valores');
  console.log('\n7. Execute este script novamente para validar: node validate-env.js');
  process.exit(1);
} else {
  console.log('\n✅ Todas as variáveis obrigatórias estão configuradas!');
  if (warnings.length > 0) {
    console.log('⚠️  Verifique os avisos acima.');
  } else {
    console.log('🚀 Você pode iniciar o servidor com: npm start');
  }
  process.exit(0);
}

