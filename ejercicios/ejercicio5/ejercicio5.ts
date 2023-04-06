/*Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
como parámetro de la función MostrarNombreApellido, que mostrará el apellido en
mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
El apellido y el nombre se mostrarán separados por una coma (,).
Nota: Utilizar console.log()*/

function MostrarNombreApellido(name : string, surname :string) : void
{
   console.log(surname.toUpperCase()+"," + name.toUpperCase());
}

let nombre :string ="mauro";
let apellido :string ="racioppi";

MostrarNombreApellido(nombre,apellido);
