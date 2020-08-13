
/** VARIABLES **/

var canvas = document.getElementById('canvas');
var w, h; // canvas width & height shortcuts
var offsetX = 0, offsetY = 0;
var scale = 1.0;
var ctx = canvas.getContext('2d');
var mouseDown = 0;

const minScaleLim = 0.1, maxScaleLim = 10.0;

var dxfObjectsJson;


/** FUNCTIONS **/

function init() {
    ctx.lineWidth = 1.5;
    offsetX = w / 3;
    offsetY = h / 3;
    window.requestAnimationFrame(drawFrame);
}

function resizeCanvas() {
    h = canvas.height = window.innerHeight;
    w = canvas.width = window.innerWidth;
}

function scaleCanvas(e) {
    scale -= e.deltaY * 0.01;
    if (scale < minScaleLim) scale = minScaleLim;
    if (scale > maxScaleLim) scale = maxScaleLim;
}

function mouseMove (e) {
    if (!mouseDown)
        return;
    offsetX += e.movementX;
    offsetY += e.movementY;
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
    window.requestAnimationFrame(drawFrame);
}

function drawBackground() {
    ctx.fillStyle = "#2c78c1";
    ctx.fillRect(0, 0, w, h);
}

function drawGrid() {
    ctx.strokeStyle = "rgb(255, 255, 255, 0.3)";

    // vertical lines
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    for (var offset = 10; offset < w - 10; offset += 10)  {
        ctx.moveTo(offset, 10);
        ctx.lineTo(offset, h - 10);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    for (var offset = 10; offset < w - 10; offset += 100)  {
        ctx.moveTo(offset, 10);
        ctx.lineTo(offset, h - 10);
    }
    ctx.stroke();

    // horizontal lines
    ctx.lineWidth = 0.5;
    for (var offset = 10; offset < h - 10; offset += 10)  {
        ctx.moveTo(10, offset);
        ctx.lineTo(w - 10, offset);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    for (var offset = 10; offset < h - 10; offset += 100)  {
        ctx.moveTo(10, offset);
        ctx.lineTo(w - 10, offset);
    }
    ctx.stroke();

    // border
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgb(255, 255, 255, 0.7)";
    ctx.strokeRect(10, 10, w - 20, h - 20);

}


function drawPlot() {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;

    for (var i = 0; i < dxfObjectsJson.length; i++) {
        var el = dxfObjectsJson[i];

        ctx.beginPath();
        switch (el[0]) {
            case "line":
                ctx.moveTo(scale*el[1] + offsetX, scale*el[2] + offsetY);
                ctx.lineTo(scale*el[3] + offsetX, scale*el[4] + offsetY);
                break;
            case "circle":
                ctx.arc(scale*el[1] + offsetX, scale*el[2] + offsetY, scale*el[3], 0, 2 * Math.PI);
                break;
            case "arc":
                ctx.arc(scale*el[1] + offsetX, scale*el[2] + offsetY, scale*el[3], el[4], el[5]);
                break;
            case "spline": 
                ctx.moveTo(scale*el[1][0] + offsetX, scale*el[1][1] + offsetY);
                for (var j = 2; j < el.length - 1; j += 1) {
                    ctx.quadraticCurveTo(
                        scale*el[ j ][0] + offsetX, scale*el[ j ][1] + offsetY, 
                        scale*el[j+1][0] + offsetX, scale*el[j+1][1] + offsetY
                    );
                }
                break;

            default:
                break;
        }
        ctx.stroke();
    }

}


/** LISTENERS **/

window.onresize = resizeCanvas;
window.onwheel = scaleCanvas;
document.body.onmousemove = mouseMove;
document.body.onmousedown = () => { ++mouseDown; }
document.body.onmouseup = () => { --mouseDown; }


/** DRIVER CODE **/

resizeCanvas();
