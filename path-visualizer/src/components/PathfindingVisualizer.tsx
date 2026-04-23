import React, { useEffect, useState, useRef } from 'react';
import type { NodeType, AlgorithmType, SpeedType } from '../types';
import { getInitialGrid, getNewGridWithWallToggled } from '../utils/grid';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar } from '../algorithms/astar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { MemoizedNode } from './Node';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export const PathfindingVisualizer: React.FC<{
  algorithm: AlgorithmType;
  speed: SpeedType;
  isRunning: boolean;
  setIsRunning: (val: boolean) => void;
  triggerVisualize: number;
  triggerClearGrid: number;
  triggerClearPath: number;
}> = ({ algorithm, speed, isRunning, setIsRunning, triggerVisualize, triggerClearGrid, triggerClearPath }) => {
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [isMovingEnd, setIsMovingEnd] = useState(false);
  
  const [startNodePos, setStartNodePos] = useState({ row: START_NODE_ROW, col: START_NODE_COL });
  const [endNodePos, setEndNodePos] = useState({ row: FINISH_NODE_ROW, col: FINISH_NODE_COL });

  const numRows = 25;
  const numCols = 45;

  useEffect(() => {
    const initialGrid = getInitialGrid(numRows, numCols, startNodePos, endNodePos);
    setGrid(initialGrid);
  }, []);

  // Use refs to avoid capturing stale state in some handlers if needed, though state is fine for this
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const resetNodeClasses = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if ((row === startNodePos.row && col === startNodePos.col) || 
            (row === endNodePos.row && col === endNodePos.col)) continue;
        const element = document.getElementById(`node-${row}-${col}`);
        if (element) {
          element.className = `node w-full h-full flex items-center justify-center bg-white select-none ${gridRef.current[row][col].isWall ? 'node-wall' : ''}`;
        }
      }
    }
  };

  useEffect(() => {
    if (triggerVisualize > 0) {
      visualizeAlgorithm();
    }
  }, [triggerVisualize]);

  useEffect(() => {
    if (triggerClearGrid > 0) {
      const newGrid = getInitialGrid(numRows, numCols, startNodePos, endNodePos);
      setGrid(newGrid);
      resetNodeClasses();
    }
  }, [triggerClearGrid]);

  useEffect(() => {
    if (triggerClearPath > 0) {
      const newGrid = grid.map(row => row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        heuristic: Infinity,
        previousNode: null,
      })));
      setGrid(newGrid);
      resetNodeClasses();
    }
  }, [triggerClearPath]);

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    if (row === startNodePos.row && col === startNodePos.col) {
      setIsMovingStart(true);
    } else if (row === endNodePos.row && col === endNodePos.col) {
      setIsMovingEnd(true);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return;
    if (isMovingStart) {
      const newGrid = getInitialGrid(numRows, numCols, { row, col }, endNodePos);
      // Retain walls
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          newGrid[r][c].isWall = grid[r][c].isWall;
        }
      }
      setStartNodePos({ row, col });
      setGrid(newGrid);
      return;
    }
    if (isMovingEnd) {
      const newGrid = getInitialGrid(numRows, numCols, startNodePos, { row, col });
      // Retain walls
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          newGrid[r][c].isWall = grid[r][c].isWall;
        }
      }
      setEndNodePos({ row, col });
      setGrid(newGrid);
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsMovingStart(false);
    setIsMovingEnd(false);
  };

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isEnd) {
          const element = document.getElementById(`node-${node.row}-${node.col}`);
          if (element) {
            element.className = 'node w-full h-full flex items-center justify-center bg-white node-shortest-path select-none';
          }
        }
        if (i === nodesInShortestPathOrder.length - 1) {
          setIsRunning(false);
        }
      }, 50 * i);
    }
  };

  const getAnimationSpeed = () => {
    if (speed === 'FAST') return 10;
    if (speed === 'NORMAL') return 50;
    return 100;
  };

  const animateAlgorithm = (visitedNodesInOrder: NodeType[], nodesInShortestPathOrder: NodeType[]) => {
    const animSpeed = getAnimationSpeed();
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, animSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isEnd) {
          const element = document.getElementById(`node-${node.row}-${node.col}`);
          if (element) {
            element.className = 'node w-full h-full flex items-center justify-center bg-white node-visited select-none';
          }
        }
      }, animSpeed * i);
    }
  };

  const visualizeAlgorithm = () => {
    // Deep clone grid to clean state without walls removed
    const newGrid = grid.map(row => row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        heuristic: Infinity,
        previousNode: null,
    })));
    resetNodeClasses();
    setGrid(newGrid);
    setIsRunning(true);
    
    // We need to wait for state to update, using setTimeout
    setTimeout(() => {
      const startNode = newGrid[startNodePos.row][startNodePos.col];
      const finishNode = newGrid[endNodePos.row][endNodePos.col];
      let visitedNodesInOrder: NodeType[] = [];

      switch (algorithm) {
        case 'DIJKSTRA':
          visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
          break;
        case 'A_STAR':
          visitedNodesInOrder = astar(newGrid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(newGrid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(newGrid, startNode, finishNode);
          break;
      }

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 50);
  };

  return (
    <div 
      className="w-full h-full bg-[#f8fafc] select-none"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div 
        className="w-full h-full bg-white select-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`
        }}
      >
        {grid.map((row) => {
          return row.map((node) => {
            const { row, col, isStart, isEnd, isWall } = node;
            return (
              <MemoizedNode
                key={`${row}-${col}`}
                col={col}
                row={row}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            );
          });
        })}
      </div>
    </div>
  );
};
