const fs = require("fs");
const path = require("path");
const { Heap } = require("./Heap");
const { huffmanEncoder } = require("./huffman");
let outputfile = 'output.txt';
let inputfile='input.txt';



function ReadFromCommandLine(){
    const myArgs = process.argv.slice(2);

    for (let i=0; i<myArgs.length; i++){
        if(myArgs[i]==="-o"){
            outputfile = myArgs[i+1];
        }
        if(myArgs[i]==="-i"){
            inputfile = myArgs[i+1];
        }

        if(myArgs[i]==="-c"){
            isEncode = true;
        }

    }
}

//function process(){
 
 let data = fs.readFileSync(inputfile, "utf8").toString();

 
 let huffmanData = huffmanEncoder(data);
 
 
 const replacements = {
     "\n": "(Line Break)",
     "\t": "(Tab)",
     "\r": "(Carriage Return)",
     " ": "(Space)",
 }
 huffmanData = huffmanData.map(({character, value}) => {
 return {character: (replacements[character] || character),value: value}
 });
 
//sort data lexigraphically
 huffmanData.sort(function (a, b) {
     return a.character < b.character ? -1 : 1;
 });
 
 let output = "---------- Huffman Dictionary ----------" + "\n";
 huffmanData.forEach(({character, value}) => {
     output += `${character}\t\t${value}\n`;
 });
 output = output.substring(0, output.length-1);
 
 //output file
 fs.writeFileSync(outputfile, output);
//}

ReadFromCommandLine();
//process();

