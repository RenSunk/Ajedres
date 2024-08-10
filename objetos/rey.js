const SRC_REY_BLANCO = "ReyBlanco.png";
const SRC_REY_NEGRO = "ReyNegro.png";

export class Rey {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;
    this.x = x;
    this.y = y;
    this.vivo = true;
    this.imagen = blanco ? SRC_REY_BLANCO : SRC_REY_NEGRO;

    this.mover = this.mover.bind(this);
  }

  mover(x, y, fichaAntigua, tablero) {
    if (this.vivo) {
      if (
        this.movimientoPermitidos(tablero).find(
          (movimiento) => movimiento.x === x && movimiento.y === y
        )
      ) {
        return this.aplicarMovimiento(x, y, fichaAntigua);
      }
    }
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

  movimientoPermitidos(tablero) {
    let movimientosPermitidos = [];

    movimientosPermitidos.push({
      x: this.x + 1,
      y: this.y,
    });
    if (this.x + 1 < tablero.length) {
      if (tablero[this.x + 1][this.y]) {
        if (tablero[this.x + 1][this.y].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    movimientosPermitidos.push({
      x: this.x - 1,
      y: this.y,
    });
    if (this.x - 1 >= 0) {
      if (tablero[this.x - 1][this.y]) {
        if (tablero[this.x - 1][this.y].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    movimientosPermitidos.push({
      x: this.x,
      y: this.y + 1,
    });
    if (this.y + 1 < tablero.length) {
      if (tablero[this.x][this.y + 1]) {
        if (tablero[this.x][this.y + 1].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    movimientosPermitidos.push({
      x: this.x,
      y: this.y - 1,
    });
    if (this.y - 1 >= 0) {
      if (tablero[this.x][this.y - 1]) {
        if (tablero[this.x][this.y - 1].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }
    movimientosPermitidos.push({
      x: this.x + 1,
      y: this.y + 1,
    });

    if (this.x + 1 < tablero.length && this.y + 1 < tablero.length) {
      if (tablero[this.x + 1][this.y + 1]) {
        if (tablero[this.x + 1][this.y + 1].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    movimientosPermitidos.push({
      x: this.x - 1,
      y: this.y - 1,
    });
    if (this.x - 1 >= 0 && this.y - 1 >= 0) {
      if (tablero[this.x - 1][this.y - 1]) {
        if (tablero[this.x - 1][this.y - 1].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    movimientosPermitidos.push({
      x: this.x + 1,
      y: this.y - 1,
    });
    if (this.x + 1 < tablero.length && this.y - 1 >= 0) {
      if (tablero[this.x + 1][this.y - 1]) {
        if (tablero[this.x + 1][this.y - 1].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    movimientosPermitidos.push({
      x: this.x - 1,
      y: this.y + 1,
    });
    if (this.x - 1 >= 0 && this.y + 1 < tablero.length) {
      if (tablero[this.x - 1][this.y + 1]) {
        if (tablero[this.x - 1][this.y + 1].blanco == this.blanco) {
          movimientosPermitidos.pop();
        }
      }
    }

    return movimientosPermitidos;
  }
}
