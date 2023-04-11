/*Realizar una función que solicite (por medio de un parámetro) un número. Si el número
es positivo, se mostrará el factorial de ese número, caso contrario se mostrará el cubo de
dicho número.
Nota: Reutilizar la función que determina el factorial de un número y la que calcula el
cubo de un número.*/
(() => {
function cubo(numero : number) : number
{
    return Math.pow(numero,3);
}
function numerosPositivoONegativo(numero : number) : void
{
    if(numero >=0)
    {
        (factorial(numero));
    }  
    else
    {
        console.log((cubo(numero)));
    }      
}

function factorial(numero : number) : void
{
    let comodin :number = 0;
    console.log('el numero es '+numero);
    for(let i : number =1; i<numero+1; i++)
    {
        comodin += i;
        console.log(comodin);
    }
}

numerosPositivoONegativo(-8);
})();