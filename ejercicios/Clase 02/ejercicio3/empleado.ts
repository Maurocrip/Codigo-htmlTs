/*Clase Empleado

Atributos (todos protegidos)
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (polimorfismo). Retorna un string con el formato “El empleado habla Español”,
siendo Español, el valor recibido por parámetro.
 ToString (polimorfismo). Retorna un string mostrando todos los datos del empleado,
separados por un guión medio (-).
 getters para cada uno de los atributos.*/

import { Persona } from "./persona";

export  class Empleado extends Persona
{
    protected _legajo : number;
    protected _sueldo : number;

    public get _Legajo() : number
    {
        return this._legajo;
    }

    public get _Sueldo() : number
    {
        return this._sueldo;
    }

    public constructor(nombre : string, apellido : string, dni : number, sexo : string, legajo : number, sueldo : number)
    {        
        super(nombre,apellido,dni,sexo);   
        this._legajo =legajo;
        this._sueldo =sueldo;
    }

    public Hablar(idioma:string):string
    {
        return "El empleado habla " + idioma;  
    }

    public ToString():string
    {
        return  super.ToString() + " - " + this._Legajo + " - " + this._Sueldo +" - " + this.Hablar("español");
    }
}