"use strict";
/*Clase Empleado

Atributos (todos protegidos)
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (polimorfismo). Retorna un string con el formato “El empleado habla Español”,
siendo Español, el valor recibido por parámetro.
 ToString (polimorfismo). Retorna un string mostrando todos los datos del empleado,
separados por un guión medio (-).
 getters para cada uno de los atributos.*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const persona_1 = require("./persona");
class Empleado extends persona_1.Persona {
    get _Legajo() {
        return this._legajo;
    }
    get _Sueldo() {
        return this._sueldo;
    }
    constructor(nombre, apellido, dni, sexo, legajo, sueldo) {
        super(nombre, apellido, dni, sexo);
        this._legajo = legajo;
        this._sueldo = sueldo;
    }
    Hablar(idioma) {
        return "El empleado habla " + idioma;
    }
    ToString() {
        return super.ToString() + " - " + this._Legajo + " - " + this._Sueldo + " - " + this.Hablar("español");
    }
}
exports.Empleado = Empleado;
//# sourceMappingURL=empleado.js.map