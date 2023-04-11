/*Definir una función que muestre información sobre una cadena de texto que se le pasa
como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena
está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.*/

function siEsMayusculaOMinuscula(palabra : string) : string
{
    let retorno : string = "";
    //let palabraMayuscula : string = palabra.toUpperCase();
    if(palabra === palabra.toUpperCase())
    {
        retorno = "Esta palabra es toda mayuscula";
    }
    else if (palabra === palabra.toLowerCase())
    {
        retorno = "Esta palabra es toda minuscula";
    }
    else
    {
        retorno = "Esta palabra tiene mayuscula y minuscula";
    }
    return retorno;
}

console.log(siEsMayusculaOMinuscula("MAYAasddasdCULA"));