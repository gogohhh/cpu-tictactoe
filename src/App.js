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

  useEffect( () => {
    const turnoCPU = squares.filter(square => square !== null).length % 2 === 1;

    const putCPU = index => {
      let newSquares = squares;
      newSquares[index] = 'O';
      setSqueares( [...newSquares] );
    };

    if(turnoCPU){
      const mismoIndex = squares.map(( square, index : number ) => square === null ? index : null).filter( val => val !== null);

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

  return (
    <div>
      <main>
        <Board>
          {squares.map((square, index) => 
              
              <Square 
                x={square==='X' ? 1 : 0}
                o={square==='O' ? 1 : 0}
                onClick={ () => handleSquareClick(index)} />
            )
          }
        </Board>
      </main>
    </div>
  );
}

export default App;
