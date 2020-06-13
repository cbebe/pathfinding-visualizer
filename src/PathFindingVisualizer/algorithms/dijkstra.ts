import BinaryHeap from "./minheap";
import { NodeType, Cell } from "../Node/Node";

export interface GridNode {
  position: Cell;
  type: NodeType;
  distance: number;
  previousNode: GridNode | null;
}

export type Grid = Array<Array<GridNode>>;

interface SearchProps {
  grid: Grid;
  startNode: GridNode;
  finishNode: GridNode;
}

export const dijkstra = (props: SearchProps): Array<GridNode> | undefined => {
  const { grid, startNode, finishNode } = props;
  const visitedNodesInOrder: Array<GridNode> = [];
  startNode.distance = 0;
  const unvisitedNodes: BinaryHeap<GridNode, number> = getAllNodes(grid);
  while (!!unvisitedNodes.size()) {
    const closestNode = unvisitedNodes.popMin();
    // skip if a wall is encountered
    if (closestNode.item.type === NodeType.Wall) continue;
    // couldn't find path
    if (closestNode.key === Infinity) break;
    closestNode.item.type = NodeType.Visited;
    visitedNodesInOrder.push(closestNode.item);
    if (closestNode.item === finishNode) break;
    updateUnvisitedNeighbors(closestNode.item, grid);
  }
  return visitedNodesInOrder;
};

function getAllNodes(grid: Grid): BinaryHeap<GridNode, number> {
  const heap: BinaryHeap<GridNode, number> = new BinaryHeap();
  for (const row of grid) {
    for (const node of row) {
      heap.insert(node, node.distance);
    }
  }
  return heap;
}

function updateUnvisitedNeighbors(node: GridNode, grid: Grid) {}
