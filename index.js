import colors from 'colors';
import prompt from 'prompt';
import { logo } from './src/assets/logo.js';
import { imgToPdf } from './src/img-to-pdf.js'
import { extractcbx } from './src/cbx-to-pdf.js'
import { dirToPdf } from './src/dir-to-pdf.js'
import { delay } from 'ginjol-utils';

prompt.start();

const validOptions = ['1', '2', '3', 'h', 'e'];

const showmenu = async () =>{
    await delay(5000)
    console.clear();
    console.log(logo.red);
    console.log('Select option'.bold.blue);
    console.log('1 - Convert png or jpg files to PDF book'.blue);
    console.log('2 - Convert cbr files to PDF book'.blue);
    console.log('3 - Convert directories with img files to PDF book'.blue);
    console.log('h - Show help'.blue);
    console.log('e - Exit'.blue);
} 

const optionEvalue = (err, result) => {

}

const askOption = () => {
    prompt.get(['option'], function (err, result) {
        if (err) {
            console.error('Error:'.red, err);
            return;
        }

        const option = result.option;

        if (!validOptions.includes(option)) {
            console.log('Invalid option. Please enter a valid option: 1, 2, 3,  h, or e.'.red);
            askOption();  
        } else {
            handleOption(option);
        }
    });
}

const handleOption = async (option) =>{
    if (option === 'e') {
        process.exit(0);
    } else if (option === '1') {
        console.log('Converting png or jpg files to PDF book');
        imgToPdf('input')
        showmenu();
        askOption(); 
    } else if (option === '2') {
        console.log('Converting cbr files to PDF book');
        extractcbx()
        showmenu();
        askOption(); 
    } else if (option === '3') {
        console.log('Converting directories with img files to PDF book');
        dirToPdf();
        showmenu();
        askOption(); 
    } else if (option === 'h') {
        showHelp();
        askOption(); 
    }
}

const showHelp = () => {
    console.log('Help Menu:'.bold.green);
    console.log('1 - Convert png or jpg files to PDF book: This option allows you to select PNG or JPG files and convert them into a single PDF book.');
    console.log('2 - Convert cbr files to PDF book: This option allows you to convert CBR (Comic Book RAR) files into a PDF book.');
    console.log('3 - Convert directories with img files to PDF book');
    console.log('h - Show help: Displays this help menu.');
    console.log('e - Exit: Exits the application.');
    console.log('\nTo use this program, please copy the files you want to convert into a folder named "input" in the same directory as this program.'.yellow);
    askOption();  
}

await showmenu();
askOption();