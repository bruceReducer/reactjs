import React, { useState } from "react";
import "./TicTacToe.css";
function TicTacToe() {
  const [squares, setSquares] = useState(() => Array(9).fill(null));

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, nextValue, squares);
  function selectSquare(i) {
    if (winner || squares[i]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[i] = nextValue;
    setSquares(squaresCopy);
  }
  function renderSquare(i) {
    return (
      <button
        style={{ height: "50px", width: "50px" }}
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <>
      <h2>{status}</h2>
      <div className="boardrow">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="boardrow">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="boardrow">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={() => setSquares(Array(9).fill(null))}>restart</button>
    </>
  );
}
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}
function calculateStatus(winner, nextValue, squares) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `cat's game`
    : `Next player: ${nextValue}`;
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[c] === squares[a]) {
      console.log(lines[i]);
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
