import Peon from "./Peon";

class Tablero {
  constructor() {
    this.fichas = [];
    this.casillas = this.crearTablero();
    this.moverFicha = this.moverFicha.bind(this);
    this.historial = [];
  }

  crearTablero() {
    this.inicializarFichas();
    const tablero = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    console.log(this.fichas);
    for (let fichaItem of this.fichas) {
      if (!tablero[fichaItem.x]) {
        tablero[fichaItem.x] = [];
      }
      tablero[fichaItem.x][fichaItem.y] = fichaItem;
    }
    return tablero;
  }

  inicializarFichas() {
    // Inicializar las piezas en sus posiciones iniciales
    this.fichas.push(new Peon("blanco", 3, 0));
    this.fichas.push(new Peon("blanco", 4, 1));
    this.fichas.push(new Peon("blanco", 3, 2));

    this.fichas.push(new Peon("blanco", 3, 4));
    this.fichas.push(new Peon("blanco", 3, 5));
    this.fichas.push(new Peon("blanco", 3, 6));

    this.fichas.push(new Peon("negro", 6, 0));
    this.fichas.push(new Peon("negro", 6, 1));
    this.fichas.push(new Peon("negro", 6, 2));

    this.fichas.push(new Peon("negro", 6, 4));
    this.fichas.push(new Peon("negro", 5, 5));
    this.fichas.push(new Peon("negro", 6, 6));
  }

  moverFicha(x, y, ficha) {
    this.casillas[ficha.x][ficha.y] = null;
    if (!ficha.mover(x, y, this)) {
      this.casillas[ficha.x][ficha.y] = ficha;
      return false;
    }
    this.casillas[x][y] = ficha;
    this.fichas = this.fichas.map((f) => (f === ficha ? ficha : f));
    this.historial.push({ x, y, ficha });
    return true;
  }
}

export default Tablero;
