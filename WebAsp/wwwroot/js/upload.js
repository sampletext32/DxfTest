const hostUrl = "/api/dxf";
const fileInput = document.getElementById("file");

fileInput.addEventListener("change", handleFiles, false);

async function handleFiles() {
    canvas.style.display = 'block';
    var formData = new FormData();
    const file = fileInput.files[0];

    formData.append("file", file);

    try {
        var response = await fetch(hostUrl, { method: "POST", body: formData });
        data = await response.json();
        init();
    } catch (e) {
        console.error("Some problems: ", e);
    }
}