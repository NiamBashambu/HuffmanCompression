const { Heap } = require("./Heap");



	//returns a table of strings of characters
	function frequencytable(string) {
		let frequency = {};
		for (let i = 0; i < string.length; i++) {
			let character = string[i];
			frequency[character] = frequency[character] ? frequency[character] + 1 : 1;
		}
		return frequency;
	}
    //lexical order sort
    
	function lexicSorter(frequencyObject) {
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


//huffman class
	 class huffman {
		constructor({ character, frequency }) {
			this.character = character;
			this.frequency = frequency;
		}
	}
	function createfrequencyObject(string) {
		//sorting lexigraphically
		return lexicSorter(frequencytable(string));
	}
	//creates a min heap from the heap class
	function createMinHeap(frequencyObject) {
		let minHeap = new Heap((a, b) => { return (a.frequency - b.frequency); });
		for (let i = 0; i < frequencyObject.length; i++) {
			//adding huffman nodes
			minHeap.add(new huffman(frequencyObject[i]));
		}
		return minHeap;
	}
	//creates a huffman tree using a minheap
	function createHuffmanTree(minHeap) {
		while (minHeap.peek() > 1) {
			let left = minHeap.remove();
			let right = minHeap.remove();
			let newNode = new huffman({ character: null, frequency: left.frequency + right.frequency });
			newNode.left = left;
			newNode.right = right;
			minHeap.add(newNode);
		}
		return minHeap.peek();
	}
    //decoding huffman tree
	function decodeHuffmanTree(root) {
		
		let huffmanObject = [];
		decodeHuffmanHelper(root, "")

		function decodeHuffmanHelper(node, string) {
			if (node.left == null && node.right == null) {
				huffmanObject.push({ character: node.character, value: string });
				return;
			}
			//determining the 1s and 0s in the huffman tree
			decodeHuffmanHelper(node.left, string + "0");
			decodeHuffmanHelper(node.right, string + "1");
		}
		return huffmanObject;
	}
	
    //encoder function that gets called in main to do all the things
	function huffmanEncoder(string) {
		let frequencyObject = createfrequencyObject(string);
		let minHeap = createMinHeap(frequencyObject);
		let huffmanTree = createHuffmanTree(minHeap);
		return decodeHuffmanTree(huffmanTree);
	}




module.exports = { huffmanEncoder }