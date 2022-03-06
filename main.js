const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const { Heap } = require("./Heap");
const { huffman } = require("./huffman");


let arguments = process.argv.splice(2);

let options = {}
let argmap = [
	{ flag: "-o", name: "outputFile", length: 2 },
]

for (let i = 0; i < arguments.length; i++) {
	for (let j = 0; j < argmap.length; j++) {

		if (argmap[j].flag == arguments[i]) {
			let arr = arguments.splice(i, argmap[j].length);
			arr.shift();
			options[argmap[j].name] = arr;
		}
	}
}



let huff = huffman.encode("Shipping ships ship ships");

console.log(huff);