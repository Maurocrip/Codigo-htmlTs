"use strict";
/*
Testear la jerarquía de clases
Para probar el buen funcionamiento de la jerarquía anteriormente descrita, en la consola integrada,
se deberá instanciar y probar todos los métodos.
Nota: Recordar incluir las referencias a los archivos a ser utilizados desde el main.ts.

Creación de formulario de entrada de datos
Teniendo en cuenta el diagrama de clases anteriormente descrito, se pide generar una página Web
que posea un formulario de ingreso para los datos correspondientes a un empleado.*/
Object.defineProperty(exports, "__esModule", { value: true });
const empleado_1 = require("./empleado");
const fabrica_1 = require("./fabrica");
let fabrica = new fabrica_1.Fabrica("porno");
function Creación() {
    let trabajador = new empleado_1.Empleado(document.getElementById("txtNombre").value, document.getElementById("txtApellido").value, parseInt(document.getElementById("txtDni").value), document.getElementById("txtSexo").value, parseInt(document.getElementById("txtLegajo").value), parseInt(document.getElementById("txtSueldo").value));
    console.log(fabrica.AgregarEmpleados(trabajador));
    alert(fabrica.ToString());
}
//# sourceMappingURL=main.js.map