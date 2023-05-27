class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = new Node(head);
    }

    append(value) {
        const newNode = new Node(value);

        if (this.head.value === null) {
            this.head = newNode;
        }
        else {
            let currentNode = this.head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
    }

    prepend(value) {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    size() {
        let currentNode = this.head;
        let counter = 0;

        while (currentNode !== null) {
            currentNode = currentNode.next;
            counter++;
        }
        return counter;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        let currentNode = this.head;

        while (currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    nodeAt(index) {
        if (index >= this.size()) {
            return `Index ${index} is beyond the size of the list.`;
        }

        let currentNode = this.head;
        let counter = 0;

        while (counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    pop() {
        let prevNode, currentNode = this.head;
        while (currentNode.next !== null) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        prevNode.next = null;
    }

    contains(value) {
        let currentNode = this.head;
        while (currentNode.value !== value && currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        return currentNode.value === value;
    }

    indexOf(value) {
        if (!this.contains(value)) return null;

        let currentNode = this.head;
        let counter = 0;

        while (currentNode.value !== value) {
            currentNode = currentNode.next;
            counter++;
        }
        return counter;
    }

    toString() {
        let str = '', currentNode = this.head;
        while (currentNode !== null) {
            str += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.next;
        }

        str += 'null';
        return str;
    }
}