"use strict";
/*
Clase Persona
Atributos (todos privados)
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (abstracto). Retorna un string.
 ToString. Retorna un string mostrando todos los datos de la persona, separados por un
guión medio (-).
 getters para cada uno de los atributos.*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
class Persona {
    get _Nombre() {
        return this._nombre;
    }
    get _Apellido() {
        return this._apellido;
    }
    get _Dni() {
        return this._dni;
    }
    get _Sexo() {
        return this._sexo;
    }
    constructor(nombre, apellido, dni, sexo) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._sexo = sexo;
    }
    ToString() {
        return this._Nombre + " - " + this._Apellido + " - " + this._Dni + " - " + this._Sexo;
    }
}
exports.Persona = Persona;
//# sourceMappingURL=persona.js.map