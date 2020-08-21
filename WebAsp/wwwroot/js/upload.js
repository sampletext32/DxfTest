const hostUrl = "https://u1123042.plsk.regruhosting.ru/api/dxf";
const fileInput = document.getElementById("file");

fileInput.addEventListener("change", handleFiles, false);

function handleFiles() {
    var formData = new FormData();
    const file = fileInput.files[0];

    formData.append("file", file);

    fetch(hostUrl, { method: "POST", mode: "cors", body: formData })
        .then(response => response.json())
        .then(json => {
            json["entities"] = invertYAxis(json["entities"]);
            document.dxfData = json;
            console.log("Processed json", json);
            init();
        })
        // .catch(ex => console.log("Parsing failed", ex));
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
            el[4] = 2 * Math.PI - degToRad(el[4]);
            el[5] = 2 * Math.PI - degToRad(el[5]);
            [el[4], el[5]] = [el[5], el[4]];
            break;
        case "spline":
            for (let i = 1; i < el.length; i++)
                el[i][1] *= -1;
            break;
        default:
            break;
        }
    });
    return data;
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}
