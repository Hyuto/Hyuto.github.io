let increase = document.getElementById("increase");
let clear = document.getElementById("clear");
let count = document.getElementById("count");
increase.addEventListener("click", () => {
    let temp = parseInt(count.innerHTML) + 1;
    count.innerHTML = temp;
});
    clear.addEventListener("click", () => {
    count.innerHTML = "0";
});