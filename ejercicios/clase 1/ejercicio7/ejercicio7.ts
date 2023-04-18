/*Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una
función.
Nota: Utilizar console.log()*/
function numeroPrimos() : void
{
    let numero : number =0;
    let flag : boolean = true;

    for(let i : number =2; numero<20;i++)
    {
        for(let j : number =2; j<i;j++)
        {
            if(i%j == 0)
            {
                flag = false;
                break;
            }
        }

        if(flag)
        {
            console.log(i);
            numero++;
        }
        flag = true;
    }
}

numeroPrimos();