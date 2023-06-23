
$(function(){

    $("#btnOcultar").on("click", function(){

        $("#idHideShow").hide();

    });

    $("#btnMostrar").on("click", function(){

        $("#idHideShow").show();

    });

    $("#btnOcultarV").on("click", function(){

        $("#idHideShowVelocidad").hide(1000);

    });

    $("#btnMostrarV").on("click", function(){

        $("#idHideShowVelocidad").show(1000);

    });


    $("#btnToggle").on("click", function(){

        $("#idHideShowVelocidad").toggle(1000);
        $("#idHideShow").toggle();
    });

    $("#btnAgregar").on("click", function(){

        $("#idHideShow").append("...Agrego texto al final....");

    });

    $("#btnAgregarInicio").on("click", function(){

        $("#idHideShow").prepend("Agrego texto al inicio....");

    });
   
    $("#btnRemover").on("click", function(){

        $("#div1").remove();

    });
    
    $("#btnVaciar").on("click", function(){

        $("#div2").empty();

    });

});


