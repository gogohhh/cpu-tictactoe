import './App.css';
import { useState } from 'react';
import Board from './Board.js';
import Square from './Square';

const defaultSquares = () => (new Array(9)).fill(null);

function App() {

  const [squares, setSqueares] = useState(defaultSquares());

  function handleSquareClick(index){
    let newSquares = squares;
    newSquares[index] = 'X';
    setSqueares( [...newSquares]);
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
