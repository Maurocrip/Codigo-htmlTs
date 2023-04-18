/*Crear una función que reciba como único parámetro una cadena que contenga el día, mes
y año de nacimiento de una persona (con formato dd-mm-yyyy). La función mostrará por
consola a que signo corresponde dicha fecha de nacimiento.
Nota: Para descomponer la fecha recibida como parámetro utilice la función split.*/

function zodiacco(palabra : String) : String
{
    let retorno : string = "";

    let partesFecha = palabra.split('-');
    let dia = parseInt(partesFecha[0], 10);
    let mes = parseInt(partesFecha[1], 10);

    switch (mes) {
        case 1:
            if(dia < 20)
            {
                retorno = 'Capricornio';
            }
            else
            {
                retorno = 'Acuario';
            }
            break;
        case 2:
            if(dia < 20)
            {
                retorno = 'Acuario';
            }
            else
            {
                retorno = 'Piscis';
            }
            break;
        case 3:  if(dia < 20)
            {
                retorno = 'Piscis';
            }
            else
            {
                retorno = 'Aries';
            }
            break;
        case 4:  if(dia < 20)
            {
                retorno = 'Aries';
            }
            else
            {
                retorno = 'Tauro';
            }
            break;
        case 5:  if(dia < 20)
            {
                retorno = 'Tauro';
            }
            else
            {
                retorno = 'Géminis';
            }
            break;
        case 6:  if(dia < 20)
            {
                retorno = 'Géminis';
            }
            else
            {
                retorno = 'Cáncer';
            }
            break;
        case 7:  if(dia < 20)
            {
                retorno = 'Cáncer';
            }
            else
            {
                retorno = 'Leo';
            }
            break;
        case 8:  if(dia < 20)
            {
                retorno = 'Leo';
            }
            else
            {
                retorno = 'Virgo';
            }
            break;
        case 9:  if(dia < 20)
            {
                retorno = 'Virgo';
            }
            else
            {
                retorno = 'Libra';
            }
            break;
        case 10:  if(dia < 20)
            {
                retorno = 'Libra';
            }
            else
            {
                retorno = 'Escorpio';
            }
            break;
        case 11:  if(dia < 20)
            {
                retorno = 'Escorpio';
            }
            else
            {
                retorno = 'Sagitario';
            }
            break;
        case 12:  if(dia < 20)
            {
                retorno = 'Sagitario';
            }
            else
            {
                retorno = 'Capricornio';
            }
            break;
        default:
            retorno = 'Fecha inválida';
      }
    return retorno;
}

console.log(zodiacco("23-3-2004"));
