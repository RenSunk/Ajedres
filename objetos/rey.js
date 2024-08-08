const SRC_REY_BLANCO = "ReyBlanco.png";
const SRC_REY_NEGRO = "ReyNegro.png"

export class Rey{
    constructor(x, y, blanco = true){
        this.blanco = blanco;
        this.x = x;
        this.y = y;
        this.vivo = true;
        this.imagen = blanco ? SRC_REY_BLANCO : SRC_REY_NEGRO

        this.mover = this.mover.bind(this);
    }

    mover(x, y, fichaAntigua, tablero){
        if (this.vivo) {
            if (this.movimientoPermitidos(tablero).find((movimiento) => movimiento.x === x && movimiento.y === y)){
                return this.aplicarMovimiento(x, y, fichaAntigua);
            }
        }
    }

    aplicarMovimiento(x, y, fichaAntigua){
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

    movimientoPermitidos(tablero){

    }
}