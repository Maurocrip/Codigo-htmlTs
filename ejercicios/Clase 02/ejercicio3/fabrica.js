"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fabrica = void 0;
class Fabrica {
    constructor(raznSocial) {
        this._razonSocial = raznSocial;
        this._empleados = new Array();
    }
    AgregarEmpleados(empleado) {
        let retorno = false;
        if (empleado != null) {
            if (this._empleados.indexOf(empleado) == -1) {
                this._empleados.push(empleado);
                retorno = true;
            }
        }
        return retorno;
    }
    CalcularSueldos() {
        let retorno = -1;
        if (this._empleados.length > 0) {
            retorno = 0;
            this._empleados.forEach(element => { retorno += element._Sueldo; });
        }
        return retorno;
    }
    EliminarEmpleados(empleado) {
        let retorno = false;
        if (empleado != null) {
            let index = this._empleados.indexOf(empleado);
            if (index !== -1) {
                this._empleados.splice(index, 1);
                retorno = true;
            }
        }
        return retorno;
    }
    ToString() {
        let retorno = "";
        if (this._empleados.length > 0) {
            retorno = "Razon social: " + this._razonSocial + "\n";
            for (let index = 0; index < this._empleados.length; index++) {
                retorno += "Empleado " + (index + 1) + ": " + this._empleados[index].ToString() + "\n";
            }
        }
        return retorno;
    }
}
exports.Fabrica = Fabrica;
//# sourceMappingURL=fabrica.js.map