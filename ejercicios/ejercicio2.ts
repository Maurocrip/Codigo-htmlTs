/*Cree una aplicación que muestre, a través de un Array, los nombres de los meses de un
año y el número al que ese mes corresponde. Utilizar una estructura repetitiva para
escribir en la consola (console.log()).*/
let meses : string[] = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

for(let i : number =0; i < meses.length; i++)
{
    console.log(meses[i], `=`, i+1);
}