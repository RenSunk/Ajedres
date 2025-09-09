export class Ficha {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;
    this.x = x;
    this.y = y;
    this.vivo = true;
    this.imagen = blanco ? SRC_PEON_BLANCO : SRC_PEON_NEGRO;
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
    this.primermovimiento = false;
    return true;
  }

  esMovimientoValido(x, y, tablero) {
    return this.movimientoPermitidos(tablero).some(
      (mov) => mov.x === x && mov.y === y
    );
  }
  
}
