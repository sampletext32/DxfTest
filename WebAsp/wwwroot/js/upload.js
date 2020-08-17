const hostUrl = "https://u1123042.plsk.regruhosting.ru/api/dxf";
const fileInput = document.getElementById("file");

fileInput.addEventListener("change", handleFiles, false);

function handleFiles() {
    canvas.style.display = "block";
    var formData = new FormData();
    const file = fileInput.files[0];

    formData.append("file", file);

    try {
        fetch(hostUrl, { method: "POST", mode: "cors", body: formData })
            .then(response => response.json())
            .then(json => {
                dxfObjectsJson = invertYAxis(json);
                init();
                console.log("parsed json", json);
            })
            .catch(ex => console.log("parsing failed", ex));
    } catch (e) {
        console.error("Some problems: ", e);
    }
}


function invertYAxis(data) {
    data.forEach(el => {
        switch (el[0]) {
        case "line":
            el[2] *= -1;
            el[4] *= -1;
            break;
        case "circle":
            el[2] *= -1;
            break;
        case "arc":
            el[2] *= -1;
            break;
        case "spline":
            for (var i = 1; i < el.length; i++)
                el[i][1] *= -1;
            break;
        default:
            break;
        }
    });
    return data;
}