import Ficha from "./Ficha";

class Reina extends Ficha {
  constructor(color, x, y) {
    super(color, `/fichas/${color}/reina.png`, x, y);
  }
  movimientosPosibles({ casillas }) {
    const movimientos = [];
    const direcciones = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ];
    for (let { dx, dy } of direcciones) {
      let x = this.x + dx;
      let y = this.y + dy;
      while (x >= 0 && y >= 0 && x < casillas.length && y < casillas.length) {
        if (casillas[x][y] === null) {
          movimientos.push([x, y]);
        } else {
          if (casillas[x][y].color !== this.color) {
            movimientos.push([x, y]);
          }
          break;
        }
        x += dx;
        y += dy;
      }
    }
    return movimientos;
  }
  mover(newX, newY, tablero) {
    const movimientos = this.movimientosPosibles(tablero);
    if (movimientos.some(([x, y]) => x === newX && y === newY)) {
      super.mover(newX, newY, tablero);
      return true;
    }
    return false;
  }
}

export default Reina;
