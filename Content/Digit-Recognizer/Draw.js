function Clear(canvas, canvas2){
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas2.getContext("2d").clearRect(0, 0, canvas2.width, canvas2.height);
    document.getElementById("prediction").innerHTML = null;
}

//Drawing functionality
function startDraw() {
    drawing = true;
}

function stopDraw() {
    drawing = false;
    lastPosition = null;
}

function mouseMove(evt) {
    var pos = {
        x: evt.offsetX,
        y: evt.offsetY
        };
    if (lastPosition !== null && drawing === true) {
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 20;
        ctx.closePath();
        ctx.stroke();
    }
    run(model.model);
    lastPosition = pos;
}