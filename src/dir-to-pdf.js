import PDFDocument from 'pdfkit'
import path from 'path'
import fs from 'fs'
import { ensureDirectoryExists, __dirname } from './utils/utils.js'
import { config } from './config/config.js'
import { messages } from './assets/messages.js'

const dirToPdf = () => {
  console.log(messages.log.convertingDirectories)
  
  ensureDirectoryExists(`../${config.out_dir}`)
  ensureDirectoryExists(`../${config.in_dir}`)

  const inputDir = `${config.in_dir}/`
  const outputDir = `${config.out_dir}/`

  const dirError = (err) => {
    return console.error(`${messages.error.directoryReadError} ${err.message}`)
  }

  // Leer todas las carpetas dentro del directorio de entrada
  fs.readdir(inputDir, (err, folders) => {
    if (err) {
      return dirError(err)
    }

    folders.forEach(folder => {
      const folderPath = path.join(inputDir, folder)
      const pdfFilePath = path.join(outputDir, `${folder}.pdf`)

      fs.stat(folderPath, (err, stats) => {
        if (err) {
          return dirError(err)
        }

        if (stats.isDirectory()) {
          const doc = new PDFDocument()
          const writeStream = fs.createWriteStream(pdfFilePath)
          doc.pipe(writeStream)

          fs.readdir(folderPath, (err, files) => {
            if (err) {
              return dirError(err)
            }

            const imageFiles = files.filter(file => ['.png', '.jpg'].includes(path.extname(file).toLowerCase()))

            imageFiles.forEach((imageFile, index) => {
              if (index > 0) {
                doc.addPage()
              }
              
              doc.image(path.join(folderPath, imageFile), config.image)
            });

            doc.end();
          });

          writeStream.on('finish', () => {
            console.log(`${messages.log.pdfCreated} ${pdfFilePath}`);
            
          });
        }
      });
    });
  });
}


export { dirToPdf };
