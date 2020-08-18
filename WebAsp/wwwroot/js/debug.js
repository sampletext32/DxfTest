
const coordPanel = document.getElementById("_debug_coord");
const scalePanel = document.getElementById("_debug_scale");

function _debugShowMouseCoords(x, y) {
    if (coordPanel)
        coordPanel.innerText = 
            "X: " + Math.round(x) + 
            " Y: " + Math.round(y);
}

function _debugShowScale(scale) {
    if (scalePanel)
        scalePanel.innerText = "Scale: " + scale.toFixed(2);
}