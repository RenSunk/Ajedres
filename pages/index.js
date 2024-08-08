import { useEffect, useState } from "react";
import { Peon } from "../objetos/peon";
import { Torre } from "../objetos/torre";
import { Arfil } from "../objetos/arfil";
import { Reina } from "../objetos/reina";
import { Rey } from "../objetos/rey";
import { PanelFichas } from "../componentes/panelFichas";

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
    new Peon(6, 2, false),
    new Peon(6, 3, false),
    new Peon(6, 4, false),
    new Peon(6, 5, false),
    new Peon(6, 6, false),
    new Peon(6, 7, false),
  ]);

  const [torresBlancas] = useState([
    new Torre(0, 0, true),
    new Torre(0, 7, true),
  ]);

  const [torresNegras] = useState([
    new Torre(7, 0, false),
    new Torre(7, 7, false),
  ]);

  const [arfilesBlancos] = useState([
    new Arfil(0, 2, true),
    new Arfil(0, 5, true),
  ]);

  const [arfilesNegros] = useState([
    new Arfil(7, 2, false),
    new Arfil(7, 5, false),
  ]);

  const [reinasBlancas] = useState([new Reina(0, 3, true)]);

  const [reinasNegras] = useState([new Reina(7, 3, false)]);

  const [reyBlanco] = useState([new Rey(0, 4, true)]);

  const [reyNegro] = useState([new Rey(7, 4, false)]);

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
        setMovimientosPermitidos([]);
      }
    } else if (fila && nuevaCeldaSelecionada.leghth != 0) {
      if (fila.vivo) {
        setCeldaSelecionada(fila);
        setMovimientosPermitidos(fila.movimientoPermitidos(celdas));
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

          let arfilBlanco = arfilesBlancos.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (arfilBlanco) {
            return arfilBlanco;
          }

          let arfilNegro = arfilesNegros.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (arfilNegro) {
            return arfilNegro;
          }

          let reinaBlanca = reinasBlancas.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (reinaBlanca) {
            return reinaBlanca;
          }

          let reinaNegra = reinasNegras.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (reinaNegra) {
            return reinaNegra;
          }

          let reyblanco = reyBlanco.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (reyblanco) {
            return reyblanco;
          }

          let reynegro = reyNegro.find(
            ({ x, y }) => x == numeroColumna && y == numeroFila
          );

          if (reynegro) {
            return reynegro;
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
    if (fila) {
      if (fila.vivo) {
        setCeldaSelecionada(fila);
        setMovimientosPermitidos(fila.movimientoPermitidos(celdas));
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
      return "#3dec5d ";
    }

    if (celdaSelecionada) {
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
        <h3> Versión Alfa 1.05 </h3>
      </div>
      <div style={{ display: "flex", width: "80%" }}>

        <PanelFichas
          arfilesBlancos={arfilesBlancos}
          peonesBlancos={peonesBlancos}
          reinasBlancas={reinasBlancas}
          reyBlanco={reyBlanco}
          torresBlancas={torresBlancas}
          arfilesNegros={arfilesNegros}
          peonesNegros={peonesNegros}
          reinasNegras={reinasNegras}
          reyNegro={reyNegro}
          torresNegras={torresNegras}
        />

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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {movimientosPermitidos.find(
                          (movimiento) =>
                            movimiento.x === numeroColumna &&
                            movimiento.y === numeroFila
                        ) && !fila ? (
                          <div
                            style={{
                              border: "8px solid #bcbebd",
                              width: "0px",
                              height: "0px",
                              borderRadius: "50%",
                            }}
                          ></div>
                        ) : null}

                        {fila ? (
                          fila.vivo ? (
                            <>
                              <img src={fila.imagen} alt="Peon" />
                            </>
                          ) : null
                        ) : null}
                      </div>
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
