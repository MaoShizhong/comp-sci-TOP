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
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

const randomArr = () => {
    const length = Math.floor(Math.random() * 5) + 2;
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    console.log('pre-sort:      ', arr);
    console.log('post-sort-set: ', [...new Set(arr)].sort((a, b) => a - b));
    return arr;
};

const tree = new Tree(randomArr());
prettyPrint(tree.root);