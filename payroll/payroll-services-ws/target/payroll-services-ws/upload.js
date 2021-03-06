var BASE_URL = "http://localhost:8080/payroll-services-ws/api/";

onload = function() {
    document.getElementById("submit").onclick = sendFile;
};

function sendFile() {
    document.getElementById("status").innerHTML = "";
    
    var file = document.getElementById("filechooser").files[0];
    var extension = file.name.split(".").pop();
    
    var type;
    if (extension === "jpg" || extension === "jpeg" ||
        extension === "JPG" || extension === "JPEG") {
        type = "image/jpeg";
    } else if (extension === "png" || extension === "PNG") {
        type = "image/png";
    } else {
        document.getElementById("status").innerHTML = "Invalid file type";
        return;
    }
    
    var request = new XMLHttpRequest();
    request.open("POST", BASE_URL + "images");
    request.onload = function() {
        if (request.status === 201) {
            var fileName = request.getResponseHeader("Location").split("/").pop();
            document.getElementById("status").innerHTML = "File created with name " + fileName;
        } else {
            document.getElementById("status").innerHTML = "Error creating file: (" + request.status + ") " + request.responseText;
        }
    };
    request.setRequestHeader("Content-Type", type);
    request.send(file);
}