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

// path -> 'temp'
const tempDir = path.join(__dirname, '../../temp');

// Función para borrar una carpeta y su contenido
const deleteFolderRecursive = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursivamente borrar el contenido de la carpeta
        deleteFolderRecursive(curPath);
      } else {
        // Borrar archivo
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

const deleteTempDir = () =>{
    // Verificar si la carpeta 'temp' existe
    if (fs.existsSync(tempDir)) {
        // Borrar la carpeta 'temp' y su contenido
        deleteFolderRecursive(tempDir);
        console.log('La carpeta "temp" y su contenido han sido eliminados.');
    } 
}

const createTempDir = () => {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
        console.log('La carpeta "temp" ha sido creada.');
    } else {
        console.log('La carpeta "temp" ya existe.');
    }
}


export { ensureDirectoryExists, deleteTempDir, createTempDir, __dirname, __filename }