import React from 'react';
import { MapPin } from 'lucide-react';

interface NodeProps {
  col: number;
  row: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export const Node: React.FC<NodeProps> = ({
  col,
  row,
  isStart,
  isEnd,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const extraClassName = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node w-full h-full flex items-center justify-center bg-white ${extraClassName} select-none`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    >
      {isStart && <MapPin className="w-5 h-5 text-red-500 fill-red-100" />}
      {isEnd && <MapPin className="w-5 h-5 text-green-500 fill-green-100" />}
    </div>
  );
};

// React.memo to prevent unnecessary re-renders of nodes unless their props change.
// However, since we update classes directly via DOM for performance, 
// the component itself won't re-render during animations!
export const MemoizedNode = React.memo(Node);
