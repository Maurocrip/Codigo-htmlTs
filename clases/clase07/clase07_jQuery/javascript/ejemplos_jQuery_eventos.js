
$(function(){

    alert("Este evento se dispará cuando todos los elementos de DOM est\u00E9n cargados.");

    $("#btnTodos").on("click", function(){

        $("p").css("font-family", "arial black");
    });

    $("#btnId").on("click", function(){

        var contenidoAnterior = $("#idP").html();
        alert(contenidoAnterior);
        $("#idP").html("Establezco un nuevo contenido en el elemento HTML.");

    });

    $("#btnMostrar").on("click", function(){

        var nombre = $("#txtNombre").val();
        var opcion = $("#cboSeleccion").val();
    
        alert("Nombre: " + nombre + "\nOpcion: " + opcion);

        $("#idDiv").html("Nombre: " + nombre + "<br>Opcion: " + opcion);
    });

    $("#btnCambiar").on("click", function(){

        CambiarDatos();
    });

});


function CambiarDatos(){

    //ESTABLEZCO NUEVOS VALORES
    alert("Cambia de valor la seleccion ('op2')\ny del nombre ('ROBERTO')");
    
    $("#txtNombre").val("ROBERTO");
    $("#cboSeleccion").val("op2");

}