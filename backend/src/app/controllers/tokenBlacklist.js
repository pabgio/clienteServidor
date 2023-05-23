// Exemplo de implementação usando um array em memória como lista negra de tokens
const tokenBlacklist = [];

// Adicionar token inválido à lista negra
export const addInvalidToken = (token) => {
  tokenBlacklist.push(token);
};

// Verificar se um token está na lista negra
export const isTokenBlacklisted = (token) => {
  return tokenBlacklist.includes(token);
};

// Remover token da lista negra (opcional)
export const removeTokenFromBlacklist = (token) => {
  const index = tokenBlacklist.indexOf(token);
  if (index !== -1) {
    tokenBlacklist.splice(index, 1);
  }
};
