"use strict";
var Test;
(function (Test) {
    var xhttp = new XMLHttpRequest();
    function Ajax() {
        xhttp.open("GET", "BACKEND/ajax_test.php", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            console.log(xhttp.readyState + " - " + xhttp.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
            }
        };
    }
    Test.Ajax = Ajax;
    function AjaxGET() {
        xhttp.open("GET", "BACKEND/ajax_test.php?valor=" + Math.random() * 100, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
            }
        };
    }
    Test.AjaxGET = AjaxGET;
    function AjaxPOST() {
        xhttp.open("POST", "BACKEND/ajax_test.php", true);
        var form = new FormData();
        form.append('valor', (Math.random() * 100).toString());
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
            }
        };
    }
    Test.AjaxPOST = AjaxPOST;
    function ActualizarGET() {
        xhttp.open("GET", "BACKEND/ajax_test.php?valor=" + Math.random() * 100, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            AdministrarRespuesta();
        };
    }
    Test.ActualizarGET = ActualizarGET;
    function ActualizarPOST() {
        xhttp.open("POST", "BACKEND/ajax_test.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send("valor=" + Math.random() * 100);
        xhttp.onreadystatechange = function () {
            AdministrarRespuesta();
        };
    }
    Test.ActualizarPOST = ActualizarPOST;
    function AdministrarRespuesta() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("divResultado").innerHTML = xhttp.responseText;
        }
    }
    function ProcesoLargo() {
        var pagina = "BACKEND/proceso_largo.php";
        var div = document.getElementById("divResultado");
        div.innerHTML = '';
        AdministrarGif(true, 1);
        xhttp.open("POST", pagina, true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(null);
        xhttp.onreadystatechange = function () {
            var DONE = 4;
            var OK = 200;
            if (xhttp.readyState === DONE) {
                if (xhttp.status === OK) {
                    div.innerHTML = xhttp.responseText;
                    AdministrarGif(false);
                }
                else {
                    alert("Error\n" + xhttp.status);
                    AdministrarGif(false);
                }
            }
        };
    }
    Test.ProcesoLargo = ProcesoLargo;
    function AdministrarGif(mostrar, cual) {
        if (cual === void 0) { cual = 1; }
        var gif = cual === 1 ? "AJAX/gif-load.gif" : "AJAX/200.webp";
        var div = document.getElementById("divGif");
        var img = document.getElementById("imgGif");
        if (mostrar) {
            div.style.display = "block";
            div.style.top = "50%";
            div.style.left = "45%";
            img.src = gif;
        }
        if (!mostrar) {
            div.style.display = "none";
            img.src = "";
        }
    }
    function IrHacia(pagina) {
        window.location.href = pagina;
    }
    Test.IrHacia = IrHacia;
})(Test || (Test = {}));
//# sourceMappingURL=manejadora.js.map