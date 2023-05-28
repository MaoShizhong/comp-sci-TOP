import { Tree, printTree, randomArr } from './binary-search-tree.mjs';

const arr = randomArr();
console.log(arr);
const tree = new Tree(arr);
printTree(tree.root);
console.log(`\nThe tree is ${tree.isBalanced() ? '' : 'not'} balanced.\n`);
tree.rebalance(); // ! will return error as already balanced

console.log(`Level-order: [${tree.levelOrder().map(node => ` ${node.data}`)} ]`);
console.log(`Pre-order: [${tree.preOrder().map(node => ` ${node.data}`)} ]`);
console.log(`In-order: [${tree.inOrder().map(node => ` ${node.data}`)} ]`);
console.log(`Post-order: [${tree.postOrder().map(node => ` ${node.data}`)} ]\n`);

// * unbalance the tree
let str = 'Inserting in the following order: ';
for (let i = 0; i < 5; i++) {
    const num = Math.floor(Math.random() * 50) + 100;
    str += `${num}, `;
    try {
        tree.insert(num);
    }
    catch (e) {
        str = str.slice(0, -5);
    }
}

console.log(`${str.slice(0, -2)}\n`);

printTree(tree.root);
console.log(`\nThe tree is ${tree.isBalanced() ? '' : 'not'} balanced.\n`);
tree.rebalance(); // ! will return error as already balanced
printTree(tree.root);

console.log(`\nLevel-order: [${tree.levelOrder().map(node => ` ${node.data}`)} ]`);
console.log(`Pre-order: [${tree.preOrder().map(node => ` ${node.data}`)} ]`);
console.log(`In-order: [${tree.inOrder().map(node => ` ${node.data}`)} ]`);
console.log(`Post-order: [${tree.postOrder().map(node => ` ${node.data}`)} ]`);