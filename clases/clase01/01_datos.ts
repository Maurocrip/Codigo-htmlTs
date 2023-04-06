//EJEMPLOS DE TIPOS DE DATOS
var esVerdad : boolean =  true;
//esVerdad = 0;
//esVerdad = "false";

var entero : number = 1;
var decimal : number = 10.59;
var hexa : number = 0xFF55AA;
var binario : number = 0b1001001;
var octal : number = 0o7125;

//var obj : object | null = null; // ERROR SI ES ESTRICTO

var indefinido : number;
//console.log(indefinido); //ERROR SI ES ESTRICTO

var cosa : any = "algo";
cosa = 10;
cosa = true;

var cadena : string = "hola";
console.log(cadena);
var otraCadena : string = 'mundo';
console.log(otraCadena);
var masCadenas : string = `con tilde invertido`;
console.log(masCadenas);

var template : string = `concatenando: ${cadena} ${otraCadena}. Valor: ${hexa}.`;
console.log(template);

/*! CON ESTE FORMATO SE VERAN LOS COMENTARIOS EN .JS*/