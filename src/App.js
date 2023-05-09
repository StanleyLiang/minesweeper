import { useState } from "react";
import classNames from "classnames";
import Col from "./Col";
import Controller from "./Controller";
import {
  initBoard,
  placeMines,
  openSquare,
  flagSquare,
  openSquaresAround,
} from "./utils";
import { GameStatus } from "./constants";
import "./App.css";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.Initial);
  const [board, setBoard] = useState(initBoard(ROWS, COLS));

  const boardClass = classNames("board", gameStatus);

  const onOpenSquare = ({ row, col }) => {
    const { boardUpdated, mineBoomed } = openSquare({ board, row, col });

    if (mineBoomed) {
      setGameStatus(GameStatus.Failed);
    }

    setBoard([...boardUpdated]);
  };

  const onStart = (entryCoordinate) => {
    setGameStatus(GameStatus.Started);

    const { boardUpdated } = openSquare({
      board: placeMines({ board, mines: MINES, entryCoordinate }),
      ...entryCoordinate,
    });

    setBoard(boardUpdated);
  };

  const onColClick = gameStatus === GameStatus.Started ? onOpenSquare : onStart;

  const onColFlag = ({ row, col }) => {
    const boardUpdated = flagSquare({ board, row, col });
    setBoard([...boardUpdated]);
  };

  const onOpenSquareAround = ({ row, col }) => {
    const boardUpdated = openSquaresAround({ board, row, col });
    setBoard([...boardUpdated]);
  };

  return (
    <div className="App">
      <div className={boardClass}>
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Col
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                {...col}
                onClick={onColClick}
                onContextMenu={onColFlag}
                onDoubleClick={onOpenSquareAround}
              />
            ))}
          </div>
        ))}
      </div>
      <Controller gameStatus={gameStatus} />
    </div>
  );
}

export default App;
