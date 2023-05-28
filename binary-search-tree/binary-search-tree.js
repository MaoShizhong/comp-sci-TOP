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
    const length = Math.floor(Math.random() * 4) + 4;
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    console.log('pre-sort:      ', arr);
    console.log('post-sort-set: ', [...new Set(arr)].sort((a, b) => a - b));
    return arr;
};


const tree = new Tree(randomArr());
printTree(tree.root);

const valueToInsert = Math.floor(Math.random() * 100);
console.log(`\nAttempting to insert ${valueToInsert}`);
try {
    tree.insert(valueToInsert);
    console.log('Successful insertion!');
    printTree(tree.root);
}
catch (e) {
    console.error(e);
}

const valueToDelete = Math.floor(Math.random() * 100);
console.log(`\nAttempting to delete ${valueToDelete}`);
try {
    tree.delete(valueToDelete);
    console.log('Successful delete!');
    printTree(tree.root);
}
catch (e) {
    console.error(e);
}