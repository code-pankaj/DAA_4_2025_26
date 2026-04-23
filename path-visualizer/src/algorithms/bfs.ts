import type { NodeType } from '../types';
import { getUnvisitedNeighbors } from './dijkstra';

export function bfs(grid: NodeType[][], startNode: NodeType, finishNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  const queue: NodeType[] = [];
  
  startNode.isVisited = true;
  queue.push(startNode);

  while (queue.length) {
    const currentNode = queue.shift();
    if (!currentNode) continue;

    if (currentNode.isWall) continue;
    
    // We already marked it as visited before pushing to avoid duplicates in queue,
    // but for the animation order we push it here.
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}
