import React from 'react';
import type { AlgorithmType, SpeedType } from '../types';
import { Play, RotateCcw, Zap, Trash2, Map } from 'lucide-react';

interface ControlPanelProps {
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  speed: SpeedType;
  setSpeed: (speed: SpeedType) => void;
  visualize: () => void;
  clearGrid: () => void;
  clearPath: () => void;
  isRunning: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  visualize,
  clearGrid,
  clearPath,
  isRunning,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Map className="w-4 h-4" /> Routing Controls
        </h2>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Algorithm</label>
          <select
            disabled={isRunning}
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border outline-none bg-slate-50"
          >
            <option value="DIJKSTRA">Dijkstra's Algorithm</option>
            <option value="A_STAR">A* Search</option>
            <option value="BFS">Breadth-First Search (BFS)</option>
            <option value="DFS">Depth-First Search (DFS)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Animation Speed</label>
          <div className="flex bg-slate-100 rounded-lg p-1">
            {(['SLOW', 'NORMAL', 'FAST'] as SpeedType[]).map((s) => (
              <button
                key={s}
                disabled={isRunning}
                onClick={() => setSpeed(s)}
                className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${
                  speed === s
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={isRunning}
          onClick={visualize}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          {isRunning ? <Zap className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Computing...' : 'Visualize Route'}
        </button>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            disabled={isRunning}
            onClick={clearPath}
            className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Path
          </button>
          <button
            disabled={isRunning}
            onClick={clearGrid}
            className="py-2 px-3 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 text-slate-600 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>
      </div>
    </div>
  );
};
