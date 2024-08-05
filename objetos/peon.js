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
  }

  mover(x, y) {
    if (this.vivo) {
      if (this.blanco) {
        if (this.x + 2 == x && this.y == y) {
          this.x = x;
          this.y = y;
          return true;
        } else if (this.x + 1 == x && this.y == y) {
          this.x = x;
          this.y = y;
          return true;
        }
      } else {
        if (this.x - 2 == x && this.y == y) {
          this.x = x;
          this.y = y;
          return true;
        } else if (this.x - 1 == x && this.y == y) {
          this.x = x;
          this.y = y;
          return true;
        }
      }
    }
    return false;
  }
}
