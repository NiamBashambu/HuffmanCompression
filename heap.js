comparasionUtils = class {

	static lessThan(a, b, comparator) {
		return comparator(a, b) < 0;
	}


}

class Heap {
	#heap = [];

	// comparator must be a function(a,b)
	// which returns:
	// < 0 if a < b
	// = 0 if a == b
	// > 0 if a > b
	
	#comparator = function (a, b) {
		throw "Comparator not defined!";
	};
	
	constructor(comparator) {
		if (comparator == null) {
			throw "Comparator can not be null";
		}
		this.#heap = [];
		this.#comparator = comparator;
	}
	
	size() {
		return this.#heap.length;
	}
	peek() {
		return this.#heap[0];
	}

	isEmpty() {
		return this.#heap.length === 0;
	}
	//add element to the heap
	add(element) {
		if (element == undefined) {
			throw "The element can not be undefined"; 
		}
		this.#heap.push(element); 
        //add element to the end of the heap
		
		let cur = this.#heap.length - 1;
		let par = Math.floor((cur - 1) / 2);
		this.#heapifyup();
	}
    //remove element to the heap
	remove() {

		if (this.#heap.length == 0) {
			return undefined;
		}
		if (this.#heap.length == 1) {
			return this.#heap.pop();
		}
		const removed = this.#heap[0];
		this.#heap[0] = this.#heap.pop();

		this.#heapifydown();
		return removed;
	}
	
    //heapify up
	#heapifyup() {
		let cur = this.#heap.length - 1;
		let par = Math.floor((cur - 1) / 2);

		while (cur > 0 && comparasionUtils.lessThan(this.#heap[cur], this.#heap[par], this.#comparator)) {
			
			let swap = this.#heap[par];
			this.#heap[par] = this.#heap[cur];
			this.#heap[cur] = swap;
			cur = par;
			par = Math.floor((cur - 1) / 2);
		}
	}
    //heapify down
	#heapifydown() {
		let cur = 0;

		while (cur < this.#heap.length) {

			let left = (2 * cur) + 1;
			let right = (2 * cur) + 2;
			let sml = cur;
			
			if (right < this.#heap.length && comparasionUtils.lessThan(this.#heap[right], this.#heap[sml], this.#comparator)) {
				sml = right;
			}
			if (left < this.#heap.length && comparasionUtils.lessThan(this.#heap[left], this.#heap[sml], this.#comparator)) {
				sml = left;
			}
			if (sml === cur) {
				return;
			}
			let swap = this.#heap[cur];
			this.#heap[cur] = this.#heap[sml];
			this.#heap[sml] = swap;
			cur = sml;
		}
	}

}

module.exports = { Heap };