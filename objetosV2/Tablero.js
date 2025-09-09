import Arfil from "./Arfil";
import Caballo from "./Caballo";
import Peon from "./Peon";
import Reina from "./Reina";
import Rey from "./Rey";
import Torre from "./Torre";

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
    this.fichas.push(new Peon("blanco", 1, 0));
    this.fichas.push(new Peon("blanco", 1, 1));
    this.fichas.push(new Peon("blanco", 1, 2));
    this.fichas.push(new Peon("blanco", 1, 3));
    this.fichas.push(new Peon("blanco", 1, 4));
    this.fichas.push(new Peon("blanco", 1, 5));
    this.fichas.push(new Peon("blanco", 1, 6));
    this.fichas.push(new Peon("blanco", 1, 7));
    this.fichas.push(new Peon("negro", 6, 0));
    this.fichas.push(new Peon("negro", 6, 1));
    this.fichas.push(new Peon("negro", 6, 2));
    this.fichas.push(new Peon("negro", 6, 3));
    this.fichas.push(new Peon("negro", 6, 4));
    this.fichas.push(new Peon("negro", 6, 5));
    this.fichas.push(new Peon("negro", 6, 6));
    this.fichas.push(new Peon("negro", 6, 7));

    this.fichas.push(new Torre("blanco", 0, 0));
    this.fichas.push(new Torre("blanco", 0, 7));
    this.fichas.push(new Torre("negro", 7, 0));
    this.fichas.push(new Torre("negro", 7, 7));

    this.fichas.push(new Arfil("blanco", 0, 2));
    this.fichas.push(new Arfil("blanco", 0, 5));
    this.fichas.push(new Arfil("negro", 7, 2));
    this.fichas.push(new Arfil("negro", 7, 5));

    this.fichas.push(new Rey("blanco", 0, 4));
    this.fichas.push(new Rey("negro", 7, 4));

    this.fichas.push(new Reina("blanco", 0, 3));
    this.fichas.push(new Reina("negro", 7, 3));

    this.fichas.push(new Caballo("blanco", 0, 1));
    this.fichas.push(new Caballo("blanco", 0, 6));
    this.fichas.push(new Caballo("negro", 7, 1));
    this.fichas.push(new Caballo("negro", 7, 6));
  }

  moverFicha(x, y, ficha) {
    this.casillas[ficha.x][ficha.y] = null;
    if (!ficha?.mover(x, y, this)) {
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
