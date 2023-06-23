import {Auto} from "./04_claseAbstracta";//IMPORTO AUTO


let miAuto = new Auto("NARANJA", 150, "FIAT");

console.log(miAuto.Mostrar());

miAuto.Acelerar();

miAuto.Marca = "RENAULT";

console.log(miAuto.Marca);