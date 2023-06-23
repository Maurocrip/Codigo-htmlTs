const URL_API : string = "http://localhost:9876/";


function ObtenerEliminar(dato:any) {

    let obj = dato.getAttribute("data-obj");

    let obj_dato = JSON.parse(obj);

    (<HTMLInputElement>document.getElementById("txtCodigo_e")).value = obj_dato.codigo;
}


function Limpiar(){

    (<HTMLInputElement>document.getElementById("txtCodigo")).value = "";
    (<HTMLInputElement>document.getElementById("txtMarca")).value = "";
    (<HTMLInputElement>document.getElementById("txtPrecio")).value = "";


    (<HTMLInputElement>document.getElementById("txtCodigo_m")).value = "";
    (<HTMLInputElement>document.getElementById("txtMarca_m")).value = "";
    (<HTMLInputElement>document.getElementById("txtPrecio_m")).value = "";

    (<HTMLInputElement>document.getElementById("txtCodigo_e")).value = "";

}

function LimpiarFoto(){

    Limpiar();
    
    (<HTMLInputElement> document.getElementById("foto")).value = "";
    
    (<HTMLImageElement>document.getElementById("imgFoto_m")).src = "";
    (<HTMLInputElement> document.getElementById("foto_m")).value = "";
}