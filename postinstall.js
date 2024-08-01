import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeModulesPath = path.join(__dirname, 'node_modules');
const files = [
  '@tonconnect/sdk/lib/index.js',
  '@tonconnect/sdk/lib/index.mjs',
  'tonweb/dist/tonweb.js',
];

files.forEach(file => {
  const filePath = path.join(nodeModulesPath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('import { Buffer }')) {
      content = `import { Buffer } from 'buffer';\n${content}`;
      fs.writeFileSync(filePath, content);
    }
  }
});