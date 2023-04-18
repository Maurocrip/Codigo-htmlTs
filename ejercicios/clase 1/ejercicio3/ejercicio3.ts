/*Realizar una función que reciba un parámetro requerido de tipo numérico y otro opcional
de tipo cadena. Si el segundo parámetro es recibido, se mostrará tantas veces por
consola, como lo indique el primer parámetro. En caso de no recibir el segundo
parámetro, se mostrará el valor inverso del primer parámetro.*/ 

function mosrarParametro (numero : number, palabra? : string):void
{
    if(palabra)
    {
        for(let i : number =0; i<numero; i++)
        {
            console.log(palabra + "\n");
        }
    }
    else
    {
        console.log(numero*-1);

    }
}

mosrarParametro(4);
mosrarParametro(3,"pepito");