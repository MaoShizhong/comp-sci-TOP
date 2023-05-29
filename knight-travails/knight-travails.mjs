export function createBoard() {
    const arr = [];

    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            arr.push([i, j]);
        }
    }
    return arr;
}

export function createGraph(board, offsets) {
    const graph = {};

    // * lists each square that a given square can see
    board.forEach(square => {
        graph[square] = [];

        offsets.forEach(offset => {
            const a = offset[0] + square[0];
            const b = offset[1] + square[1];

            if (1 <= a && a <= 8 && 1 <= b && b <= 8) {
                graph[square].push([a, b]);
            }
        });
    });
    return graph;
}

function sanitiseInput(input) {
    if (Array.isArray(input)) {
        if (input.every(el => 1 <= el && el <= 8)) {
            return input;
        }
        else if (/[a-h]/i.test(input[0]) && /[1-8]/.test(input[1])) {
            const num = input[0].toLowerCase().charCodeAt(0) - 96;
            return [num, input[1]];
        }
        else {
            throw new RangeError(`\n${input} is not a valid chess square.\n`);
        }
    }
    else if (/^[a-h][1-8]$/i.test(input)) {
        const num = input[0].toLowerCase().charCodeAt(0) - 96;
        return [num, +input[1]];
    }
    else {
        throw new RangeError(`\n'${input}' is either not a valid chess square or invalid syntax.\nValid syntax forms (case-insensitive; A-H or 1-8): [1, 1], [A, 6], 'E4'\n`);
    }
}

// * will attempt paths in ascending order of moves required
export function printShortestKnightPath(startSquare, targetSquare, graph) {
    // * allow algebraic notation (as string or array) or array with only 1-8
    startSquare = sanitiseInput(startSquare);
    targetSquare = sanitiseInput(targetSquare);

    const pathsToTest = [[startSquare]];
    let shortestLength;

    console.log(`\nShortest knight path(s) from ${String.fromCharCode(startSquare[0] + 64)}${startSquare[1]} to ${String.fromCharCode(targetSquare[0] + 64)}${targetSquare[1]}:\n`);

    while (pathsToTest.length) {
        const currentPath = pathsToTest.shift();
        const currentSquare = currentPath.at(-1);

        // * return as soon as it starts testing paths longer than the shortest confirmed path length
        // * therefore all permutations of the shortest confirmed length will be printed
        if (currentPath.length - 1 > shortestLength) {
            return console.log(`\n${shortestLength} ${shortestLength === 1 ? 'move' : 'moves'} required${shortestLength === 0 ? ' - you are already there!' : ''}\n`);
        }

        if (currentSquare.every((el, i) => el === targetSquare[i])) {
            shortestLength = currentPath.length - 1;
            printPath(currentPath);
        }

        graph[currentSquare].forEach(squareSeen => {
            const newPathToTest = [...currentPath, squareSeen];
            pathsToTest.push(newPathToTest);
        });
    }
}

function printPath(path) {
    let str = '';
    path.forEach(square => str += `N${String.fromCharCode(square[0] + 96)}${square[1]} > `);
    console.log(str.slice(0, -3));
}

export function randomSquare() {
    return [Math.floor(Math.random() * 8) + 1, Math.floor(Math.random() * 8) + 1];
}