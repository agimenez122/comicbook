import colors from 'colors';
import prompt from 'prompt';
import { logo } from './src/assets/logo.js';
import { imgToPdf } from './src/img-to-pdf.js'
import { extractcbx } from './src/cbx-to-pdf.js'
import { dirToPdf } from './src/dir-to-pdf.js'
import { delay } from 'ginjol-utils';

prompt.start();

const validOptions = ['1', '2', '3', 'h', 'e'];

const initPrompt = (option) => {
    option === 'h' ? showHelp() : showmenu();    
    askOption(); 
}

const showmenu = () =>{
    console.clear();
    console.log( logo.red +
                 '\nSelect option'.bold.blue +
                 '\n1 - Convert png or jpg files to PDF book'.blue +
                 '\n2 - Convert cbr files to PDF book'.blue +
                 '\n3 - Convert directories with img files to PDF book'.blue +
                 '\nh - Show help'.blue +
                 '\ne - Exit'.blue );
} 

const askOption = () => {
    prompt.get(['option'], function (err, result) {
        if (err) {
            console.error('Error:'.red, err);
            return;
        }

        !validOptions.includes(result.option) ? initPrompt() : handleOption(result.option)
    });
}

const handleOption = async (option) => {
    switch(option) {
        case 'e':
            process.exit(0);
        case '1':
            await imgToPdf('input');
            initPrompt();
            break;
        case '2':
            await extractcbx();
            await delay(5000)
            initPrompt();
            break;
        case '3':
            await dirToPdf();
            initPrompt();
            break;
        case 'h':
            initPrompt('h');
            break;
    }
}

const showHelp = () => {
    console.log('\nHelp Menu:'.bold.green +
                '\n1 - Convert png or jpg files to PDF book: This option allows you to select PNG or JPG files and convert them into a single PDF book.' +
                '\n2 - Convert cbr files to PDF book: This option allows you to convert CBR (Comic Book RAR) files into a PDF book.' +
                '\n3 - Convert directories with img files to PDF book' +
                '\nh - Show help: Displays this help menu.' +
                '\ne - Exit: Exits the application.' +
                '\nTo use this program, please copy the files you want to convert into a folder named "input" in the same directory as this program.'.yellow
            );
            
    askOption();  
}

await showmenu();
askOption();