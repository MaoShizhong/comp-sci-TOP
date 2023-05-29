import { createBoard, createGraph, printShortestKnightPath, randomSquare } from './knight-travails.mjs';

const offsets = [
    [2, 1], [1, 2],
    [-1, 2], [-2, 1],
    [-2, -1], [-1, -2],
    [1, -2], [2, -1]
];
const board = createBoard();
const graph = createGraph(board, offsets);

// * [2, 5] == ['B', 5] == 'B5'  (case insensitive)
try {
    printShortestKnightPath(randomSquare(), randomSquare(), graph);
    printShortestKnightPath('a1', [1, 1], graph); // * no need to move!
    printShortestKnightPath('A7', ['b', 3], graph); // * 3 moves (3 possible paths)
    printShortestKnightPath([6, 7], 'b1', graph); // * 4 moves (12 possible paths)
    printShortestKnightPath(randomSquare(), 'T5', graph); // ! will throw a RangeError
}
catch (e) {
    console.error(e);
}
