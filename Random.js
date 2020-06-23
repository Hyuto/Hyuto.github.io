function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}