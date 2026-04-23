export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  heuristic: number; // for A*
  previousNode: NodeType | null;
  weight: number; // Optional feature
};

export type AlgorithmType = 'DIJKSTRA' | 'A_STAR' | 'BFS' | 'DFS';
export type SpeedType = 'SLOW' | 'NORMAL' | 'FAST';
