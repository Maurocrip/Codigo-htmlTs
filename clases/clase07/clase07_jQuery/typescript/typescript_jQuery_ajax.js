"use strict";
/// <reference path="../libs/jquery/index.d.ts" />
$(function () {
    JqueryAjaxTraerCds();
});
function JqueryAjaxTraerCds() {
    var pagina = "BACKEND/POO/nexo.php";
    var datoObjeto = { "op": "traerListadoCD" };
    $("#divResultado").html("");
    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "text",
        data: datoObjeto,
        async: true
    })
        .done(function (resultado) {
        $("#divResultado").html(resultado);
        manejador_click_btn_eliminar();
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}
function manejador_click_btn_eliminar() {
    var $btn = $('[data-action="btn_eliminar"]');
    if ($btn) {
        $btn.on('click', function (e) {
            e.preventDefault();
            var obj_cd_string = $(this).attr("data-obj");
            var obj_cd;
            if (obj_cd_string !== undefined) {
                obj_cd = JSON.parse(obj_cd_string);
                var confirma = confirm("\u00BFEliminar: " + obj_cd.titulo + " - " + obj_cd.anio + "?");
                if (!confirma) {
                    return;
                }
            }
            else {
                console.log("no se recupero el json");
                return;
            }
            var data = [];
            data.push({ name: "id_cd", value: obj_cd.id });
            data.push({ name: "op", value: "eliminarCd" });
            $.post("./BACKEND/POO/nexo.php", data, function (rta) {
                console.log(rta);
                if (rta.exito) {
                    $("#divResultado").empty();
                    JqueryAjaxTraerCds();
                }
            }, "json").fail(function (a) {
                console.log(a.responseText);
            });
        });
    }
}
//# sourceMappingURL=typescript_jQuery_ajax.js.map