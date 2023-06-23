/// <reference path="ajax.ts" />

window.addEventListener("load", ():void => {
    Main.MostrarListado();
}); 

namespace Main{
    
    const URL_API : string = "http://localhost:9876/"; 
    const AJAX : Ajax = new Ajax();

    export function MostrarListado():void {

        AJAX.Get(URL_API + "productos_bd", 
                    MostrarListadoSuccess, 
                    "", 
                    Fail);           
    }

    export function AgregarProducto():void {
        
        let codigo:number = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
        let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
        let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
        let foto : any = (<HTMLInputElement> document.getElementById("foto"));
    
        let data = {
            "codigo" : codigo,
            "marca" : marca,
            "precio" : precio
        };
    
        let form : FormData = new FormData();
        form.append('foto', foto.files[0]);
        form.append('obj', JSON.stringify(data));
    
        AJAX.Post(URL_API + "productos_bd", 
                    AgregarSuccess, 
                    form, 
                    Fail);
                        
    }

    function AgregarSuccess(retorno:string):void {

        console.log("Agregar: ", retorno);
        
        MostrarListado();

        LimpiarForm();
    }

    export function ModificarProducto():void {

        let codigo:number = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
        let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
        let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
        let foto : any = (<HTMLInputElement> document.getElementById("foto"));
    
        let data = {
            "codigo" : codigo,
            "marca" : marca,
            "precio" : precio
        };
    
        let form : FormData = new FormData();
        form.append('foto', foto.files[0]);
        form.append('obj', JSON.stringify(data));
    
        AJAX.Post(URL_API + "productos_bd/modificar", 
                                ModificarSuccess, 
                                form, 
                                Fail);
     
    }

    function ModificarSuccess(retorno:string):void {

        console.log("Modificar: ", retorno);

        let btn = (<HTMLInputElement>document.getElementById("btnForm"));
        btn.value = "Agregar";

        btn.removeEventListener("click", ():void=>{
            ModificarProducto();
        });

        btn.addEventListener("click", ():void=>{
            AgregarProducto();
        });

        MostrarListado();

        LimpiarForm();
    }

    function MostrarListadoSuccess(data:string):void {

        let prod_obj_array: any[] = JSON.parse(data);

        console.log("Mostrar: ", prod_obj_array);

        let div = <HTMLDivElement>document.getElementById("divListado");

        let tabla = `<table class="table table-hover">
                        <tr>
                            <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCIONES</th>
                        </tr>`;
                    if(prod_obj_array.length < 1){
                        tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                            <td>---</td></tr>`;
                    }
                    else {

                        for (let index = 0; index < prod_obj_array.length; index++) {
                            const dato = prod_obj_array[index];
                            tabla += `<tr><td>${dato.codigo}</td><td>${dato.marca}</td><td>${dato.precio}</td>
                                        <td><img src="${URL_API}${dato.path}" width="80px" hight="80px"></td>
                                        <td><button type="button" class="btn btn-info" id="" 
                                                data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                                <span class="bi bi-pencil"></span>
                                            </button>
                                            <button type="button" class="btn btn-danger" id="" 
                                                data-codigo='${dato.codigo}' name="btnEliminar">
                                                <span class="bi bi-x-circle"></span>
                                            </button>
                                        </td></tr>`;
                        }  
                    }
        tabla += `</table>`;

        div.innerHTML = tabla;

        document.getElementsByName("btnModificar").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let obj : any = boton.getAttribute("data-obj");
                let obj_dato = JSON.parse(obj);

                (<HTMLInputElement>document.getElementById("codigo")).value = obj_dato.codigo;
                (<HTMLInputElement>document.getElementById("marca")).value = obj_dato.marca;
                (<HTMLInputElement>document.getElementById("precio")).value = obj_dato.precio;   
                (<HTMLImageElement>document.getElementById("img_foto")).src = URL_API + obj_dato.path;
                (<HTMLDivElement>document.getElementById("div_foto")).style.display = "block";

                (<HTMLInputElement>document.getElementById("codigo")).readOnly = true;

                let btn = (<HTMLInputElement>document.getElementById("btnForm"));
                btn.value = "Modificar";

                btn.removeEventListener("click", ():void=>{
                    AgregarProducto();
                });

                btn.addEventListener("click", ():void=>{
                    ModificarProducto();
                });
            });
        });

        document.getElementsByName("btnEliminar").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let codigo : any = boton.getAttribute("data-codigo");

                if(confirm(`¿Seguro de eliminar producto con código ${codigo}?`)){
                   
                    let headers = [{"key": "content-type", "value": "application/json"}];
                    let data = `{"codigo": ${codigo}}`;
                
                    AJAX.Post(URL_API + "productos_bd/eliminar", 
                                DeleteSuccess, 
                                data, 
                                Fail,
                                headers);

                }                
            });
        });

    }

    function DeleteSuccess(retorno:string):void {

        console.log("Eliminar", retorno);

        MostrarListado();
    }

    function Fail(retorno:string):void {

        console.error(retorno);
        alert("Ha ocurrido un ERROR!!!");
    }

    function LimpiarForm(){

        (<HTMLImageElement>document.getElementById("img_foto")).src = "";
        (<HTMLDivElement>document.getElementById("div_foto")).style.display = "none";

        (<HTMLInputElement>document.getElementById("codigo")).readOnly = false;

        (<HTMLInputElement>document.getElementById("codigo")).value = "";
        (<HTMLInputElement>document.getElementById("marca")).value = "";
        (<HTMLInputElement>document.getElementById("precio")).value = "";  
        (<HTMLInputElement>document.getElementById("foto")).value = ""; 
    }
}