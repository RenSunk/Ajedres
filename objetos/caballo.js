const SRC_CABALLO_BLANCO = "CaballoBlanco.png";
const SRC_CABALLO_NEGRO = "CaballoNegro.png";

export class Caballo {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;

    this.x = x;
    this.y = y;

    this.imagen = blanco ? SRC_CABALLO_BLANCO : SRC_CABALLO_NEGRO;
    this.vivo = true;

    this.mover = this.mover.bind(this);
    this.primermovimiento = true;
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
    this.primermovimiento = false;
    return true;
  }

  esMovimientoValido(x, y, tablero) {
    return this.movimientoPermitidos(tablero).some(
      (mov) => mov.x === x && mov.y === y
    );
  }

  movimientoPermitidos(tablero) {
    let movimientosPermitidos = [];
    let direcciones = [
      { dx: 2, dy: 1 },
      { dx: -2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: -2, dy: -1 },
      { dx: 1, dy: 2 },
      { dx: -1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: -2 },
    ];

    for (let { dx, dy } of direcciones) {
      let x = this.x + dx;
      let y = this.y + dy;
      if (x >= 0 && y >= 0 && x < tablero.length && y < tablero.length) {
        if (tablero[x][y]) {
          if (tablero[x][y].blanco !== this.blanco)
            movimientosPermitidos.push({ x, y });
          continue;
        }
        movimientosPermitidos.push({ x, y });
      }
    }
    return movimientosPermitidos;
  }
}
