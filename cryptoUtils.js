const crypto = require('crypto');

// Genera una clave aleatoria de al menos 256 bits
function generateKey() {
  return crypto.randomBytes(32); // 32 bytes * 8 bits/byte = 256 bits
}

// Calcula HMAC usando SHA-256
function calculateHMAC(key, message) {
  return crypto.createHmac('sha256', key).update(message).digest('hex');
}

module.exports = { generateKey, calculateHMAC };
