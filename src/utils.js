import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener el nombre de archivo y directorio actuales
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const ensureDirectoryExists = (fileName) => {
    const outputDir = path.join(__dirname, fileName);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
        console.log(`directory ${fileName} created.`.green);
    } else {
        console.log(`directory ${fileName} already exists.`.yellow);
    }
  };

export { ensureDirectoryExists , __dirname, __filename }