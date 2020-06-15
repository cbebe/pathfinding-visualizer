import BinaryHeap from "./minheap";
import { NodeType, Cell } from "../Node/Node";

export interface GridNode {
  position: Cell;
  type: NodeType;
  distance: number;
  previousNode: GridNode | null;
}

export type Grid = GridNode[][];

const dijkstra = (
  grid: Grid,
  startNode: GridNode,
  finishNode: GridNode
): GridNode[] => {
  const visitedNodesInOrder: GridNode[] = [];
  startNode.distance = 0;
  while (!!unvisitedNodes.size()) {
    const closestNode = unvisitedNodes.popMin();
    // skip if a wall is encountered
    if (closestNode.item.type === NodeType.Wall) continue;
    // couldn't find path
    if (closestNode.key === Infinity) {
      console.log("path not found :(");
      break;
    }
    closestNode.item.type = NodeType.Visited;
    visitedNodesInOrder.push(closestNode.item);
    if (closestNode.item === finishNode) break;
    updateUnvisitedNeighbors(closestNode.item, grid);
  }
  return visitedNodesInOrder;
};

function getAllNodes(grid: Grid): BinaryHeap<GridNode, number> {
  const heap: BinaryHeap<GridNode, number> = new BinaryHeap();
  for (const row of grid)
    for (const node of row) heap.insert(node, node.distance);

  return heap;
}

function updateUnvisitedNeighbors(node: GridNode, grid: Grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node: GridNode, grid: Grid) {
  const neighbors = [];
  const { row, col } = node.position;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => neighbor.type !== NodeType.Visited);
}

export const getNodesInShortestPathOrder = (
  finishNode: GridNode
): GridNode[] => {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
};

export default dijkstra;
