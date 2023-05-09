import { useMemo } from "react";
import classNames from "classnames";

const Col = ({
  row,
  col,
  isOpen,
  isMine,
  isFlag,
  count,
  onClick,
  onContextMenu,
}) => {
  const display = useMemo(() => {
    if (isFlag) return "🚩";
    if (!isOpen) return "";
    if (isMine) return "💣";
    if (count > 0) return count;
    return "";
  }, [isOpen, isMine, isFlag, count]);

  const colClass = classNames("col", { opened: isOpen });
  const clickHandler = (event) => {
    if (isFlag) return;
    onClick({ row, col });
  };
  const contextMenuHandler = (event) => {
    event.preventDefault();
    onContextMenu({ row, col });
  };
  return (
    <div
      className={colClass}
      onClick={clickHandler}
      onContextMenu={contextMenuHandler}
      data-count={count}
    >
      {display}
    </div>
  );
};

export default Col;
