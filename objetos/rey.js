const SRC_REY_BLANCO = "ReyBlanco.png";
const SRC_REY_NEGRO = "ReyNegro.png";

export class Rey {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;
    this.x = x;
    this.y = y;
    this.vivo = true;
    this.imagen = blanco ? SRC_REY_BLANCO : SRC_REY_NEGRO;
  }

  mover(x, y, fichaAntigua, tablero) {
    if (!this.vivo || !this.esMovimientoValido(x, y, tablero)) return;
    return this.aplicarMovimiento(x, y, fichaAntigua);
  }

  aplicarMovimiento(x, y, fichaAntigua) {
    this.x = x;
    this.y = y;
    if (fichaAntigua && fichaAntigua.blanco !== this.blanco) {
      fichaAntigua.vivo = false;
      fichaAntigua.x = -1;
      fichaAntigua.y = -1;
    }
    return true;
  }

  esMovimientoValido(x, y, tablero) {
    return this.movimientoPermitidos(tablero).some(mov => mov.x === x && mov.y === y);
  }

  movimientoPermitidos(tablero) {
    const direcciones = [
      { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
      { dx: 1, dy: 1 }, { dx: -1, dy: -1 }, { dx: 1, dy: -1 }, { dx: -1, dy: 1 }
    ];

    return direcciones
      .map(({ dx, dy }) => ({ x: this.x + dx, y: this.y + dy }))
      .filter(({ x, y }) => this.esPosicionValida(x, y, tablero));
  }

  esPosicionValida(x, y, tablero) {
    return x >= 0 && y >= 0 && x < tablero.length && y < tablero.length &&
      (!tablero[x][y] || tablero[x][y].blanco !== this.blanco);
  }
}
