class Ficha {
  /**
   *
   * @param {string} color
   * @param {string} uri
   * @param {number} x
   * @param {number} y
   */
  constructor(color, uri = "", x = undefined, y = undefined) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vida = true;
    this.uri = uri;
    this.historial = [];
  }

  morir() {
    this.vida = false;
    this.x = 9999;
    this.y = 9999;
  }

  mover(newX, newY, { casillas }) {
    if (casillas[newX][newY] !== null) {
      casillas[newX][newY].morir();
    }

    this.x = newX;
    this.y = newY;
    this.historial.push({ x: newX, y: newY, ficha: this });
    console.log(`La ficha se ha movido a la posición (${newX}, ${newY})`);
    return true;
  }
}

export default Ficha;
