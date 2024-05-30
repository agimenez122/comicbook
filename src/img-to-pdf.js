import PDFDocument from 'pdfkit'
import path from 'path'
import fs from 'fs'
import { ensureDirectoryExists, __dirname, deleteTempDir } from './utils/utils.js'

const imgToPdf = (param) =>{
  console.log('Converting png or jpg files to PDF book');
  
  ensureDirectoryExists('../out')
  ensureDirectoryExists(`../${param}`)

  const pdfFilePath = `out/output.pdf`;
  const pngDir = `${param}/`; 
  
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfFilePath);
  doc.pipe(writeStream);
  
  // Generate PDF document
  fs.readdir(pngDir, (err, files) => {
    if (err) {
      return console.error(`Could not read the directory: ${err.message}`);
    }
  
    const imageFiles = files.filter(file => ['.png', '.jpg'].includes(path.extname(file).toLowerCase()));
  
    imageFiles.forEach((imageFile, index) => {
      if (index > 0) {
        doc.addPage();
      }
  
      const imagePath = path.join(pngDir, imageFile);
  
      doc.image(imagePath, {
        fit: [500, 700], 
        align: 'center',
        valign: 'center'
      });
    });
  
    doc.end();
  });
  
  writeStream.on('finish', () => {
    console.log(`PDF file created: ${pdfFilePath}`);
    deleteTempDir()
  });
  
}

export { imgToPdf }