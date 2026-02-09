const bcrypt = require('bcryptjs');

const password = process.argv.slice(2).join(' ');

if (!password) {
  console.error('Usage: node generate-hash.js "your password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log(hash);
