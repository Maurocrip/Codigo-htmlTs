"use strict";
window.addEventListener("load", function () {
    var btnTraer = document.getElementById("btnTraer");
    var btnAgregar = document.getElementById("btnAgregar");
    var btnModificar = document.getElementById("btnModificar");
    var btnEliminar = document.getElementById("btnEliminar");
    btnTraer.addEventListener("click", TraerListadoProductoBD);
    btnAgregar.addEventListener("click", AgregarProductoBD);
    btnModificar.addEventListener("click", ModificarProductoBD);
    btnEliminar.addEventListener("click", EliminarProductoBD);
});
function TraerListadoProductoBD() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", URL_API + "productos_bd", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var prod_obj_array = JSON.parse(xhttp.responseText);
            var div = document.getElementById("divListado");
            var tabla = "<table>\n                            <tr>\n                                <th>C\u00D3DIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCI\u00D3N</th>\n                            </tr>";
            for (var index = 0; index < prod_obj_array.length; index++) {
                var dato = prod_obj_array[index];
                tabla += "<tr><td>" + dato.codigo + "</td><td>" + dato.marca + "</td><td>" + dato.precio + "</td>\n                            <td><img src=\"" + URL_API + dato.path + "\" width=\"50px\" hight=\"50px\"></td>\n                            <td><input type=\"button\" id=\"\" data-obj='" + JSON.stringify(dato) + "' \n                                value=\"Seleccionar\" name=\"btnSeleccionar\"></td></tr>";
            }
            tabla += "</table>";
            div.innerHTML = tabla;
            AsignarManejadoresSeleccionProductoBD();
            LimpiarFoto();
        }
    };
}
function AsignarManejadoresSeleccionProductoBD() {
    document.getElementsByName("btnSeleccionar").forEach(function (elemento) {
        elemento.addEventListener("click", function () { ObtenerModificarProductoBD(elemento); });
        elemento.addEventListener("click", function () { ObtenerEliminar(elemento); });
    });
}
function AgregarProductoBD() {
    var codigo = parseInt(document.getElementById("txtCodigo").value);
    var marca = document.getElementById("txtMarca").value;
    var precio = parseFloat(document.getElementById("txtPrecio").value);
    var foto = document.getElementById("foto");
    var data = {
        "codigo": codigo,
        "marca": marca,
        "precio": precio
    };
    var xhttp = new XMLHttpRequest();
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('obj', JSON.stringify(data));
    xhttp.open("POST", URL_API + "productos_bd", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    xhttp.send(form);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var mensaje = xhttp.responseText;
            alert(mensaje);
            TraerListadoProductoBD();
        }
    };
}
function ObtenerModificarProductoBD(dato) {
    var obj = dato.getAttribute("data-obj");
    var obj_dato = JSON.parse(obj);
    document.getElementById("txtCodigo_m").value = obj_dato.codigo;
    document.getElementById("txtMarca_m").value = obj_dato.marca;
    document.getElementById("txtPrecio_m").value = obj_dato.precio;
    document.getElementById("imgFoto_m").src = URL_API + obj_dato.path;
}
function ModificarProductoBD() {
    var codigo = parseInt(document.getElementById("txtCodigo_m").value);
    var marca = document.getElementById("txtMarca_m").value;
    var precio = parseFloat(document.getElementById("txtPrecio_m").value);
    var foto = document.getElementById("foto_m");
    var data = {
        "codigo": codigo,
        "marca": marca,
        "precio": precio
    };
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('obj', JSON.stringify(data));
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL_API + "productos_bd/modificar", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    xhttp.send(form);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var mensaje = xhttp.responseText;
            alert(mensaje);
            TraerListadoProductoBD();
        }
    };
}
function EliminarProductoBD() {
    var codigo = parseInt(document.getElementById("txtCodigo_e").value);
    var data = {
        "codigo": codigo,
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL_API + "productos_bd/eliminar", true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var mensaje = xhttp.responseText;
            alert(mensaje);
            TraerListadoProductoBD();
        }
    };
}
//# sourceMappingURL=script_bd.js.map