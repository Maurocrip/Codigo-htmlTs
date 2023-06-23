"use strict";
/*! Comentario visible en .js

Función para subir una foto al servidor web y
mostrarla en un tag img, utilizando AJAX

*/
var xhr = new XMLHttpRequest();
function SubirFoto() {
    var foto = document.getElementById("foto");
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('op', "subirFoto");
    xhr.open('POST', './BACKEND/nexo.php', true);
    xhr.setRequestHeader("enctype", "multipart/form-data");
    xhr.send(form);
    xhr.onreadystatechange = function () {
        respuestaArray();
    };
}
function respuestaArray() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        var ret = xhr.responseText;
        var retArray = ret.split("-");
        if (retArray[0] == "false") {
            console.error("NO se subió la foto!!!");
        }
        else {
            console.info("Foto subida OK!!!");
            document.getElementById("imgFoto").src = "./BACKEND/" + retArray[1];
        }
    }
}
function respuestaJSON() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        var ret = xhr.responseText;
        var retJSON = JSON.parse(ret);
        if (!retJSON.exito) {
            console.error("NO se subió la foto!!!");
        }
        else {
            console.info("Foto subida OK!!!");
            document.getElementById("imgFoto").src = "./BACKEND/" + retJSON.path;
        }
    }
}
//# sourceMappingURL=ejemplo.js.map