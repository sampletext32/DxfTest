const hostUrl = "https://u1123042.plsk.regruhosting.ru/api/dxf";
const fileInput = document.getElementById("file");

fileInput.addEventListener("change", handleFiles, false);

function handleFiles() {
    canvas.style.display = 'block';
    var formData = new FormData();
    const file = fileInput.files[0];

    formData.append("file", file);


    try {
        fetch(hostUrl, { method: "POST", mode: "no-cors", body: formData })
            .then(response => response.text())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        init();
    } catch (e) {
        console.error("Some problems: ", e);
    }
}