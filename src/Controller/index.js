import { useMemo } from "react";
import { GameStatus } from "../constants";

const Controller = ({ gameStatus }) => {
  const message = useMemo(() => {
    if (gameStatus === GameStatus.Failed) return "Game Over";
    if (gameStatus === GameStatus.Initial)
      return "Click any cell to start a game";
  }, [gameStatus]);

  const onRestart = () => window.location.reload();

  return (
    <div>
      <p className="message">{message}</p>
      {gameStatus !== GameStatus.Initial && (
        <button onClick={onRestart}>Restart</button>
      )}
    </div>
  );
};

export default Controller;
