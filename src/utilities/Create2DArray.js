function createArray(length) {
    let array = Array(length).fill().map(() => Array(length).fill(0));

    return array;
}

export function makeObject(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            array[i][j] = {column: [], row: [], square: []}
        }   
    }

    return array;
}

export function createFullArray(length) {
    let array = Array(length).fill().map(() => Array(length).fill(1));

    return array;
}

export default createArray;