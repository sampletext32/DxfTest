
const coordPanel = document.getElementById("_debug_coord");
const scalePanel = document.getElementById("_debug_scale");
const errorPanel = document.getElementById("_debug_errors");

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

function _debugShowErrors(errors) {
    if (errorPanel)
        errorPanel.innerText = errors;
}

window.onerror = _debugShowErrors;
window.onunhandledrejection = (e) => _debugShowErrors(e.reason);