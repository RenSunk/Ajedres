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

  mover(x, y, fichaAntigua, tablero) {
    if (this.vivo) {
      if (this.movimientoPermitidos(tablero).find((movimiento) => movimiento.x === x && movimiento.y === y)){
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

  movimientoPermitidos(tablero){
    let movimientosPermitidos=[]
    if (this.blanco) {
      if (this.primermovimiento && !tablero[this.x + 1][this.y] && !tablero[this.x + 2][this.y]) { 
        // movimiento de dos casillas
        movimientosPermitidos.push({
          x: this.x+2,
          y: this.y,
        });
      }
      if (!tablero[this.x + 1][this.y] ) {
        // movimiento de una casilla
        movimientosPermitidos.push({
          x: this.x+1,
          y: this.y,
        });
      }
      if (tablero[this.x + 1][this.y+1] && !tablero[this.x + 1][this.y+1].blanco) {
        // movimiento a la derecha
        movimientosPermitidos.push({
          x: this.x+1,
          y: this.y+1,
        });
      }
      if (tablero[this.x + 1][this.y-1] && !tablero[this.x + 1][this.y-1].blanco) {
        // movimiento a la izquierda
        movimientosPermitidos.push({
          x: this.x+1,
          y: this.y-1,
        });
      }

    } else {
      if (this.primermovimiento && !tablero[this.x - 1][this.y] && !tablero[this.x - 2][this.y]) { 
        // movimiento de dos casillas
        movimientosPermitidos.push({
          x: this.x-2,
          y: this.y,
        });
      }
      if (!tablero[this.x - 1][this.y] ) {
        // movimiento de una casilla
        movimientosPermitidos.push({
          x: this.x-1,
          y: this.y,
        });
      }
      if (tablero[this.x - 1][this.y+1] && tablero[this.x - 1][this.y+1].blanco) {
        // movimiento a la derecha
        movimientosPermitidos.push({
          x: this.x-1,
          y: this.y+1,
        });
      }
      if (tablero[this.x - 1][this.y-1] && tablero[this.x - 1][this.y-1].blanco) {
        // movimiento a la izquierda
        movimientosPermitidos.push({
          x: this.x-1,
          y: this.y-1,
        });
      }
    }
    console.log(movimientosPermitidos)
    return movimientosPermitidos
  }
}
