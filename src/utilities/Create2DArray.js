function createArray(length) {
    let array = Array(length).fill().map(() => Array(length).fill(0));

    return array;
}

export default createArray;