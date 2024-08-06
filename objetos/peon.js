import Image from "next/image";

const SRC_PEON_BLANCO = "/PeonBlanco.png";
const SRC_PEON_NEGRO = "/PeonNegro.png";

export class Peon {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;

    this.x = x;
    this.y = y;

    this.imagen = blanco ? SRC_PEON_BLANCO : SRC_PEON_NEGRO;
    this.vivo = true;

    this.mover = this.mover.bind(this);
    this.primermovimiento = true;
  }

  mover(x, y, fichaAntigua) {
    if (this.vivo) {
      if(this.movimientoPermitidos(x, y, fichaAntigua)){
        return this.aplicarMovimiento(x, y, fichaAntigua);
      }
    }
    return false;
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

  movimientoPermitidos(x, y, fichaAntigua){
    if (this.blanco) {
      if (this.x + 2 == x && this.y == y && this.primermovimiento) {
        // movimiento de dos casillas
        return true
      } else if (this.x + 1 == x && this.y == y && !fichaAntigua) {
        // movimiento de una casilla
        return true
      } else if (this.x + 1 == x && this.y - 1 == y && fichaAntigua && !fichaAntigua.blanco) {
        // movimiento a la izquierda
        return true
      } else if (this.x + 1 == x && this.y + 1 == y && fichaAntigua && !fichaAntigua.blanco) {
        // movimiento a la derecha
        return true
      }
    } else {
      if (this.x - 2 == x && this.y == y && this.primermovimiento) {
        // movimiento de dos casillas
        return true
      } else if (this.x - 1 == x && this.y == y && !fichaAntigua) {
        // movimeinto de una casilla
        return true
      } else if (this.x - 1 == x && this.y + 1 == y && fichaAntigua && fichaAntigua.blanco) {
        // comer a la derecha
        return true
      } else if (this.x - 1 == x && this.y - 1 == y && fichaAntigua && fichaAntigua.blanco) {
        // comer a la izquierda
        return true
      }
    }
    return false
  }
}
