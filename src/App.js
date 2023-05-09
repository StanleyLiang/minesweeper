import { useState } from "react";
import classNames from "classnames";
import Col from "./Col";
import Controller from "./Controller";
import { initBoard, placeMines, openCol, flagCol } from "./utils";
import { GameStatus } from "./constants";
import "./App.css";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.Initial);
  const [board, setBoard] = useState(initBoard(ROWS, COLS));

  const boardClass = classNames("board", gameStatus);

  const onOpenCol = ({ row, col }) => {
    const { boardUpdated, mineBoomed } = openCol({ board, row, col });

    if (mineBoomed) {
      console.log("game over", { row, col });
      setGameStatus(GameStatus.Failed);
    }

    setBoard([...boardUpdated]);
  };

  const onStart = (entryCoordinate) => {
    setGameStatus(GameStatus.Started);

    const { boardUpdated } = openCol({
      board: placeMines({ board, mines: MINES, entryCoordinate }),
      ...entryCoordinate,
    });

    setBoard(boardUpdated);
  };

  const onColClick = gameStatus === GameStatus.Started ? onOpenCol : onStart;

  const onColFlag = ({ row, col }) => {
    const boardUpdated = flagCol({ board, row, col });
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
