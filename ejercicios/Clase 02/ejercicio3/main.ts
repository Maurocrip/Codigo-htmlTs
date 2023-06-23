/*
Testear la jerarquía de clases
Para probar el buen funcionamiento de la jerarquía anteriormente descrita, en la consola integrada,
se deberá instanciar y probar todos los métodos.
Nota: Recordar incluir las referencias a los archivos a ser utilizados desde el main.ts.

Creación de formulario de entrada de datos
Teniendo en cuenta el diagrama de clases anteriormente descrito, se pide generar una página Web
que posea un formulario de ingreso para los datos correspondientes a un empleado.*/

import { Empleado } from "./empleado";
import { Fabrica } from "./fabrica";  //se puede imprtar en js?

let fabrica : Fabrica = new Fabrica("porno");
function Creación()
{
    let trabajador : Empleado = new Empleado((<HTMLInputElement> document.getElementById("txtNombre")).value,(<HTMLInputElement> document.getElementById("txtApellido")).value,parseInt((<HTMLInputElement> document.getElementById("txtDni")).value),(<HTMLInputElement> document.getElementById("txtSexo")).value,parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).value),parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).value));  
    console.log(fabrica.AgregarEmpleados(trabajador));
    alert(fabrica.ToString());
}
