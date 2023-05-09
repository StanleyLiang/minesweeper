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
  onDoubleClick,
}) => {
  const display = useMemo(() => {
    if (isFlag) return "🚩";
    if (!isOpen) return "";
    if (isMine) return "💣";
    if (count > 0) return count;
    return "";
  }, [isOpen, isMine, isFlag, count]);

  const colClass = classNames("col", { opened: isOpen });

  const clickHandler = () => {
    if (isOpen) return;
    if (isFlag) return;
    onClick({ row, col });
  };

  const contextMenuHandler = (event) => {
    event.preventDefault();
    onContextMenu({ row, col });
  };

  const doubleClickHandler = () => onDoubleClick({ row, col });

  return (
    <div
      className={colClass}
      onClick={clickHandler}
      onContextMenu={contextMenuHandler}
      onDoubleClick={doubleClickHandler}
      data-count={count}
    >
      {display}
    </div>
  );
};

export default Col;
