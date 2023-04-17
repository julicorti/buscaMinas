//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;



function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();
  

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");
  casillerosSinDescubrir = FILAS * COLUMNAS;

  // Modificar/completar
  ponerMinasTablero()
 
  
}


function draw() {
  if (hizoClick == true)
  {
    if(mouseButton == LEFT)
    {
      if(tieneMinaCasillero(columnaPresionada, filaPresionada))
      {
        perder();
        

      }
      else
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada)
      }
    } 
      if(mouseButton == RIGHT)
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
      }
      if(ganoElJuego()){
        ganar();
      }
      
        
    
    
  
 
  hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
  
}


function ganoElJuego()
{
  if(casillerosSinDescubrir == CANTIDAD_MINAS)
  return true;
 
}
function ponerMinasTablero()

{
  
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++){ //Para colocar la cantidad de minas
    x = floor(random(0, 10)); //Poner numero aleatorio en la posicion x
    y = floor(random(0, 10)); //Poner numero aleatorio en la posicion y
    while(tieneMinaCasillero (x, y)){ //Comprueba que no se repita la posicion de la mina
      x = floor(random(0, 10));
      y = floor(random(0, 10)); 
      console.log(x, y)
    }
    
    ponerMinaCasillero(x, y)
    console.log(x, y)
        
    
  }
}

function mostrarMinas()
{
  pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
}

function contarMinasAlrededor(columna, fila)
{
  minasTotal = 0
  for (let y = -1; y <= 1; y++){ //Comprueba si hay una mina arriba o abajo 
    for (let x = -1; x <= 1; x++){ //Comprueba si hay una mina a la derecha o izquierda
      
      if(tieneMinaCasillero(columna + x, fila + y)){//Si hay una mina en un casillero vecino la suma
        minasTotal++
      }
    }
  }
  return minasTotal;

}
