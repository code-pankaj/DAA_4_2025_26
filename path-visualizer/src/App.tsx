import { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PathfindingVisualizer } from './components/PathfindingVisualizer';
import type { AlgorithmType, SpeedType } from './types';
import { Menu, Compass } from 'lucide-react';

function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('DIJKSTRA');
  const [speed, setSpeed] = useState<SpeedType>('FAST');
  const [isRunning, setIsRunning] = useState(false);
  
  const [triggerVisualize, setTriggerVisualize] = useState(0);
  const [triggerClearGrid, setTriggerClearGrid] = useState(0);
  const [triggerClearPath, setTriggerClearPath] = useState(0);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#e5e7eb] font-sans">
      {/* Full-screen Background Map */}
      <div className="absolute inset-0 z-0">
        <PathfindingVisualizer
          algorithm={algorithm}
          speed={speed}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          triggerVisualize={triggerVisualize}
          triggerClearGrid={triggerClearGrid}
          triggerClearPath={triggerClearPath}
        />
      </div>

      {/* Floating UI Overlay */}
      <div className="absolute top-0 left-0 p-4 z-10 flex flex-col gap-4 pointer-events-none w-full max-w-[24rem]">
        {/* Fake Google Maps Search Box */}
        <div className="bg-white rounded-full shadow-md flex items-center px-4 py-3 pointer-events-auto border border-slate-200">
          <Menu className="w-6 h-6 text-slate-600 cursor-pointer hover:text-slate-900" />
          <div className="flex-1 px-4 text-slate-500 font-medium truncate">
            Search PathMap
          </div>
          <div className="w-px h-5 bg-slate-300 mx-3"></div>
          <Compass className="w-6 h-6 text-blue-600" />
        </div>

        {/* Control Panel */}
        <div className="pointer-events-auto">
          <ControlPanel
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            speed={speed}
            setSpeed={setSpeed}
            visualize={() => setTriggerVisualize(prev => prev + 1)}
            clearGrid={() => setTriggerClearGrid(prev => prev + 1)}
            clearPath={() => setTriggerClearPath(prev => prev + 1)}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
