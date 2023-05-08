export const initBoard = (rows, cols) => {
  const board = new Array(rows).fill(null).map(() =>
    new Array(cols).fill(null).map(() => ({
      isOpen: false,
      isMine: false,
      isFlag: false,
      count: 0,
    }))
  );

  return board;
};

const generateMineCoordinates = ({
  mines,
  board,
  entryCoordinate: { row, col },
}) => {
  const entryIndex = row * board.length + col;
  const rowCount = board.length;
  const colCount = rowCount * board[0].length;
  const mineIndexes = new Set();

  while (mineIndexes.size < mines) {
    const randomIndex = Math.floor(Math.random() * colCount);

    if (randomIndex === entryIndex) continue;

    mineIndexes.add(randomIndex);
  }
  const minesCoordinates = Array.from(mineIndexes).map((index) => {
    const row = Math.floor(index / rowCount);
    const col = index % rowCount;
    return { row, col };
  });
  return minesCoordinates;
};

export const placeMines = ({ board, mines, entryCoordinate }) => {
  const mineCoordinates = generateMineCoordinates({
    mines,
    board,
    entryCoordinate,
  });

  mineCoordinates.forEach(({ row, col }) => {
    board[row][col].isMine = true;
  });

  return board;
};

const countMinesAround = ({ board, row, col }) => {
  let count = 0;

  if (board?.[row - 1]?.[col]?.isMine) count++;
  if (board?.[row - 1]?.[col - 1]?.isMine) count++;
  if (board?.[row - 1]?.[col + 1]?.isMine) count++;
  if (board?.[row]?.[col - 1]?.isMine) count++;
  if (board?.[row]?.[col + 1]?.isMine) count++;
  if (board?.[row + 1]?.[col - 1]?.isMine) count++;
  if (board?.[row + 1]?.[col]?.isMine) count++;
  if (board?.[row + 1]?.[col + 1]?.isMine) count++;

  return count;
};

const openAdjacentBlankCols = ({ board, row, col }) => {
  if (!board?.[row]?.[col]) return;
  const colObj = board[row][col];
  if (colObj.isOpen) return;

  const count = countMinesAround({ board, row, col });
  colObj.isOpen = true;
  colObj.count = count;

  if (count > 0) return;

  openAdjacentBlankCols({ board, row: row - 1, col });
  openAdjacentBlankCols({ board, row, col: col - 1 });
  openAdjacentBlankCols({ board, row, col: col + 1 });
  openAdjacentBlankCols({ board, row: row + 1, col });
};

export const openAllMines = (board) =>
  board.map((row) =>
    row.map((col) => {
      if (col.isMine) {
        col.isOpen = true;
      }
      return col;
    })
  );

export const openCol = ({ board, row, col }) => {
  const colObj = board[row][col];
  colObj.isOpen = true;

  if (colObj.isMine) {
    return {
      boardUpdated: openAllMines(board),
      mineBoomed: true,
    };
  }
  colObj.count = countMinesAround({ board, row, col });

  if (colObj.count === 0) {
    openAdjacentBlankCols({ board, row: row - 1, col });
    openAdjacentBlankCols({ board, row, col: col - 1 });
    openAdjacentBlankCols({ board, row, col: col + 1 });
    openAdjacentBlankCols({ board, row: row + 1, col });
  }

  return { boardUpdated: board, mineBoomed: false };
};

export const flagCol = ({ board, row, col }) => {
  board[row][col].isFlag = !board[row][col].isFlag;

  return board;
};