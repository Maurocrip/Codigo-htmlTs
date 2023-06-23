/// <reference path="../libs/jquery/index.d.ts" />

$(function(){

    JqueryAjaxTraerCds();

});

function JqueryAjaxTraerCds():void {

    let pagina = "BACKEND/POO/nexo.php";
    let datoObjeto = {"op" : "traerListadoCD" };
  
    $("#divResultado").html("");

    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "text",
        data: datoObjeto,
        async: true
    })
    .done(function (resultado:any) {

        $("#divResultado").html(resultado);

        manejador_click_btn_eliminar();
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
}

function manejador_click_btn_eliminar(){

    var $btn = $('[data-action="btn_eliminar"]');

    if ($btn) {

        $btn.on('click', function(e:any) {
   
            e.preventDefault();
          
            let obj_cd_string = $(this).attr("data-obj"); 

            let obj_cd:any;

            if(obj_cd_string !== undefined){

                obj_cd = JSON.parse(obj_cd_string);
                let confirma = confirm("\u00BFEliminar: " + obj_cd.titulo + " - " + obj_cd.anio + "?");

                if( ! confirma){ return; }
            }
            else
            { 
                console.log("no se recuperó el json");
                return;
            }

            var data = [];
            data.push({name: "id_cd", value: obj_cd.id});
            data.push({name: "op", value: "eliminarCd"});

            $.post("./BACKEND/POO/nexo.php", data, function (rta:any) {

                console.log(rta);

                if(rta.exito){

                    $("#divResultado").empty();

                    JqueryAjaxTraerCds();
                }

            }, "json").fail(function (a:any) {

                console.log(a.responseText);
  
            });
            
        });
    }
}