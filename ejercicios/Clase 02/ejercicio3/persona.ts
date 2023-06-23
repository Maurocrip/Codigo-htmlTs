/*
Clase Persona
Atributos (todos privados)
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (abstracto). Retorna un string.
 ToString. Retorna un string mostrando todos los datos de la persona, separados por un
guión medio (-).
 getters para cada uno de los atributos.*/

export abstract class Persona
{
    private _nombre : string;
    private  _dni: number;
    private _apellido : string;
    private _sexo : string;


    public get _Nombre() : string
    {
        return this._nombre;
    }

    public get _Apellido() : string
    {
        return this._apellido;
    }

    public get _Dni() : number
    {
        return this._dni;
    }

    public get _Sexo() : string
    {
        return this._sexo;
    }

    public constructor(nombre : string, apellido : string, dni : number, sexo : string)
    {           
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._sexo = sexo;
    }

    public abstract  Hablar(idioma:string):string;

    public ToString():string
    {
        return  this._Nombre + " - " + this._Apellido + " - " + this._Dni + " - " + this._Sexo;
    }
}