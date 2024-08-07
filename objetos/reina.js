const SRC_REINA_BLANCO = "ReinaBlanca.png";
const SRC_REINA_NEGRA = "ReinaNegra.png";

export class Reina {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;
    this.x = x;
    this.y = y;
    this.vivo = true;
    this.imagen = blanco ? SRC_REINA_BLANCO : SRC_REINA_NEGRA;

    this.mover = this.mover.bind(this);
  }

  mover(x, y, fichaAntigua, tablero){
    if (this.vivo) {
        if (this.movimientoPermitidos(tablero).find((movimiento) => movimiento.x === x && movimiento.y === y)){
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
    for (let i = this.x + 1; i < tablero.length; i++) {
      movimientosPermitidos.push({
        x: i,
        y: this.y,
      });

      if (tablero[i][this.y]) {
        if (this.blanco == tablero[i][this.y].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }

    for (let i = this.x - 1; i >= 0; i--) {
      movimientosPermitidos.push({
        x: i,
        y: this.y,
      });

      if (tablero[i][this.y]) {
        if (this.blanco == tablero[i][this.y].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }

    for (let i = this.y + 1; i < tablero.length; i++) {
      movimientosPermitidos.push({
        x: this.x,
        y: i,
      });

      if (tablero[this.x][i]) {
        if (this.blanco == tablero[this.x][i].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }

    for (let i = this.y - 1; i >= 0; i--) {
      movimientosPermitidos.push({
        x: this.x,
        y: i,
      });

      if (tablero[this.x][i]) {
        if (this.blanco == tablero[this.x][i].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }
    for (
      let i = this.x + 1, j = this.y + 1;
      i < tablero.length && j < tablero.length;
      i++, j++
    ) {
      movimientosPermitidos.push({
        x: i,
        y: j,
      });
      if (tablero[i][j]) {
        if (this.blanco == tablero[i][j].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }
    for (
      let i = this.x + 1, j = this.y - 1;
      i < tablero.length && j >= 0;
      i++, j--
    ) {
      movimientosPermitidos.push({
        x: i,
        y: j,
      });
      if (tablero[i][j]) {
        if (this.blanco == tablero[i][j].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }
    for (
      let i = this.x - 1, j = this.y + 1;
      i >= 0 && j < tablero.length;
      i--, j++
    ) {
      movimientosPermitidos.push({
        x: i,
        y: j,
      });
      if (tablero[i][j]) {
        if (this.blanco == tablero[i][j].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }
    for (let i = this.x - 1, j = this.y - 1; i >= 0 && j >= 0; i--, j--) {
      movimientosPermitidos.push({
        x: i,
        y: j,
      });
      if (tablero[i][j]) {
        if (this.blanco == tablero[i][j].blanco) {
          movimientosPermitidos.pop();
          break;
        }
        break;
      }
    }
    return movimientosPermitidos;
  }
}
