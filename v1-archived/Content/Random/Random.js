function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function Random(){
    const min = document.getElementById("Minimal").value;
    const max = document.getElementById("Maksimal").value;
    if(isNumeric(min) && isNumeric(max)){
        if(parseInt(min) < parseInt(max)){
            let random = getRandom(parseInt(min), parseInt(max));
            let state = 'Random value is ' + random.toString();
            document.getElementById("Hasil").innerHTML = state;
        }else{
            document.getElementById("Hasil").innerHTML = 'Input Error : Nilai Minimum Lebih Besar dari Nilai Maksimum';
        }
    }else{
        document.getElementById("Hasil").innerHTML = 'Input Error : Input mengandung Non-Numeric Element';
    }
}