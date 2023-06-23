/*Realizar una función que reciba como parámetro un número y que retorne el cubo del
mismo.
Nota: La función retornará el cubo del parámetro ingresado. Realizar una función que
invoque a esta última y permita mostrar por consola el resultado.*/

function mostrar() : void
{
    console.log(cubo(3));
}

function cubo(numero : number) : number
{
    return Math.pow(numero,3);
}

mostrar();