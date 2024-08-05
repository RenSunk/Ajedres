import { useEffect, useState } from "react";
import { Peon } from "../objetos/peon";

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

  const [peonesBlancos, setPeonesBlancos] = useState([
    new Peon(0, 0, true),
    new Peon(0, 1, true),
    new Peon(0, 2, true),
    new Peon(0, 3, true),
    new Peon(0, 4, true),
    new Peon(0, 5, true),
    new Peon(0, 6, true),
    new Peon(0, 7, true),
  ]);

  const [peonesNegros, setPeonesNegros] = useState([
    new Peon(7, 0, false),
    new Peon(7, 1, false),
    new Peon(7, 2, false),
    new Peon(7, 3, false),
    new Peon(7, 4, false),
    new Peon(7, 5, false),
    new Peon(7, 6, false),
    new Peon(7, 7, false),
  ]);

  const [celdaSelecionada, setCeldaSelecionada] = useState();
  const [nuevaCeldaSelecionada, setNuevaCeldaSelecionada] = useState({});

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
            fichaAntigua
          )
        ) {
          reAjustarCeldas();
        }
        setCeldaSelecionada();
        setNuevaCeldaSelecionada({});
      }
    } else if (fila && nuevaCeldaSelecionada.leghth != 0) {
      fila.vivo && setCeldaSelecionada(fila);
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
        });
      });
      return items;
    });
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
            {celdas.map((columna, numeroColumna) => {
              return (
                <tr key={numeroColumna}>
                  {columna.map((fila, numeroFila) => {
                    return (
                      <td
                        key={numeroFila}
                        style={{
                          backgroundImage:
                            numeroFila % 2 == numeroColumna % 2
                              ? "url('/casillanegra.png')"
                              : "",
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        {}
                        <a
                          onClick={() => {
                            moverFicha(fila, numeroFila, numeroColumna);
                          }}
                          style={{
                            backgroundColor:
                              celdaSelecionada && celdaSelecionada == fila
                                ? "green"
                                : nuevaCeldaSelecionada.x == numeroColumna &&
                                  nuevaCeldaSelecionada.y == numeroFila
                                ? "red"
                                : "",
                            display: "block",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {fila ? (
                            fila.vivo ? (
                              <img src={fila.imagen} alt="Peon" />
                            ) : null
                          ) : null}
                        </a>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
