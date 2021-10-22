import './App.css';
import Board from './Board.js';
import Square from './Square';

function App() {
  return (
    <div>
      <main>
        <Board>
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </Board>
      </main>
    </div>
  );
}

export default App;
