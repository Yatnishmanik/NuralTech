const crypto = require('crypto');

// Generate a random code with specified length
function generateRandomCode(length) {
  const code = crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
  return code.slice(0, length);
}

// Example usage
const randomCode = generateRandomCode(6);

module.exports = randomCode