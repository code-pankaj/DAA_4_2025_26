# Design and Analysis of Algorithms (DAA) - Pathfinding Visualizer Report

## 1. Introduction
Pathfinding is a computational problem of finding a route between two points. It is a core component of many real-world applications, such as routing packets over the internet, AI movement in video games, and GPS navigation systems like Google Maps. This project visualizes several classic pathfinding algorithms on a 2D grid to demonstrate how they operate, how they expand their search space, and how they guarantee (or fail to guarantee) the shortest path.

## 2. Algorithms Explanation

### 2.1 Dijkstra's Algorithm
Dijkstra's Algorithm guarantees the shortest path in a graph with non-negative edge weights. It works by maintaining a priority queue of nodes to visit, always exploring the node with the smallest cumulative distance from the start node. It systematically explores outwards, ensuring that when a node is visited, the shortest path to it has been found.

### 2.2 A* Search
A* (A-Star) is an informed search algorithm. It is arguably the most popular pathfinding algorithm used in AI and games. Like Dijkstra's, it guarantees the shortest path, but it is much faster in practice because it uses a *heuristic* to guide its search towards the target. 
- The score $f(n) = g(n) + h(n)$ is used, where $g(n)$ is the exact cost from the start, and $h(n)$ is the estimated cost to the end.

### 2.3 Breadth-First Search (BFS)
BFS explores the graph level by level, visiting all neighbors of a node before moving to the next level. In an unweighted grid (like ours, where every move costs 1), BFS guarantees the shortest path. It behaves identically to Dijkstra's algorithm on unweighted graphs but does not need a priority queue.

### 2.4 Depth-First Search (DFS)
DFS dives as deep as possible along a branch before backtracking. While it is useful for certain graph traversal problems (like finding connected components or maze generation), it is a very poor choice for pathfinding because it does *not* guarantee the shortest path. It will often find a highly suboptimal, winding path.

## 3. Time & Space Complexity

| Algorithm | Time Complexity | Space Complexity | Optimality |
|-----------|-----------------|------------------|------------|
| **Dijkstra** | $O(V \log V + E)$ | $O(V)$ | Yes |
| **A\*** | $O(E)$ (worst case) | $O(V)$ | Yes |
| **BFS** | $O(V + E)$ | $O(V)$ | Yes (Unweighted) |
| **DFS** | $O(V + E)$ | $O(V)$ | No |

*Note: In a grid of size $R \times C$, the number of vertices $V = R \times C$ and edges $E \approx 4V$.*

**Practical Implications:** 
While Dijkstra ensures correctness, A* dramatically reduces the number of explored nodes, meaning much less memory is used and the path is computed much faster, which is critical for real-time systems like Maps.

## 4. Heuristics in A*
A heuristic is an "educated guess" of the remaining distance. In a grid where we can only move in 4 directions (up, down, left, right), the best heuristic is the **Manhattan Distance**:
$h(n) = |n_{row} - target_{row}| + |n_{col} - target_{col}|$

This is *admissible* (it never overestimates the true cost), which guarantees A* will find the optimal path. If we allowed diagonal movement, we would use the Chebyshev or Euclidean distance instead.

## 5. Visualization Logic
To create the visualization without blocking the browser's main thread:
1. **Separation of Logic and UI:** The algorithms compute the entire process instantly, returning an array of visited nodes in the exact order they were explored.
2. **Scheduled Animations:** We iterate through the array and use `setTimeout` to iteratively apply CSS classes (`.node-visited`) to the DOM elements.
3. **DOM Manipulation vs React State:** For maximum performance (avoiding re-rendering thousands of React nodes per second), we use direct DOM updates (`document.getElementById().className = ...`) during the animation phase.

## 6. System Design
- **Frontend Framework:** React (with TypeScript for type safety).
- **Styling:** Tailwind CSS + Vanilla CSS Keyframes for smooth animations.
- **State Management:** React hooks (`useState`, `useEffect`) track the grid structure, start/end positions, and walls.
- **Component Structure:**
  - `App`: Main layout, header.
  - `PathfindingVisualizer`: Core engine, handles the grid and coordinates animations.
  - `ControlPanel`: UI for selecting algorithms and speeds.
  - `Node`: Dumb component representing a single cell.

## 7. Comparison & Observations
From running the visualization:
- **Speed vs Optimality:** A* explores far fewer nodes than Dijkstra's algorithm, heading directly towards the target like a magnet. BFS explores uniformly in all directions. DFS immediately shoots off in a single direction and gets trapped easily.
- **Greed vs Cost:** A* perfectly balances the greediness of heading towards the target with the cost of getting there.

## 8. Limitations
- **Grid Constraints:** Real-world road networks are represented as complex graphs with continuous lengths, not discrete 2D grids.
- **Traffic and Weights:** Our grid currently treats all open cells equally. A true Maps clone uses heavily weighted graphs representing speed limits and live traffic data.

## 9. Conclusion
This project successfully demonstrates the fundamental principles of graph search and pathfinding. It highlights the superiority of A* for spatial navigation tasks, making it clear why such informed search strategies form the backbone of modern routing software.
