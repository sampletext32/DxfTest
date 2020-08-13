const hostUrl = "https://u1123042.plsk.regruhosting.ru/api/dxf";
const fileInput = document.getElementById("file");

fileInput.addEventListener("change", handleFiles, false);

function handleFiles() {
    canvas.style.display = 'block';
    var formData = new FormData();
    const file = fileInput.files[0];

    formData.append("file", file);

    try {
        fetch(hostUrl, { method: "POST", mode: "cors", body: formData })
            .then(response => response.json())
            .then(json => {
                dxfObjectsJson = json;
                init();
                console.log('parsed json', json);
            })
            .catch(ex => console.log('parsing failed', ex));
    } catch (e) {
        console.error("Some problems: ", e);
    }
}