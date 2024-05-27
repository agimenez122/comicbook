import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { ensureDirectoryExists, __dirname } from './utils/utils.js';

const dirToPdf = () => {
  ensureDirectoryExists('../out');
  ensureDirectoryExists('../input');

  const inputDir = 'input/';
  const outputDir = 'out/';

  // Leer todas las carpetas dentro del directorio de entrada
  fs.readdir(inputDir, (err, folders) => {
    if (err) {
      return console.error(`No se pudo leer el directorio: ${err.message}`);
    }

    folders.forEach(folder => {
      const folderPath = path.join(inputDir, folder);
      const pdfFilePath = path.join(outputDir, `${folder}.pdf`);

      fs.stat(folderPath, (err, stats) => {
        if (err) {
          return console.error(`No se pudo obtener información del directorio: ${err.message}`);
        }

        if (stats.isDirectory()) {
          const doc = new PDFDocument();
          const writeStream = fs.createWriteStream(pdfFilePath);
          doc.pipe(writeStream);

          fs.readdir(folderPath, (err, files) => {
            if (err) {
              return console.error(`No se pudo leer el contenido de la carpeta: ${err.message}`);
            }

            const imageFiles = files.filter(file => ['.png', '.jpg'].includes(path.extname(file).toLowerCase()));

            imageFiles.forEach((imageFile, index) => {
              if (index > 0) {
                doc.addPage();
              }

              const imagePath = path.join(folderPath, imageFile);

              doc.image(imagePath, {
                fit: [500, 700],
                align: 'center',
                valign: 'center'
              });
            });

            doc.end();
          });

          writeStream.on('finish', () => {
            console.log(`Archivo PDF creado: ${pdfFilePath}`);
          });
        }
      });
    });
  });
}


export { dirToPdf };
