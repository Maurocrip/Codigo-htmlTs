"use strict";
//LAS SIGUIENTES FUNCIONES SON EQUIVALENTES. 
let f1 = function (i) { return i * i; };
console.log(f1(2));
//EL TIPO DE RETORNO ES INFERIDO POR EL COMPILADOR
let f2 = function (i) { return i * i; };
console.log(f2(2));
//SINTAXIS DE "Fat arrow"
let f3 = (i) => { return i * i; };
console.log(f3(2));
//SINTAXIS DE "Fat arrow" CON TIPO DE RETORNO INFERIDO
let f4 = (i) => { return i * i; };
console.log(f4(2));
//SINTAXIS DE "Fat arrow" CON TIPO DE RETORNO INFERIDO,
//SI NO TIENE LLAVES({}) NO NECESITA 'RETURN'
let f5 = (i) => i * i;
console.log(f5(2));
//# sourceMappingURL=04_fatArrow.js.map