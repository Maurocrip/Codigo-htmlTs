/*Realizar una función que reciba un número y que muestre (por consola) un mensaje
como el siguiente:
El número 5 es impar, siendo 5 el número recibido como parámetro.*/

function parImpar(numero : number) : void
{
    if(numero%2 == 0)
    {
        console.log(`El número ${numero} es par`);        
    }
    else
    {
        console.log(`El número ${numero} es impar`);
    }
}

parImpar(2);
parImpar(3);