import Ficha from "./Ficha";

class Peon extends Ficha {
  constructor(color, x = undefined, y = undefined) {
    super(color, `/fichas/${color}/peon.png`, x, y);
    this.mover = this.mover.bind(this);
    this.primeraJugada = true;
    this.casillaDoble = false; // quedara registro si el peon avanzo dos casillas en su ultimo movimiento
  }

  movimientosPosibles({ casillas, historial }) {
    const movimientos = [];

    movimientos.push(...this.movimientoNormal(casillas));
    movimientos.push(...this.capturaDiagonal(casillas));
    movimientos.push(...this.capturaAlPaso(casillas, historial));
    movimientos.push(...this.movimientoDosCasillas(casillas));

    return movimientos;
  }

  movimientoNormal(casillas) {
    const movimientos = [];
    const direccion = this.color === "blanco" ? 1 : -1;

    if (
      casillas[this.x + direccion] &&
      casillas[this.x + direccion][this.y] === null
    ) {
      movimientos.push([this.x + direccion, this.y]);
    }

    return movimientos;
  }

  movimientoDosCasillas(casillas) {
    const movimientos = [];
    const direccion = this.color === "blanco" ? 1 : -1;

    if (
      this.primeraJugada &&
      casillas[this.x + 2 * direccion] &&
      casillas[this.x + 2 * direccion][this.y] === null &&
      casillas[this.x + direccion][this.y] === null
    ) {
      movimientos.push([this.x + 2 * direccion, this.y]);
    }

    return movimientos;
  }

  capturaDiagonal(casillas) {
    const movimientos = [];
    const direccion = this.color === "blanco" ? 1 : -1;

    if (
      casillas[this.x + direccion] &&
      casillas[this.x + direccion][this.y - 1] &&
      casillas[this.x + direccion][this.y - 1].color !== this.color
    ) {
      movimientos.push([this.x + direccion, this.y - 1]);
    }
    if (
      casillas[this.x + direccion] &&
      casillas[this.x + direccion][this.y + 1] &&
      casillas[this.x + direccion][this.y + 1].color !== this.color
    ) {
      movimientos.push([this.x + direccion, this.y + 1]);
    }

    return movimientos;
  }

  capturaAlPaso(casillas, historial) {
    const movimientos = [];
    const direccion = this.color === "blanco" ? 1 : -1;
    const ultimoMovimiento = historial[historial.length - 1];

    if (
      ultimoMovimiento != null &&
      (ultimoMovimiento?.ficha == casillas[this.x][this.y - 1] ||
        ultimoMovimiento?.ficha == casillas[this.x][this.y + 1])
    ) {
      if (
        ultimoMovimiento?.ficha.historial.length === 1 &&
        ultimoMovimiento?.ficha.casillaDoble &&
        ultimoMovimiento?.ficha.color !== this.color &&
        ultimoMovimiento?.ficha instanceof Peon
      ) {
        if (casillas[this.x][this.y - 1]) {
          movimientos.push([this.x + direccion, this.y - 1]);
        }
        if (casillas[this.x][this.y + 1]) {
          movimientos.push([this.x + direccion, this.y + 1]);
        }
      }
    }
    return movimientos;
  }

  mover(newX, newY, tablero) {
    this.primeraJugada = false;
    if (
      this.movimientoNormal(tablero.casillas)
        .concat(this.capturaDiagonal(tablero.casillas))
        .some(([x, y]) => x === newX && y === newY)
    ) {
      return super.mover(newX, newY, tablero);
    } else if (
      this.movimientoDosCasillas(tablero.casillas).some(
        ([x, y]) => x === newX && y === newY
      )
    ) {
      this.casillaDoble = true;
      return super.mover(newX, newY, tablero);
    } else if (
      this.capturaAlPaso(tablero.casillas, tablero.historial).some(
        ([x, y]) => x === newX && y === newY
      )
    ) {
      tablero.historial[tablero.historial.length - 1].ficha.morir();

      return super.mover(newX, newY, tablero);
    }
    this.primeraJugada = true;
    this.casillaDoble = false;
    return false;
  }
}

export default Peon;
