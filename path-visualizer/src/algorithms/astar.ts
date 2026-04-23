import type { NodeType } from '../types';
import { getUnvisitedNeighbors } from './dijkstra';

export function astar(grid: NodeType[][], startNode: NodeType, finishNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, finishNode);
  
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByTotalDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (!closestNode) continue;
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === finishNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighborsAstar(closestNode, grid, finishNode);
  }
  
  return visitedNodesInOrder;
}

function manhattanDistance(nodeA: NodeType, nodeB: NodeType) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function sortNodesByTotalDistance(unvisitedNodes: NodeType[]) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    const totalDistA = nodeA.distance + nodeA.heuristic;
    const totalDistB = nodeB.distance + nodeB.heuristic;
    if (totalDistA === totalDistB) {
      return nodeA.heuristic - nodeB.heuristic; // tie-breaker
    }
    return totalDistA - totalDistB;
  });
}

function updateUnvisitedNeighborsAstar(node: NodeType, grid: NodeType[][], finishNode: NodeType) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const tentativeDistance = node.distance + neighbor.weight;
    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance;
      neighbor.heuristic = manhattanDistance(neighbor, finishNode);
      neighbor.previousNode = node;
    }
  }
}

function getAllNodes(grid: NodeType[][]) {
  const nodes: NodeType[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
