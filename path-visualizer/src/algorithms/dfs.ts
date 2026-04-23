import type { NodeType } from '../types';
import { getUnvisitedNeighbors } from './dijkstra';

export function dfs(grid: NodeType[][], startNode: NodeType, finishNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  const stack: NodeType[] = [];
  
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();
    if (!currentNode) continue;

    if (currentNode.isWall) continue;
    
    if (!currentNode.isVisited) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      
      if (currentNode === finishNode) return visitedNodesInOrder;

      const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
      // To simulate typical DFS, we push in reverse order so the first neighbor is popped first
      for (let i = unvisitedNeighbors.length - 1; i >= 0; i--) {
        const neighbor = unvisitedNeighbors[i];
        if (!neighbor.isVisited) {
          neighbor.previousNode = currentNode;
          stack.push(neighbor);
        }
      }
    }
  }

  return visitedNodesInOrder;
}
