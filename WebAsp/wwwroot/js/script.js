
/** VARIABLES **/

var canvas = document.getElementById("canvas");
var controls = document.getElementById("controls");
var costSpan = document.getElementById("cost");
var ctx = canvas.getContext("2d");
var w, h; // canvas width & height shortcuts
var offsetX = 0, offsetY = 0;
var currMouseAbs = { X: 0, Y: 0 };
var scale = 3.0;
var gridGap = 5 * scale;
var canvasVisible = false;

const minScaleLim = 0.1, maxScaleLim = 30.0;

var dxfEntities;
var dxfCost;


/** FUNCTIONS **/

function init() {
    resizeCanvas();
    ctx.lineWidth = 1.5;
    offsetX = w / 3;
    offsetY = h / 3;
    canvasVisible = true;
    canvas.style.display = "block";
    controls.style.display = "block";

    costSpan.innerHTML = document.dxfData["cost"];

    window.requestAnimationFrame(drawFrame);
}

function resizeCanvas() {
    h = canvas.height = window.innerHeight;
    w = canvas.width = window.innerWidth;
}

function scaleCanvas(delta) {
    scale -= (delta * 0.02) * Math.sqrt(scale);
    if (scale < minScaleLim) scale = minScaleLim;
    if (scale > maxScaleLim) scale = maxScaleLim;

    gridGap = 5 * scale;
    if (gridGap > 80) gridGap = (gridGap / 10);
    if (gridGap < 6) gridGap *= 10;

    window.requestAnimationFrame(drawFrame);
    _debugShowScale(scale);
}

function onWheel(e) {
    if (canvasVisible)
        scaleCanvas(e.deltaY);
}

function mouseMove(e) {
    if (e.buttons === 1 && canvasVisible) {
        offsetX += e.movementX;
        offsetY += e.movementY;
        window.requestAnimationFrame(drawFrame);
    }
    currMouseAbs.X = (e.clientX - offsetX) / scale;
    currMouseAbs.Y = (e.clientY - offsetY) / scale;
    _debugShowMouseCoords(currMouseAbs.X, currMouseAbs.Y);
}

function drawFrame() {
    ctx.save();
    ctx.clearRect(0, 0, w, h); // clear canvas

    drawBackground();
    // another way to move canvas
    // ctx.translate(offsetX, offsetY);
    drawGrid();
    drawPlot();

    ctx.restore();
}

function drawBackground() {
    ctx.fillStyle = "#2c78c1";
    ctx.fillRect(0, 0, w, h);
}

function drawGrid() {
    const mrg = 10;
    var gap = gridGap;
    var start = 0;

    ctx.strokeStyle = "rgb(255, 255, 255, 0.3)";

    // vertical lines
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    start = mrg + offsetX % gap;
    for (let offset = start; offset < w - mrg; offset += gap) {
        ctx.moveTo(offset, mrg);
        ctx.lineTo(offset, h - mrg);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    start = mrg + offsetX % (10 * gap);
    for (let offset = start; offset < w - mrg; offset += 10 * gap) {
        ctx.moveTo(offset, mrg);
        ctx.lineTo(offset, h - mrg);
    }
    ctx.stroke();

    // horizontal lines
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    start = mrg + offsetY % gap;
    for (let offset = start; offset < h - mrg; offset += gap) {
        ctx.moveTo(mrg, offset);
        ctx.lineTo(w - mrg, offset);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    start = mrg + offsetY % (10 * gap);
    for (let offset = start; offset < h - mrg; offset += 10 * gap) {
        ctx.moveTo(mrg, offset);
        ctx.lineTo(w - mrg, offset);
    }
    ctx.stroke();

    // border
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgb(255, 255, 255, 0.7)";
    ctx.strokeRect(mrg, mrg, w - 20, h - 20);

}


function drawPlot() {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;

    document.dxfData["entities"].forEach(dxfEntity => {
        ctx.beginPath();
        switch (dxfEntity[0]) {
        case "line":
            ctx.moveTo(scale * dxfEntity[1] + offsetX, scale * dxfEntity[2] + offsetY);
            ctx.lineTo(scale * dxfEntity[3] + offsetX, scale * dxfEntity[4] + offsetY);
            break;
        case "circle":
            ctx.arc(scale * dxfEntity[1] + offsetX, scale * dxfEntity[2] + offsetY, scale * dxfEntity[3], 0, 2 * Math.PI);
            break;
        case "arc":
            ctx.arc(scale * dxfEntity[1] + offsetX, scale * dxfEntity[2] + offsetY, scale * dxfEntity[3], dxfEntity[4], dxfEntity[5]);
            break;
        case "spline":
            ctx.moveTo(scale * dxfEntity[1][0] + offsetX, scale * dxfEntity[1][1] + offsetY);
            for (let j = 1; j < dxfEntity.length - 1; j++) {
                ctx.quadraticCurveTo(
                    scale * dxfEntity[j][0] + offsetX,
                    scale * dxfEntity[j][1] + offsetY,
                    scale * dxfEntity[j + 1][0] + offsetX,
                    scale * dxfEntity[j + 1][1] + offsetY
                );
            }
            break;

        default:
            break;
        }
        ctx.stroke();
    });

}


/** LISTENERS **/

window.onresize = resizeCanvas;
window.onwheel = onWheel;
document.body.onmousemove = mouseMove;
