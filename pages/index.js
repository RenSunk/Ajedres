import TableroPage from "./Tablero";

export default function Home() {

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
      <div style={{ display: "flex" }}>

        <TableroPage />

        <div style={{ marginLeft: "20px", width: "30%" }}>
        {
          /**
           * <PanelFichas
          arfilesBlancos={arfilesBlancos}
          peonesBlancos={peonesBlancos}
          reinasBlancas={reinasBlancas}
          caballosBlancos={caballosBlancos}
          reyBlanco={reyBlanco}
          torresBlancas={torresBlancas}
          arfilesNegros={arfilesNegros}
          caballosNegros={caballosNegros}
          peonesNegros={peonesNegros}
          reinasNegras={reinasNegras}
          reyNegro={reyNegro}
          torresNegras={torresNegras}
        />
           */
        }
        
        </div>

      </div>
    </div>
  );
}
