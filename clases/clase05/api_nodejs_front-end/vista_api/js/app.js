"use strict";
window.addEventListener("load", function () {
    Main.MostrarListado();
});
var Main;
(function (Main) {
    var URL_API = "http://localhost:9876/";
    var AJAX = new Ajax();
    function MostrarListado() {
        AJAX.Get(URL_API + "productos_bd", MostrarListadoSuccess, "", Fail);
    }
    Main.MostrarListado = MostrarListado;
    function AgregarProducto() {
        var codigo = parseInt(document.getElementById("codigo").value);
        var marca = document.getElementById("marca").value;
        var precio = parseFloat(document.getElementById("precio").value);
        var foto = document.getElementById("foto");
        var data = {
            "codigo": codigo,
            "marca": marca,
            "precio": precio
        };
        var form = new FormData();
        form.append('foto', foto.files[0]);
        form.append('obj', JSON.stringify(data));
        AJAX.Post(URL_API + "productos_bd", AgregarSuccess, form, Fail);
    }
    Main.AgregarProducto = AgregarProducto;
    function AgregarSuccess(retorno) {
        console.log("Agregar: ", retorno);
        MostrarListado();
        LimpiarForm();
    }
    function ModificarProducto() {
        var codigo = parseInt(document.getElementById("codigo").value);
        var marca = document.getElementById("marca").value;
        var precio = parseFloat(document.getElementById("precio").value);
        var foto = document.getElementById("foto");
        var data = {
            "codigo": codigo,
            "marca": marca,
            "precio": precio
        };
        var form = new FormData();
        form.append('foto', foto.files[0]);
        form.append('obj', JSON.stringify(data));
        AJAX.Post(URL_API + "productos_bd/modificar", ModificarSuccess, form, Fail);
    }
    Main.ModificarProducto = ModificarProducto;
    function ModificarSuccess(retorno) {
        console.log("Modificar: ", retorno);
        var btn = document.getElementById("btnForm");
        btn.value = "Agregar";
        btn.removeEventListener("click", function () {
            ModificarProducto();
        });
        btn.addEventListener("click", function () {
            AgregarProducto();
        });
        MostrarListado();
        LimpiarForm();
    }
    function MostrarListadoSuccess(data) {
        var prod_obj_array = JSON.parse(data);
        console.log("Mostrar: ", prod_obj_array);
        var div = document.getElementById("divListado");
        var tabla = "<table class=\"table table-hover\">\n                        <tr>\n                            <th>C\u00D3DIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCIONES</th>\n                        </tr>";
        if (prod_obj_array.length < 1) {
            tabla += "<tr><td>---</td><td>---</td><td>---</td><td>---</td>\n                            <td>---</td></tr>";
        }
        else {
            for (var index = 0; index < prod_obj_array.length; index++) {
                var dato = prod_obj_array[index];
                tabla += "<tr><td>" + dato.codigo + "</td><td>" + dato.marca + "</td><td>" + dato.precio + "</td>\n                                        <td><img src=\"" + URL_API + dato.path + "\" width=\"80px\" hight=\"80px\"></td>\n                                        <td><button type=\"button\" class=\"btn btn-info\" id=\"\" \n                                                data-obj='" + JSON.stringify(dato) + "' name=\"btnModificar\">\n                                                <span class=\"bi bi-pencil\"></span>\n                                            </button>\n                                            <button type=\"button\" class=\"btn btn-danger\" id=\"\" \n                                                data-codigo='" + dato.codigo + "' name=\"btnEliminar\">\n                                                <span class=\"bi bi-x-circle\"></span>\n                                            </button>\n                                        </td></tr>";
            }
        }
        tabla += "</table>";
        div.innerHTML = tabla;
        document.getElementsByName("btnModificar").forEach(function (boton) {
            boton.addEventListener("click", function () {
                var obj = boton.getAttribute("data-obj");
                var obj_dato = JSON.parse(obj);
                document.getElementById("codigo").value = obj_dato.codigo;
                document.getElementById("marca").value = obj_dato.marca;
                document.getElementById("precio").value = obj_dato.precio;
                document.getElementById("img_foto").src = URL_API + obj_dato.path;
                document.getElementById("div_foto").style.display = "block";
                document.getElementById("codigo").readOnly = true;
                var btn = document.getElementById("btnForm");
                btn.value = "Modificar";
                btn.removeEventListener("click", function () {
                    AgregarProducto();
                });
                btn.addEventListener("click", function () {
                    ModificarProducto();
                });
            });
        });
        document.getElementsByName("btnEliminar").forEach(function (boton) {
            boton.addEventListener("click", function () {
                var codigo = boton.getAttribute("data-codigo");
                if (confirm("\u00BFSeguro de eliminar producto con c\u00F3digo " + codigo + "?")) {
                    var headers = [{ "key": "content-type", "value": "application/json" }];
                    var data_1 = "{\"codigo\": " + codigo + "}";
                    AJAX.Post(URL_API + "productos_bd/eliminar", DeleteSuccess, data_1, Fail, headers);
                }
            });
        });
    }
    function DeleteSuccess(retorno) {
        console.log("Eliminar", retorno);
        MostrarListado();
    }
    function Fail(retorno) {
        console.error(retorno);
        alert("Ha ocurrido un ERROR!!!");
    }
    function LimpiarForm() {
        document.getElementById("img_foto").src = "";
        document.getElementById("div_foto").style.display = "none";
        document.getElementById("codigo").readOnly = false;
        document.getElementById("codigo").value = "";
        document.getElementById("marca").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("foto").value = "";
    }
})(Main || (Main = {}));
//# sourceMappingURL=app.js.map