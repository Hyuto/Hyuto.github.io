//Drawing functionality
function startDraw() {
    drawing = true;
    if(onMobile){
        On("coveringImage");
    }
}

function stopDraw() {
    drawing = false;
    lastPosition = null;
    if(onMobile){
        run(model.model);
    }
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
        if(!(onMobile)){
            run(model.model);
        }
    }
    lastPosition = pos;
}

function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

canvas.onmousedown = startDraw;
canvas.onmouseup = stopDraw;
canvas.onmousemove = mouseMove;
canvas.onmouseleave = stopDraw;

canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);