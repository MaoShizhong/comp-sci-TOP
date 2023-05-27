// * FIBONACCI

function fibs(n) {
    const arr = [0];
    let num = 1;

    for (let i = 1; i < n; i++) {
        arr.push(num);
        num += arr[i - 1];
    }

    return arr;
}

console.log(fibs(4)); // [0, 1, 1, 2]
console.log(fibs(7)); // [0, 1, 1, 2, 3, 5, 8]


function fibsRec(n) {
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    return [...fibsRec(n - 1), fibsRec(n - 1)[n - 2] + fibsRec(n - 1)[n - 3]];
}

console.log(fibsRec(12)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]


// * MERGE SORT 

function mergeHalves(left, right) {
    const sorted = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sorted.push(left.shift());
        }
        else {
            sorted.push(right.shift());
        }
    }

    return [...sorted, ...left, ...right];
}

function mergeSort(arr) {
    if (arr.length < 2) return arr;

    const halfway = Math.floor(arr.length / 2);
    return mergeHalves(mergeSort(arr.slice(0, halfway)), mergeSort(arr.slice(halfway)));
}

console.log(mergeSort([5, 54, 3535, 63, 23, 4434, 5345, 5, 34, 534])); // [5, 5, 23, 34, 54, 63, 534, 3535, 4434, 5345]