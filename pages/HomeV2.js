import { useEffect, useState } from "react";
import { Peon } from "../objetos/peon";
import { Caballo } from "../objetos/caballo";
import { Torre } from "../objetos/torre";
import { Arfil } from "../objetos/arfil";
import { Reina } from "../objetos/reina";
import { Rey } from "../objetos/rey";
import { PanelFichas } from "../componentes/panelFichas";

const inicializarPiezas = (Pieza, posiciones, esBlanco) =>
  posiciones.map(([x, y]) => new Pieza(x, y, esBlanco));

const inicializarTablero = () => Array(8).fill(Array(8).fill(0));

export default function HomeV2() {
  const [celdas, setCeldas] = useState(inicializarTablero());
  const [celdaSeleccionada, setCeldaSeleccionada] = useState(null);
  const [nuevaCeldaSeleccionada, setNuevaCeldaSeleccionada] = useState({});
  const [movimientosPermitidos, setMovimientosPermitidos] = useState([]);

  const [piezas, setPiezas] = useState({});

  const [turnoBlanco, setTurnoBlanco] = useState(true);

  const [movimientoIA, setMovimientoIA] = useState({});

  useEffect(() => {
    const piezas = {
        caballosBlancos: inicializarPiezas(
            Caballo,
            [
              [0, 1],
              [0, 6],
            ],
            true
          ),
          caballosNegros: inicializarPiezas(
            Caballo,
            [
              [7, 1],
              [7, 6],
            ],
            false
          ),
    };
    setPiezas(piezas);
  }, []);

  useEffect(reAjustarCeldas, [piezas]);
  /*
  useEffect(() => {
    if (!turnoBlanco) {
      IARamdom();
    }
  }, [turnoBlanco]);

  useEffect(() => {
    if (movimientoIA.x !== undefined) {
      //console.log(movimientoIA, celdaSeleccionada);
      moverFicha(
        celdas[movimientoIA.x][movimientoIA.y],
        movimientoIA.x,
        movimientoIA.y
      );
    }
  }, [movimientoIA]);
*/
  function reAjustarCeldas() {
    setCeldas((item) =>
      item.map((_, x) =>
        item.map(
          (_, y) =>
            Object.values(piezas)
              .flat()
              .find((p) => p.x === x && p.y === y) || 0
        )
      )
    );
  }

  function moverFicha(fila, x, y) {
    if (celdaSeleccionada) {
      if (celdaSeleccionada.mover(x, y, celdas[x][y], celdas)) {
        reAjustarCeldas();
        setTurnoBlanco(!turnoBlanco);
      } else {
        console.log("Movimiento no permitido");
      }

      setCeldaSeleccionada(null);
      setNuevaCeldaSeleccionada({});
      setMovimientosPermitidos([]);
    } else if (fila?.vivo) {
      if (turnoBlanco !== fila?.blanco) {
        console.log("No es tu turno");
        return;
      }
      setCeldaSeleccionada(fila);
      setMovimientosPermitidos(fila.movimientoPermitidos(celdas));
    }
  }

  const configurarColor = (fila, numeroColumna, numeroFila) => {
    if (celdaSeleccionada && celdaSeleccionada === fila) {
      return "#3dec5d ";
    }
    
    if (celdaSeleccionada) {
      if (
        movimientosPermitidos.find(
          (movimiento) =>
            movimiento.x === numeroColumna && movimiento.y === numeroFila
        )
      ) {
        if (celdas[numeroColumna][numeroFila]) {
          return "#e74343 ";
        }
        return "u";
      }
    }
      
    if (numeroFila % 2 === numeroColumna % 2) {
      return "gray";
    }

    return "";
  };

  const IARamdom = () => {
    let movimientos = [];
    let pieza = null;
    let pasa = false;
    let movimiento;

    do {
      const piezasVivas = Object.values(piezas)
        .flat()
        .filter((p) => p.vivo && !p.blanco);

      pieza = piezasVivas[Math.floor(Math.random() * piezasVivas.length)];
      movimientos = pieza.movimientoPermitidos(celdas);
      console.log(pieza);
    } while (movimientos.length <= 0);

    movimiento = movimientos[Math.floor(Math.random() * movimientos.length)];

    setMovimientoIA(movimiento);
    moverFicha(pieza, pieza.y, pieza.x);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Tablero de Ajedrez</h1>
      <h3 style={{ textAlign: "center" }}>Versión Alfa 1.05</h3>
      Turno : {turnoBlanco ? "Blanco" : "Negro"}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{ borderCollapse: "collapse", border: "1px solid black" }}
        >
          <tbody>
            {celdas.map((fila, x) => (
              <tr key={x}>
                {fila.map((celda, y) => (
                  <td
                    key={x + y}
                    style={{
                      width: 70,
                      height: 70,
                      background: configurarColor(celda, x, y),
                    }}
                    onClick={() => moverFicha(celda, x, y)}
                  >
                    {celda?.vivo ? (
                      <Image width={50} height={50} src={celda.imagen} alt="Pieza" draggable />
                    ) : (
                      movimientosPermitidos?.length > 0 &&
                      movimientosPermitidos?.map(
                        (celda) =>
                          celda.x === x &&
                          celda.y === y && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                key={x + y}
                                style={{
                                  width: "15%",
                                  padding: "8% 0px",
                                  background: "#bcb8b8",
                                  borderRadius: "100%",
                                }}
                              />
                            </div>
                          )
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginLeft: "20px", width: "30%" }}>
          <PanelFichas {...piezas} />
        </div>
      </div>
    </div>
  );
}
