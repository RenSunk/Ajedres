import { useEffect, useState } from "react";
import { Peon } from "../objetos/peon";
import { Torre } from "../objetos/torre";

export default function Home() {
  const [celdas, setCeldas] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [peonesBlancos] = useState([
    new Peon(1, 0, true),
    new Peon(1, 1, true),
    new Peon(1, 2, true),
    new Peon(1, 3, true),
    new Peon(1, 4, true),
    new Peon(1, 5, true),
    new Peon(1, 6, true),
    new Peon(1, 7, true),
  ]);

  const [peonesNegros] = useState([
    new Peon(6, 0, false),
    new Peon(6, 1, false),
    new Peon(5, 2, false),
    new Peon(6, 3, false),
    new Peon(6, 4, false),
    new Peon(6, 5, false),
    new Peon(5, 6, false),
    new Peon(6, 7, false),
  ]);

  const [torresBlancas] = useState([
    new Torre(5, 5, true),
    new Torre(0, 7, true),
  ]);

  const [torresNegras] = useState([
    new Torre(7, 0, false),
    new Torre(7, 7, false),
  ]);

  const [celdaSelecionada, setCeldaSelecionada] = useState();
  const [nuevaCeldaSelecionada, setNuevaCeldaSelecionada] = useState({});

  const [movimientosPermitidos, setMovimientosPermitidos] = useState([]);

  const moverFicha = (fila, numeroFila, numeroColumna) => {
    if (celdaSelecionada) {
      setNuevaCeldaSelecionada({
        x: numeroColumna,
        y: numeroFila,
      });

      if (nuevaCeldaSelecionada) {
        let antiguaPosicionX = celdaSelecionada.x;
        let antiguaPosicionY = celdaSelecionada.y;

        let nuevaPosicionX = numeroColumna;
        let nuevaPosicionY = numeroFila;
        let fichaAntigua;

        if (celdas[nuevaPosicionX][nuevaPosicionY]) {
          fichaAntigua = celdas[nuevaPosicionX][nuevaPosicionY];
        }

        if (
          celdas[antiguaPosicionX][antiguaPosicionY].mover(
            nuevaPosicionX,
            nuevaPosicionY,
            fichaAntigua,
            celdas
          )
        ) {
          reAjustarCeldas();
        } else {
          //alert("Movimiento no permitido");
        }
        setCeldaSelecionada();
        setNuevaCeldaSelecionada({});
      }
    } else if (fila && nuevaCeldaSelecionada.leghth != 0) {
      if (fila.vivo) {
        setCeldaSelecionada(fila);
        setMovimientosPermitidos(
          fila.movimientoPermitidos(celdas)
        );
      }
    }
  };

  useEffect(() => {
    // ajustar el estado de las celdas
    reAjustarCeldas();
  }, []);

  const reAjustarCeldas = () => {
    setCeldas((item) => {
      let items = item.map((columna, numeroColumna) => {
        return columna.map((fila, numeroFila) => {
          // ajuste de las celdas en base a los peones
          let peonBlanco = peonesBlancos.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (peonBlanco) {
            return peonBlanco;
          }

          let peonNegro = peonesNegros.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );
          if (peonNegro) {
            return peonNegro;
          }

          let torreBlanca = torresBlancas.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (torreBlanca) {
            return torreBlanca;
          }

          let torreNegra = torresNegras.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (torreNegra) {
            return torreNegra;
          }
        });
      });
      return items;
    });
  };

  const handleDragStart = (event, fila, numeroFila, numeroColumna) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ fila, numeroFila, numeroColumna })
    );
    if(fila){
      if (fila.vivo) {
        setCeldaSelecionada(fila);
        setMovimientosPermitidos(
          fila.movimientoPermitidos(celdas)
        );
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, numeroFila, numeroColumna) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    moverFicha(
      celdas[data.numeroColumna][data.numeroFila],
      numeroFila,
      numeroColumna
    );
  };

  const configurarColor = (fila, numeroColumna, numeroFila) => {
    
    if (celdaSelecionada && celdaSelecionada === fila) {
      return "green";
    }

    if (celdaSelecionada) {
      if (movimientosPermitidos.find((movimiento) => movimiento.x === numeroColumna && movimiento.y === numeroFila)){
        if(celdas[numeroColumna][numeroFila]){
          return "red";
        }
        return "blue";
      }
    }
    if (numeroFila % 2 === numeroColumna % 2) {
      return "url('casillanegra.png')";
    }

    return "";
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Tablero de Ajedrez</h1>
        <h3> Versión Alfa 1.01 </h3>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <h1>Peones</h1>
          <p>
            Para mover un peón, seleccione el peón que desea mover y luego
            seleccione la casilla a la que desea moverlo.
          </p>

          <h2>Peones Blancos</h2>
          <ul>
            {peonesBlancos.map((peon, index) => {
              return (
                <li key={index} style={{ color: peon.vivo ? "green" : "red" }}>
                  {peon.vivo ? peon.x + "," + peon.y : "MUERTO"}
                </li>
              );
            })}
          </ul>

          <h2>Peones Negros</h2>
          <ul>
            {peonesNegros.map((peon, index) => {
              return (
                <li key={index} style={{ color: peon.vivo ? "green" : "red" }}>
                  {peon.vivo ? peon.x + "," + peon.y : "MUERTO"}
                </li>
              );
            })}
          </ul>
        </div>

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            margin: "auto",
          }}
        >
          <tbody>
            {celdas.map((columna, numeroColumna) => (
              <tr key={numeroColumna}>
                {columna.map((fila, numeroFila) => (
                  <td
                    key={numeroFila}
                    style={{
                      background: configurarColor(
                        fila,
                        numeroColumna,
                        numeroFila
                      ),
                      width: "70px",
                      minWidth: "70px",
                      height: "70px",
                    }}
                    onDragOver={handleDragOver}
                    onDrop={(event) =>
                      handleDrop(event, numeroFila, numeroColumna)
                    }
                  >
                    <a
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, fila, numeroFila, numeroColumna)
                      }
                      onClick={() =>
                        moverFicha(fila, numeroFila, numeroColumna)
                      }
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {fila ? (
                        fila.vivo ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <img src={fila.imagen} alt="Peon" />
                          </div>
                        ) : null
                      ) : null}
                    </a>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
