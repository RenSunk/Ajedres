import { useEffect, useState } from "react";
import Tablero from "../objetosV2/Tablero";
import Image from "next/image";

export default function TableroPage() {
  const [tableroView, setTableroView] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const [movimientosPosibles, setMovimientosPosibles] = useState([]);

  useEffect(() => {
    const tablero = new Tablero();
    setTableroView(tablero);
  }, []);

  useEffect(() => {
    console.log("Tablero actualizado:", tableroView);
  }, [tableroView]);

  const onClickCasilla = (x, y) => {
    if (selectedPiece) {
      let nuevoTablero = tableroView;
      if (nuevoTablero.moverFicha(x, y, selectedPiece)) {
        setSelectedPiece(null);
        setTableroView(nuevoTablero);
      } else {
        setSelectedPiece(null);
        alert("Movimiento no permitido");
      }
    } else {
      const pieza = tableroView?.casillas[x][y];
      if (pieza) {
        setSelectedPiece(pieza);
        setMovimientosPosibles(pieza?.movimientosPosibles?.(tableroView));
      }
    }
  };

  const selectColor = (x, y) => {
    if (selectedPiece) {
      if (selectedPiece?.x === x && selectedPiece?.y === y) {
        return "green";
      } else if (
        movimientosPosibles?.some(([mx, my]) => mx === x && my === y)
      ) {
        if (tableroView.casillas[x][y] !== null) {
          return "#F74D4D";
        }
      }
    }
    if ((x + y) % 2 === 0) {
      return "white";
    }

    return "gray";
  };

  const Item = ({x, y, ficha}) => {
    if (selectedPiece) {
      if (movimientosPosibles?.some(([mx, my]) => mx === x && my === y)) {
        if (tableroView.casillas[x][y] === null) {
          return <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#D4D4D4' }}></div>;
        }
      }
    }
    return <>{ficha?.vida && <Image width={50} height={50} src={ficha.uri} alt={ficha.color} />}</>;
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={() => {
          console.log(tableroView);
        }}
      >
        console log
      </button>
      <div
        style={{
          marginRight: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          {tableroView?.casillas?.map((fila, indexFila) => (
            <div key={indexFila} style={{ display: "flex" }}>
              {fila.map((pieza, indexColumna) => (
                <div
                  key={indexColumna}
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    backgroundColor: selectColor(indexFila, indexColumna),
                  }}
                  onClick={() => onClickCasilla(indexFila, indexColumna)}
                >
                  <Item x={indexFila} y={indexColumna} ficha={pieza} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <h5> Info Fichas </h5>
          <div style={{ marginBottom: "20px" }}>
            {tableroView?.fichas?.map((ficha, index) => (
              <div key={index}>
                {ficha.color} - ({ficha.x}, {ficha.y} ) - Vida:{" "}
                {ficha.vida ? "Sí" : "No"}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h5> Historial </h5>
          <div>
            {tableroView?.historial?.map((movimiento, index) => (
              <div key={index}>
                {movimiento.ficha.color} movió de ({movimiento.x},{" "}
                {movimiento.y}) - Vida: {movimiento.ficha.vida ? "Sí" : "No"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
