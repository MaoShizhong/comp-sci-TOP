import { createBoard, createGraph, printShortestKnightPath, randomSquare } from './knight-travails.mjs';

const offsets = [
    [2, 1], [1, 2],
    [-1, 2], [-2, 1],
    [-2, -1], [-1, -2],
    [1, -2], [2, -1]
];
const board = createBoard();
const graph = createGraph(board, offsets);

printShortestKnightPath(randomSquare(), randomSquare(), graph);