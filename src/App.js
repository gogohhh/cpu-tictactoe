import './App.css';
import { useState, useEffect } from 'react';
import Board from './Board.js';
import Square from './Square';

const defaultSquares = () => (new Array(9)).fill(null);

function App() {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [squares, setSqueares] = useState(defaultSquares());

  const [ganar, setGanar] = useState(null);

  useEffect( () => {
    const turnoCPU = squares.filter(square => square !== null).length % 2 === 1;

    const paraGanar = (a, b, c) =>{ 
      return lines.filter( squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify( [a, b, c].sort()) === JSON.stringify(squareValues.sort());
      });
    };

    const mismoIndex = squares.map(( square, index  ) => square === null ? index : null).filter( val => val !== null);

    const ganador = paraGanar( 'X', 'X', 'X').length > 0;
    const CPUganador = paraGanar( 'O', 'O', 'O').length > 0;
    
    if(ganador){
      setGanar('X');
    }

    if(CPUganador){
      setGanar('O');
    }

    const putCPU = index => {
      let newSquares = squares;
      newSquares[index] = 'O';
      setSqueares( [...newSquares] );
    };

    if(turnoCPU){

      const lineaGanadora = paraGanar( 'O', 'O', null ); /** El turno de la CPU debe buscar la victoria primero, despues bloquear */
      if(lineaGanadora.length > 0){
        const posicionGanadora = lineaGanadora[0].filter(index => squares[index] === null)[0];
        putCPU(posicionGanadora);
        return;
      }

      const bloquearLineas = paraGanar( 'X', 'X', null ); /** Si el jugador esta por ganar, la cpu tira en ese espacio */
      if(bloquearLineas.length > 0){
        const bloquear = bloquearLineas[0].filter(index => squares[index] === null)[0];
        putCPU(bloquear);
        return;
      }


      const continuarLinea = paraGanar( 'O', null, null );
      if (continuarLinea.length > 0) {
        putCPU(continuarLinea[0].filter(index => squares[index] === null)[0]);
        return;
      }
      
      const randomIndex = mismoIndex[ Math.ceil( Math.random()*mismoIndex.length ) ]

      putCPU(randomIndex);
    }

  }, [squares]);


  function handleSquareClick(index){
    const turno = squares.filter(square => square !== null).length % 2 === 0;

    if(turno){
    let newSquares = squares;
    newSquares[index] = 'X';
    setSqueares( [...newSquares]);
    }
  }

  function reload() {
    window.location.reload(true);
  }

  return (
    <div>
      <main>
        <div className="title">
          <h4 className="nombre">Tic Tac Toe</h4>
          <span className="subtitle">Usuario: X    vs    CPU: O</span>
        </div>

        <Board>
          {squares.map((square, index) => 
              
              <Square 
                x={square==='X' ? 1 : 0}
                o={square==='O' ? 1 : 0}
                onClick={ () => handleSquareClick(index)} />
            )
          }
        </Board>
        
        {!!ganar && ganar === 'X' &&(
          <div className='resultado usuario'>
           ??GANASTE!
          </div>
        )}

        {!!ganar && ganar === 'O' &&(
          <div className='resultado cpu'>
            ??PERDISTE!
          </div>
        )}

        <div class="reset">
          <button type="submit" class="btn-reiniciar" onClick={reload}>Limpiar</button>
        </div>
      </main>
    </div>
  );
}

export default App;
