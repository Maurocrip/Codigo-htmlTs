import {Auto} from "./02_herencia"; //IMPORTO AUTO

//FUNCION GENERICA
function Generica<T>(param:T) : T {
    
    console.log("El tipo es: " + typeof(param));

    return param;
}

//PASO EL TIPO DE FORMA EXPLICITA
let retStrring : string = Generica<string>("hola");
console.log(retStrring);

//EL TIPO SE INFIERE
retStrring = Generica("mundo");
console.log(retStrring);

console.log("---------------------------");

let autito = new Auto("ROJO",125000,"FERRARI");

//PASO EL TIPO DE FORMA EXPLICITA
let retAuto : Auto = Generica<Auto>(autito);
console.log(retAuto.Mostrar());

//EL TIPO SE INFIERE
retAuto = Generica(new Auto("AMARILLO",200000,"SEAT"));
console.log(retAuto.Mostrar());

console.log("---------------------------");

//INTERFACE GENERICA
interface IGenerica<T>{

    param : T;

    Metodo() : T;

    OtroMetodo(param : T) : void;
}

//CLASE GENERICA
class ClaseGenerica<T, U> {
    
    public paramUno : T;
    public paramDos : U;

    constructor(uno : T, dos : U) {
        this.paramUno = uno;
        this.paramDos = dos;
    }

    public Mostrar():void {
        console.log(this.paramUno + " - " + this.paramDos);
    }
}

//PASO EL TIPO DE FORMA EXPLICITA
let obj : ClaseGenerica<string, number> = new ClaseGenerica<string, number>("cadena", 10);

//EL TIPO SE INFIERE
let obj2 : ClaseGenerica<boolean, string> = new ClaseGenerica(true, "otra cadena");

obj.Mostrar();
obj2.Mostrar();

console.log("---------------------------");
