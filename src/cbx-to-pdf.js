import { createExtractorFromFile } from 'node-unrar-js'
import fs from 'fs';
import path from 'path';
import { imgToPdf } from './img-to-pdf.js'

async function extractRarArchive(file, destination) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: file,
      targetPath: destination
    });

    // Extract the files
    [...extractor.extract().files];
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
  }
}

function getFilesInDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                return reject(err);
            }

            // Filtrar solo los archivos
            const fileNames = files.filter(file => {
                const filePath = path.join(dirPath, file);
                return fs.statSync(filePath).isFile();
            });

            resolve(fileNames);
        });
    });
}

// Ejemplo de uso
const directoryPath = 'input'; // Reemplaza con la ruta de tu directorio

const extractcbx = () =>{
    getFilesInDirectory(directoryPath)
    .then(files => {
       
        const imageFiles = files.filter(file => ['.cbz', '.cbr'].includes(path.extname(file).toLowerCase()));
        console.log('Archivos en el directorio:', imageFiles);
        imageFiles.map(cbxfile => {
            extractRarArchive(`input/${cbxfile}`, 'input');
        })
        imgToPdf()
    })
    .catch(error => {
        console.error('Error leyendo el directorio:', error);
    });
}

export { extractcbx }

    



