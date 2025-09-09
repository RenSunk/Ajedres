const SRC_TORRE_BLANCO = "/TorreBlanca.png";
const SRC_TORRE_NEGRO = "/TorreNegra.png";

export class Torre {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;

    this.x = x;
    this.y = y;
    this.vivo = true;
    this.imagen = blanco ? SRC_TORRE_BLANCO : SRC_TORRE_NEGRO;

    this.mover = this.mover.bind(this);
  }

  mover(x, y, fichaAntigua, tablero) {
    if (tablero[x][y] === undefined) {
      return;
    }
    if (!this.vivo || !this.esMovimientoValido(x, y, tablero)) return;
    return this.aplicarMovimiento(x, y, fichaAntigua);
  }

  aplicarMovimiento(x, y, fichaAntigua) {
    this.x = x;
    this.y = y;
    if (fichaAntigua) {
      if (fichaAntigua.blanco && !this.blanco) {
        fichaAntigua.vivo = false;
        fichaAntigua.x = -1;
        fichaAntigua.y = -1;
      } else if (!fichaAntigua.blanco && this.blanco) {
        fichaAntigua.vivo = false;
        fichaAntigua.x = -1;
        fichaAntigua.y = -1;
      }
    }
    return true;
  }

  esMovimientoValido(x, y, tablero) {
    return this.movimientoPermitidos(tablero).some(
      (mov) => mov.x === x && mov.y === y
    );
  }

  movimientoPermitidos(tablero) {
    let direcciones = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];
    let movimientosPermitidos = [];
    for (let { dx, dy } of direcciones) {
      let x = this.x + dx;
      let y = this.y + dy;
      while (x >= 0 && y >= 0 && x < tablero.length && y < tablero.length) {
        if (tablero[x][y]) {
          if (tablero[x][y].blanco !== this.blanco)
            movimientosPermitidos.push({ x, y });
          break;
        }
        movimientosPermitidos.push({ x, y });
        x += dx;
        y += dy;
      }
    }
    return movimientosPermitidos;
  }
}
