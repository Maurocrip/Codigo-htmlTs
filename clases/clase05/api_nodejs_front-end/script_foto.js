"use strict";
window.addEventListener("load", function () {
    var btnTraer = document.getElementById("btnTraer");
    var btnAgregar = document.getElementById("btnAgregar");
    var btnModificar = document.getElementById("btnModificar");
    var btnEliminar = document.getElementById("btnEliminar");
    btnTraer.addEventListener("click", TraerListadoProductoFoto);
    btnAgregar.addEventListener("click", AgregarProductoFoto);
    btnModificar.addEventListener("click", ModificarProductoFoto);
    btnEliminar.addEventListener("click", EliminarProductoFoto);
});
function TraerListadoProductoFoto() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", URL_API + "productos_fotos", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var prod_string_array = JSON.parse(xhttp.responseText);
            var prod_obj_array_1 = [];
            prod_string_array.forEach(function (obj_str) {
                if (obj_str !== "") {
                    prod_obj_array_1.push(JSON.parse(obj_str));
                }
            });
            var div = document.getElementById("divListado");
            var tabla = "<table>\n                            <tr>\n                                <th>C\u00D3DIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCI\u00D3N</th>\n                            </tr>";
            for (var index = 0; index < prod_obj_array_1.length; index++) {
                var dato = prod_obj_array_1[index];
                tabla += "<tr><td>" + dato.codigo + "</td><td>" + dato.marca + "</td><td>" + dato.precio + "</td>\n                            <td><img src=\"" + URL_API + dato.path + "\" width=\"50px\" hight=\"50px\"></td>\n                            <td><input type=\"button\" id=\"\" data-obj='" + JSON.stringify(dato) + "' \n                                value=\"Seleccionar\" name=\"btnSeleccionar\"></td></tr>";
            }
            tabla += "</table>";
            div.innerHTML = tabla;
            AsignarManejadoresSeleccionProductoFoto();
            LimpiarFoto();
        }
    };
}
function AsignarManejadoresSeleccionProductoFoto() {
    document.getElementsByName("btnSeleccionar").forEach(function (elemento) {
        elemento.addEventListener("click", function () { ObtenerModificarProductoFoto(elemento); });
        elemento.addEventListener("click", function () { ObtenerEliminar(elemento); });
    });
}
function AgregarProductoFoto() {
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
    form.append('obj', "{\"codigo\":" + codigo + ", \"marca\":\"" + marca + "\", \"precio\":" + precio + "}");
    xhttp.open("POST", URL_API + "productos_fotos", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    xhttp.send(form);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var mensaje = xhttp.responseText;
            alert(mensaje);
            TraerListadoProductoFoto();
        }
    };
}
function ObtenerModificarProductoFoto(dato) {
    var obj = dato.getAttribute("data-obj");
    var obj_dato = JSON.parse(obj);
    document.getElementById("txtCodigo_m").value = obj_dato.codigo;
    document.getElementById("txtMarca_m").value = obj_dato.marca;
    document.getElementById("txtPrecio_m").value = obj_dato.precio;
    document.getElementById("imgFoto_m").src = URL_API + obj_dato.path;
}
function ModificarProductoFoto() {
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
    xhttp.open("POST", URL_API + "productos_fotos/modificar", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    xhttp.send(form);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var mensaje = xhttp.responseText;
            alert(mensaje);
            TraerListadoProductoFoto();
        }
    };
}
function EliminarProductoFoto() {
    var codigo = parseInt(document.getElementById("txtCodigo_e").value);
    var data = {
        "codigo": codigo,
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL_API + "productos_fotos/eliminar", true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var mensaje = xhttp.responseText;
            alert(mensaje);
            TraerListadoProductoFoto();
        }
    };
}
//# sourceMappingURL=script_foto.js.map