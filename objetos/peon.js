import Image from "next/image";

const SRC_PEON_BLANCO = "/PeonBlanco.png";
const SRC_PEON_NEGRO = "/PeonNegro.png";

export class Peon {
  constructor(x, y, blanco = true) {
    this.blanco = blanco;
    this.x = x;
    this.y = y;
    this.vivo = true;
    this.primermovimiento = true;
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

  movimientoPermitidos(tablero) {
    let movimientosPermitidos = [];
    let dir = this.blanco ? 1 : -1;
    let inicioFila = this.blanco ? 1 : tablero.length - 2;
    if (tablero[this.x + dir]) {
      if (!tablero[this.x + dir][this.y]) {
        movimientosPermitidos.push({ x: this.x + dir, y: this.y });
        if (this.x === inicioFila && !tablero[this.x + 2 * dir][this.y]) {
          movimientosPermitidos.push({ x: this.x + 2 * dir, y: this.y });
        }
      }
    }

    for (let dy of [-1, 1]) {
      if (
        tablero[this.x + dir]?.[this.y + dy] &&
        tablero[this.x + dir][this.y + dy].blanco !== this.blanco
      ) {
        movimientosPermitidos.push({ x: this.x + dir, y: this.y + dy });
      }
    }
    return movimientosPermitidos;
  }
}
