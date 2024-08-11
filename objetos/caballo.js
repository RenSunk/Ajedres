const SRC_CABALLO_BLANCO = "CaballoBlanco.png";
const SRC_CABALLO_NEGRO = "CaballoNegro.png"



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
        if(this.x + 2 < tablero.length && this.x + 2 >= 0){
          if(this.y+1 < tablero.length && this.y + 1 >= 0){
            if(!tablero[this.x + 2][this.y+1]){
              movimientosPermitidos.push({
                x: this.x+2,
                y: this.y+1,
              });
            }else if(tablero[this.x + 2][this.y+1] && this.blanco != tablero[this.x + 2][this.y+1].blanco) {
              movimientosPermitidos.push({
                x: this.x+2,
                y: this.y+1,
              });
            }
          }
          
          if(this.y-1 < tablero.length && this.y - 1 >= 0){
            if(!tablero[this.x + 2][this.y-1]){
              movimientosPermitidos.push({
                x: this.x+2,
                y: this.y-1,
              });
            }
            else if(tablero[this.x + 2][this.y-1] && this.blanco != tablero[this.x + 2][this.y-1].blanco) {
              movimientosPermitidos.push({
                x: this.x+2,
                y: this.y-1,
              });
            }
          }
        }
        if(this.x - 2 < tablero.length && this.x - 2 >= 0){
          if(this.y+1 < tablero.length && this.y + 1 >= 0){
            if(!tablero[this.x - 2][this.y+1]){
              movimientosPermitidos.push({
                x: this.x-2,
                y: this.y+1,
              });

            }else if(tablero[this.x - 2][this.y+1] && this.blanco != tablero[this.x - 2][this.y+1].blanco){
              movimientosPermitidos.push({
                x: this.x-2,
                y: this.y+1,
              });
            }
          }
          if(this.y-1 < tablero.length && this.y - 1 >= 0){
            if(!tablero[this.x - 2][this.y-1]){
              movimientosPermitidos.push({
                x: this.x-2,
                y: this.y-1,
              });

            }else if(tablero[this.x - 2][this.y-1] && this.blanco != tablero[this.x - 2][this.y-1].blanco){
              movimientosPermitidos.push({
                x: this.x-2,
                y: this.y-1,
              });
            }
          }
        }
        if(this.x + 1 < tablero.length && this.x + 1 >= 0){
          if(this.y+2 < tablero.length && this.y + 2 >= 0){
            if(!tablero[this.x + 1][this.y+2]){
              movimientosPermitidos.push({
                x: this.x+1,
                y: this.y+2,
              });
            }else if(tablero[this.x + 1][this.y+2] && this.blanco!=tablero[this.x +1 ][this.y+2].blanco){
              movimientosPermitidos.push({
                x: this.x+1,
                y: this.y+2,
              });
            }
          }
          if(this.y-2 < tablero[this.x + 1].length && this.y - 2 >= 0){
            if(!tablero[this.x + 1][this.y-2]){
              movimientosPermitidos.push({
                x: this.x+1,
                y: this.y-2,
              });
            }else if(tablero[this.x + 1][this.y-2] && this.blanco != tablero[this.x +1 ][this.y-2].blanco){
              movimientosPermitidos.push({
                x: this.x+1,
                y: this.y-2,
              });
            }
          }
        }
        if(this.x - 1< tablero.length && this.x - 1 >= 0){
          if(this.y+2 < tablero.length && this.y + 2 >= 0){
            if(!tablero[this.x - 1][this.y+2]){
              movimientosPermitidos.push({
                x: this.x-1,
                y: this.y+2,
              });
            }else if(tablero[this.x - 1][this.y+2] && this.blanco != tablero[this.x - 1 ][this.y+2].blanco){
              movimientosPermitidos.push({
                x: this.x-1,
                y: this.y+2,
              });
            }
          }
          if(this.y-2 < tablero.length && this.y - 2 >= 0){
            if(!tablero[this.x - 1][this.y-2]){
              movimientosPermitidos.push({
                x: this.x-1,
                y: this.y-2,
              });
            }else if(tablero[this.x - 1][this.y-2] && this.blanco != tablero[this.x - 1 ][this.y-2].blanco){
              movimientosPermitidos.push({
                x: this.x-1,
                y: this.y-2,
              });
            }
          }
        }  
    console.log(movimientosPermitidos)
    return movimientosPermitidos
    }
}