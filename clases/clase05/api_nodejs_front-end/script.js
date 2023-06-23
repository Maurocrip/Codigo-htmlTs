"use strict";
var URL_API = "http://localhost:9876/";
function ObtenerEliminar(dato) {
    var obj = dato.getAttribute("data-obj");
    var obj_dato = JSON.parse(obj);
    document.getElementById("txtCodigo_e").value = obj_dato.codigo;
}
function Limpiar() {
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtCodigo_m").value = "";
    document.getElementById("txtMarca_m").value = "";
    document.getElementById("txtPrecio_m").value = "";
    document.getElementById("txtCodigo_e").value = "";
}
function LimpiarFoto() {
    Limpiar();
    document.getElementById("foto").value = "";
    document.getElementById("imgFoto_m").src = "";
    document.getElementById("foto_m").value = "";
}
//# sourceMappingURL=script.js.map