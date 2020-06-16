function getRandom(min, max){
    return Math.floor((Math.random() * max) + min);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}