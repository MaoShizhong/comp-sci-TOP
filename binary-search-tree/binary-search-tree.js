class Node {
    constructor(data = null) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        if (!Array.isArray(arr)) {
            throw new TypeError('An array is required');
        }
        this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
        this.preOrderArr = [];
        this.inOrderArr = [];
        this.postOrderArr = [];
    }

    buildTree(arr) {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid + 1);
        const node = new Node(arr[mid]);

        // recursively construct L then R subtree
        node.left = this.buildTree(left);
        node.right = this.buildTree(right);

        return node;
    }

    insert(value, node = this.root) {
        if (node === null) return new Node(value);

        if (value === node.data) {
            throw `Cannot insert ${value} as it is already in this tree.`;
        }
        else if (value < node.data) {
            node.left = this.insert(value, node.left);
        }
        else {
            node.right = this.insert(value, node.right);
        }
        return node;
    }

    delete(value, node = this.root) {
        if (node === null) throw `Cannot delete ${value} as it is not in this tree.`;

        if (value < node.data) {
            node.left = this.delete(value, node.left);
        }
        else if (value > node.data) {
            node.right = this.delete(value, node.right);
        }
        else {
            // * for leaf/single-child nodes
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // * handle two-child nodes
            // * make node.data the smallest value of right subtree then delete that node the value came from
            node.data = this.min(node.right);
            node.right = this.delete(node.data, node.right);
        }
        return node;
    }

    min(node) {
        let min = node.data;
        while (node.left !== null) {
            min = node.left.data;
            node = node.left;
        }
        return min;
    }

    find(value) {
        let node = this.root;

        while (node !== null && node.data !== value) {
            node = value < node.data ? node.left : node.right;
        }

        return node === null ? `${value} is not in this tree.` : node;
    }

    // * callback is the func to "do something" with the node given to it e.g. log/push to array etc.
    levelOrder(callback) {
        const resultsIfNoCallback = [];
        const queue = [this.root];

        while (queue.length) {
            const currentNode = queue[0];

            if (callback) callback(currentNode);
            else resultsIfNoCallback.push(currentNode);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            queue.shift();
        }

        if (!callback) return resultsIfNoCallback;
    }

    preOrder(callback, node = this.root) {
        if (node === null) return;

        if (callback) callback(node);
        else {
            // * resets array 
            if (node === this.root) this.preOrderArr.length = 0;

            this.preOrderArr.push(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);
        }

        if (node === this.root) return this.preOrderArr;
    }

    inOrder(callback, node = this.root) {
        if (node === null) return;

        if (callback) callback(node);
        else {
            // * resets array 
            if (node === this.root) this.inOrderArr.length = 0;

            this.inOrder(callback, node.left);
            this.inOrderArr.push(node);
            this.inOrder(callback, node.right);
        }

        if (node === this.root) return this.inOrderArr;
    }

    postOrder(callback, node = this.root) {
        if (node === null) return;

        if (callback) callback(node);
        else {
            // * resets array 
            if (node === this.root) this.postOrderArr.length = 0;

            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            this.postOrderArr.push(node);
        }

        if (node === this.root) return this.postOrderArr;
    }

    height(node) {
        // * accept only nodes that are in the tree (ignore null after leaf)
        if (node !== null) {
            if (!(node instanceof Node)) throw 'Please enter a valid node as an argument';
            if (!(this.find(node.data) instanceof Node)) throw `${node.data} is not in this tree.`;
        }

        if (node === null) return -1;
        const heightOfLeft = this.height(node.left);
        const heightOfRight = this.height(node.right);

        return Math.max(heightOfLeft, heightOfRight) + 1;
    }

    depth(node, root = this.root, depth = 0) {
        if (root === null) return -1;
        if (root === node) return depth;

        const depthOfLeft = this.depth(node, root.left, depth + 1);
        const depthOfRight = this.depth(node, root.right, depth + 1);
        return Math.max(depthOfLeft, depthOfRight);
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const subtreeHeightDiff = Math.abs(this.height(node.left) - this.height(node.right));

        return subtreeHeightDiff < 2 && this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        if (this.isBalanced()) return console.error('Tree is already balanced!');

        const newSortedValues = this.preOrder().map(node => node.data).sort((a, b) => a - b);
        this.root = this.buildTree(newSortedValues);
    }
}


const printTree = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        printTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

const randomArr = () => {
    const length = Math.floor(Math.random() * 5) + 4;
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    console.log('pre-sort:      ', arr);
    console.log('post-sort-set: ', [...new Set(arr)].sort((a, b) => a - b));
    return arr;
};