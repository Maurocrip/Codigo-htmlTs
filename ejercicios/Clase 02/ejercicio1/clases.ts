/*La clase Punto ha de tener dos atributos privados con acceso de sólo lectura (sólo con getters),
que serán las coordenadas del punto. Su constructor recibirá las coordenadas del punto.
La clase Rectangulo tiene los atributos privados de tipo Punto _vertice1, _vertice2, _vertice3 y
_vertice4 (que corresponden a los cuatro vértices del rectángulo).
La base de todos los rectángulos de esta clase será siempre horizontal. Por lo tanto, debe tener un
constructor para construir el rectángulo por medio de los vértices 1 y 3.
Los atributos _ladoUno, _ladoDos, _area y _perimetro se deberán inicializar una vez construido el
rectángulo.
Desarrollar una aplicación que muestre, a través de su método ToString, todos los datos del
rectángulo por consola y en la página.*/

export class Punto
{
    private _x : number;
    private _y : number;

    public get _X() : number
    {
        return this._x;
    }

    public get _Y() : number
    {
        return this._y;
    }

    public constructor(x : number, y : number)
    {           
        this._x = x;
        this._y = y;
    }
}

export class Rectangulo
{
    private  _vertice1 : Punto;
    private  _vertice2 : Punto;
    private  _vertice3 : Punto;
    private  _vertice4 : Punto;
    private  _area : number;
    private  _perimetro : number;
    private  _ladoUno : number;
    private  _ladoDos : number;

    public constructor(v1 : Punto, v3 : Punto)
    {
        this._vertice1 =v1;
        this._vertice3 =v3;
        this._vertice2 = new Punto(this._vertice1._X, this._vertice3._Y);
        this._vertice4 = new Punto(this._vertice3._X, this._vertice1._Y);

        this._ladoUno = this._vertice3._Y - this._vertice1._Y;
        if(this._ladoUno <0)
        {
            this._ladoUno *= -1; 
        }
        this._ladoDos = this._vertice3._X - this._vertice1._X;
        if(this._ladoDos <0)
        {
            this._ladoDos *= -1; 
        }
        
        this._area = this._ladoUno * this._ladoDos;
        this._perimetro = (this._ladoDos *2) + (this._ladoUno *2);
    }

    public get  _Area() : number
    {
        return this._area;
    }

    public get  _Perimetro() : number
    {
        return this._perimetro;
    }

    public ToString():string
    {
        return "Vertice 1: (" + this._vertice1._X + "," + this._vertice1._Y + ")\nVertice 2: (" + this._vertice2._X + "," + this._vertice2._Y + ")\nVertice 3: (" + this._vertice3._X + "," + this._vertice3._Y + ")\nVertice 4: (" + this._vertice4._X + "," + this._vertice4._Y + ")\nLado 1: " + this._ladoUno + "cm\nLado 2: " + this._ladoDos + "cm\nArea: " + this._Area + "cm\nPerimetro: " + this._perimetro + "cm\n";
    }
}

let punto1 : Punto = new Punto(1,5);
let punto2 : Punto = new Punto(3,1);
let rectangulo : Rectangulo = new Rectangulo(punto1,punto2);

console.log(rectangulo.ToString());