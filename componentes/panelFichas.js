export const PanelFichas = ({
  peonesBlancos,
  torresBlancas,
  arfilesBlancos,
  reinasBlancas,
  reyBlanco,
  peonesNegros,
  torresNegras,
  arfilesNegros,
  reinasNegras,
  reyNegro,
}) => {
  return (
    <div>
      <h2>Fichas blancas:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", width: "90%" }}>
        {peonesBlancos.map((peon, index) => {
          return (
            !peon.vivo && (
              <div key={index}>
                <img style={{}} src="PeonBlanco.png" alt="Peon" />
              </div>
            )
          );
        })}
        {torresBlancas.map((torre, index) => {
          return (
            !torre.vivo && (
              <div key={index}>
                <img src="TorreBlanca.png" alt="Torre" />
              </div>
            )
          );
        })}
        {arfilesBlancos.map((arfil, index) => {
          return (
            !arfil.vivo && (
              <div key={index}>
                <img src="ArfilBlanco.png" alt="Arfil" />
              </div>
            )
          );
        })}
        {reinasBlancas.map((reina, index) => {
          return (
            !reina.vivo && (
              <div key={index}>
                <img src="ReinaBlanca.png" alt="Reina" />
              </div>
            )
          );
        })}
        {reyBlanco.map((rey, index) => {
          return (
            !rey.vivo && (
              <div key={index}>
                <img src="ReyBlanco.png" alt="Rey" />
              </div>
            )
          );
        })}
      </div>
      <h2>Fichas negras:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", width: "90%" }}>
        {peonesNegros.map((peon, index) => {
          return (
            !peon.vivo && (
              <div key={index}>
                <img src="PeonNegro.png" alt="Peon" />
              </div>
            )
          );
        })}
        {torresNegras.map((torre, index) => {
          return (
            !torre.vivo && (
              <div key={index}>
                <img src="TorreNegra.png" alt="Torre" />
              </div>
            )
          );
        })}
        {arfilesNegros.map((arfil, index) => {
          return (
            !arfil.vivo && (
              <div key={index}>
                <img src="ArfilNegro.png" alt="Arfil" />
              </div>
            )
          );
        })}
        {reinasNegras.map((reina, index) => {
          return (
            !reina.vivo && (
              <div key={index}>
                <img src="ReinaNegra.png" alt="Reina" />
              </div>
            )
          );
        })}
        {reyNegro.map((rey, index) => {
          return (
            !rey.vivo && (
              <div key={index}>
                <img src="ReyNegro.png" alt="Rey" />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
