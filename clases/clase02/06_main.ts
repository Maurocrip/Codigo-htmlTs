import {Auto} from "./01_clases"; //IMPORTO AUTO

let a1 = new Auto("ROJO",120500);

console.log(a1.color);
console.log(a1.Precio);

//METODOS GETTERS Y SETTERS
a1.SetColor("AZUL");
console.log(a1.GetColor());

//ACCESORES GET Y SET
a1.Precio = 666;
console.log(a1.Precio);


Auto.MetodoEstatico();
console.log("fin...!!");