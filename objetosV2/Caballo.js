import Ficha from "./Ficha";

class Caballo extends Ficha {
    constructor(color, x, y) {
        super(color, `/fichas/${color}/caballo.png`, x, y);
    }

    movimientosPosibles({ casillas }) {
        const movimientos = [];
        const posibles = [
            { dx: 2, dy: 1 },
            { dx: 2, dy: -1 },
            { dx: -2, dy: 1 },
            { dx: -2, dy: -1 },
            { dx: 1, dy: 2 },
            { dx: 1, dy: -2 },
            { dx: -1, dy: 2 },
            { dx: -1, dy: -2 },
        ];
        for (let { dx, dy } of posibles) {
            let x = this.x + dx;
            let y = this.y + dy;
            if (x >= 0 && y >= 0 && x < casillas.length && y < casillas.length) {
                if (casillas[x][y] === null || casillas[x][y].color !== this.color) {
                    movimientos.push([x, y]);
                }
            }
        }
        return movimientos;
    }

    mover(newX, newY, tablero) {
        const movimientos = this.movimientosPosibles(tablero);
        if (movimientos.some(([x, y]) => x === newX && y === newY)) {
            super.mover(newX, newY, tablero);
            return true;
        }
        return false;
    }
}
export default Caballo;