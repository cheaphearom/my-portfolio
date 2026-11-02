// Usage: npm run hash-password -- "your password"
// Prints a value for ADMIN_PASSWORD_HASH in .env.local.
// The format (scrypt:<salt>:<hash>) has no "$" characters, which Next.js
// would otherwise try to expand as variables inside .env files.
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error('Usage: npm run hash-password -- "a password of 12+ characters"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
