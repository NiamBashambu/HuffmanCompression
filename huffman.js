const { Heap } = require("./Heap");
stringUtils = class {


	//returns string of frequency of characters
	static getcharacterfrequency(str) {
		let frequency = {};
		for (let i = 0; i < str.length; i++) {
			let character = str[i];
			frequency[character] = frequency[character] ? frequency[character] + 1 : 1;
		}
		return frequency;
	}
    //lexical order sort
    
	static lexicSorter(frequencyObject) {
		let frequencyArr = [];
		for (let key in frequencyObject) {
			frequencyArr.push({
				"character": key,
				"frequency": frequencyObject[key]
			})
		}
        //sorts the array
		frequencyArr.sort(function (a, b) {
			return a.character.localeCompare(b.character);
		});
		return frequencyArr;
	}

}
huffman = class {
	static #huffmanNode = class {
		constructor({ character, frequency }) {
			this.character = character;
			this.frequency = frequency;
		}
	}
	static #createfrequencyObject(string) {
		return stringUtils.lexicSorter(stringUtils.getcharacterfrequency(string));
	}
	static #createMinHeap(frequencyObject) {
		let minHeap = new Heap((a, b) => { return (a.frequency - b.frequency); });
		for (let i = 0; i < frequencyObject.length; i++) {
			minHeap.add(new this.#huffmanNode(frequencyObject[i]));
		}
		return minHeap;
	}
	//creates a huffman tree based using a heap
	static #createHuffmanTree(minHeap) {
		while (minHeap.size() > 1) {
			let left = minHeap.remove();
			let right = minHeap.remove();
			let newNode = new this.#huffmanNode({ character: null, frequency: left.frequency + right.frequency });
			newNode.left = left;
			newNode.right = right;
			minHeap.add(newNode);
		}
	}
    
	static #decodeHuffmanTree(minHeap) {
		let root = minHeap.peek();
		let huffmanObject = [];
		decodeHuffmanHelper(root, "")

		function decodeHuffmanHelper(node, string) {
			if (node.left == null && node.right == null && node.character !== null) {
				huffmanObject.push({ character: node.character, value: string });
				return;
			}
			decodeHuffmanHelper(node.left, string + "0");
			decodeHuffmanHelper(node.right, string + "1");
		}
		return huffmanObject;
	}
    
    //encoded string by huffman
	static encode(string) {
		let frequencyObject = this.#createfrequencyObject(string);
		let minHeap = this.#createMinHeap(frequencyObject);
		this.#createHuffmanTree(minHeap);
		return this.#decodeHuffmanTree(minHeap);

	}
}



module.exports = { huffman }