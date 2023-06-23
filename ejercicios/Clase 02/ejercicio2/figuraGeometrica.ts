/*2.- La clase FiguraGeometrica posee: todos sus atributos protegidos, un constructor con un
parámetro, un método getter para el atributo _color, un método virtual (ToString) y dos métodos
abstractos: Dibujar (público) y CalcularDatos (protegido).
CalcularDatos será invocado en el constructor de la clase derivada que corresponda, su
funcionalidad será la de inicializar los atributos _superficie y _perimetro.
Dibujar, retornará un string (con el color que corresponda) formando la figura geométrica del objeto
que lo invoque (retornar una serie de asteriscos que modele el objeto).

Utilizar el método ToString para obtener toda la información completa del objeto, y luego dibujarlo
por pantalla y mostrarlo por consola.*/


export abstract class FiguraGeometrica
{
    protected _color : string;
    protected _perimetro : number;
    protected _superficie : number;

    public get _Color() : string
    {
        return this._color;
    }

    public constructor(color : string)
    {           
        this._color = color;
    }

    protected abstract CalcularDato():void;
    public abstract Dibujar():string;

    public ToString():string
    {
        return "Color: " + this._Color + "\nPerimetro: " + this._perimetro + "\nSuperficie: " + this._superficie;
    }
}

export class Rectangulo extends FiguraGeometrica
{
    private  _ladoUno : number;
    private  _ladoDos : number;


    public constructor(color : string, lado1 : number, lado2 : number)
    {         
        super(color);  
        this._ladoUno = lado1;
        this._ladoDos = lado2;
        this.CalcularDato();
    }

    protected  CalcularDato():void
    {
        super._superficie = this._ladoUno * this._ladoDos;
        super._perimetro = (this._ladoDos *2) + (this._ladoUno *2);
    }

    public  Dibujar():string
    {
        let forma = "";
        for (let fila = 0; fila < this._ladoUno; fila++) 
        {
            for (let columna = 0; columna < this._ladoDos; columna++) 
            {
                forma +="*";                
            }
            forma +="\n"; 
        }

        return forma;
    }

    public ToString():string
    {
        return "Altura: " + this._ladoUno + "\nAncho: " + this._ladoDos + "\n" + super.ToString();
    }
}

export class Triangulo extends FiguraGeometrica
{
    private  _altura : number;
    private  _base : number;
    
    public constructor(color : string, altura : number, base : number)
    {         
        super(color);  
        this._altura = altura;
        this._base = base;
        this.CalcularDato();
    }

    protected  CalcularDato():void
    {
        super._superficie = (this._altura * this._base)/2;
        super._perimetro = this._base *3;
    }

    public  Dibujar():string
    {
        let resultado: string = "";
        let ancho: number = this._base * 2 - 1;
        let centro: number = Math.floor(ancho / 2);
    
        for (let i = 0; i < this._altura; i++) 
        {
            let fila: string = "";
            for (let j = 0; j < ancho; j++) 
            {
                if (j < centro - i || j > centro + i) 
                {
                    fila += " ";
                } 
                else 
                {
                    fila += "*";
                }
            }
            resultado += fila + "\n";
        }
  
        return resultado;
    }

    public ToString():string
    {
        return "Altura: " + this._altura + "\nBase: " + this._base + "\n" + super.ToString();
    }
}

let rectangulo :Rectangulo = new Rectangulo("rojo", 2,5);
let triangulo :  Triangulo = new Triangulo("verde", 2,5);

console.log(rectangulo.Dibujar());
console.log(rectangulo.ToString());

console.log("\n" +triangulo.Dibujar());
console.log(triangulo.ToString());