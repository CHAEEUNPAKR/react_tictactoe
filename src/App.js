import Board from "./components/Board";
import "./App.css";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNum, setStepNum] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const current = history[stepNum];
  const winner = calculateWinner(current.squares);
  let player;

  if (winner) {
    player = `Winner: ${winner}`;
  } else {
    player = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNum + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    //한번 눌리거나 승자가 정해지면 더이상 눌리지 않게 함
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";

    //원래 있던 부분에 새롭게 추가
    setHistory([...newHistory, { squares: newSquares }]);
    setxIsNext((prev) => !prev);

    setStepNum(newHistory.length);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => JumpTo(move)} className="move-button">
          {desc}
        </button>
      </li>
    );
  });

  const JumpTo = (step) => {
    setStepNum(step);
    setxIsNext(step % 2 === 0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{player}</div>
        <ol style={{ listStyle: "none" }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
