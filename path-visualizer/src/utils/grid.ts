import type { NodeType } from '../types';

export const createNode = (
  col: number,
  row: number,
  startNode: { row: number; col: number },
  endNode: { row: number; col: number }
): NodeType => {
  return {
    col,
    row,
    isStart: row === startNode.row && col === startNode.col,
    isEnd: row === endNode.row && col === endNode.col,
    distance: Infinity,
    heuristic: Infinity,
    isVisited: false,
    isWall: false,
    isPath: false,
    previousNode: null,
    weight: 1,
  };
};

export const getInitialGrid = (
  numRows: number,
  numCols: number,
  startNode: { row: number; col: number },
  endNode: { row: number; col: number }
) => {
  const grid: NodeType[][] = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(createNode(col, row, startNode, endNode));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getNewGridWithWallToggled = (
  grid: NodeType[][],
  row: number,
  col: number
) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
