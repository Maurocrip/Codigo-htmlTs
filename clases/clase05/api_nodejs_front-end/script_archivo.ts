
window.addEventListener("load", ()=>{

    let btnTraer = <HTMLButtonElement>document.getElementById("btnTraer");
    let btnAgregar = <HTMLInputElement>document.getElementById("btnAgregar");
    let btnModificar = <HTMLInputElement>document.getElementById("btnModificar");
    let btnEliminar = <HTMLButtonElement>document.getElementById("btnEliminar");


    btnTraer.addEventListener("click", TraerListadoProductoArchivo);
    btnAgregar.addEventListener("click", AgregarProductoArchivo);
    btnModificar.addEventListener("click", ModificarProductoArchivo);
    btnEliminar.addEventListener("click", EliminarProductoArchivo);
});

function TraerListadoProductoArchivo() {
    
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("GET", URL_API + "productos", true);

    //ENVIO DE LA PETICION
    xhttp.send();

    //FUNCION CALLBACK
    xhttp.onreadystatechange = () => {
        
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let prod_string_array = JSON.parse(xhttp.responseText);
            let prod_obj_array: any[] = [];

            prod_string_array.forEach((obj_str: string) => {
                if (obj_str !== "") {
                    prod_obj_array.push(JSON.parse(obj_str));
                }
            });

            let div = <HTMLDivElement>document.getElementById("divListado");

            let tabla = `<table>
                            <tr>
                                <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>ACCIÓN</th>
                            </tr>`;
            for (let index = 0; index < prod_obj_array.length; index++) {
                const dato = prod_obj_array[index];
                tabla += `<tr><td>${dato.codigo}</td><td>${dato.marca}</td><td>${dato.precio}</td>
                            <td><input type="button" id="" data-obj='${JSON.stringify(dato)}' 
                                value="Seleccionar" name="btnSeleccionar"></td></tr>`;
            }  
            
            tabla += `</table>`;

            div.innerHTML = tabla;

            AsignarManejadoresSeleccionProductoArchivo();

            Limpiar();
        }
    };
}

function AsignarManejadoresSeleccionProductoArchivo(){

    document.getElementsByName("btnSeleccionar").forEach((elemento)=>{

        elemento.addEventListener("click", ()=>{ ObtenerModificarProductoArchivo(elemento)});
        elemento.addEventListener("click", ()=>{ ObtenerEliminar(elemento)});
    });
}

function AgregarProductoArchivo() {
    
    let codigo:number = parseInt((<HTMLInputElement>document.getElementById("txtCodigo")).value);
    let marca:string = (<HTMLInputElement>document.getElementById("txtMarca")).value;
    let precio:number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecio")).value);

    let data = {
        "codigo" : codigo,
        "marca" : marca,
        "precio" : precio
    };

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("POST", URL_API + "productos", true);
	
    xhttp.setRequestHeader("content-type","application/json");
    
    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let mensaje : string = xhttp.responseText;

            alert(mensaje);

            TraerListadoProductoArchivo();
        }
    };
}

function ObtenerModificarProductoArchivo(dato:any) {

    let obj = dato.getAttribute("data-obj");

    let obj_dato = JSON.parse(obj);

    (<HTMLInputElement>document.getElementById("txtCodigo_m")).value = obj_dato.codigo;
    (<HTMLInputElement>document.getElementById("txtMarca_m")).value = obj_dato.marca;
    (<HTMLInputElement>document.getElementById("txtPrecio_m")).value = obj_dato.precio;   
}

function ModificarProductoArchivo(){

    let codigo:number = parseInt((<HTMLInputElement>document.getElementById("txtCodigo_m")).value);
    let marca:string = (<HTMLInputElement>document.getElementById("txtMarca_m")).value;
    let precio:number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecio_m")).value);

    let data = {
        "codigo" : codigo,
        "marca" : marca,
        "precio" : precio
    };

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("POST", URL_API + "productos/modificar", true);
	
    xhttp.setRequestHeader("content-type","application/json");
    
    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let mensaje : string = xhttp.responseText;

            alert(mensaje);

            TraerListadoProductoArchivo();
        }
    };
}

function EliminarProductoArchivo(){

    let codigo:number = parseInt((<HTMLInputElement>document.getElementById("txtCodigo_e")).value);

    let data = {
        "codigo" : codigo,
    };

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("POST", URL_API + "productos/eliminar", true);
	
    xhttp.setRequestHeader("content-type","application/json");
    
    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let mensaje : string = xhttp.responseText;

            alert(mensaje);

            TraerListadoProductoArchivo();
        }
    };
}