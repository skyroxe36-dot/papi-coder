import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Pause, Square, AlertCircle, FileText, Code2, ListTree, Database, Activity, TerminalSquare, Search } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

type PipelinePhase = 'DECONSTRUCTION' | 'SETUP' | 'SKELETON' | 'TRAINING' | 'COMPLETED';

const Workspace = () => {
  const location = useLocation();
  const paperUrl = location.state?.paperUrl || '';
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<PipelinePhase>('DECONSTRUCTION');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'logs' | 'code' | 'structure'>('logs');

  // Simulated run logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Processing Phase: ${currentPhase} - Agent action executed successfully...`
        ]);

        // Mock transition
        if (logs.length > 5 && currentPhase === 'DECONSTRUCTION') setCurrentPhase('SETUP');
        if (logs.length > 10 && currentPhase === 'SETUP') setCurrentPhase('SKELETON');
        if (logs.length > 15 && currentPhase === 'SKELETON') setCurrentPhase('TRAINING');
        if (logs.length > 20) {
          setIsRunning(false);
          setCurrentPhase('COMPLETED');
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Pipeline Execution Completed Successfully.`]);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentPhase, logs]);

  const toggleRun = () => setIsRunning(!isRunning);

  const steps = [
    { id: 'DECONSTRUCTION', label: '1. Deep Deconstruction', icon: <Search size={16} /> },
    { id: 'SETUP', label: '2. Data & Environment', icon: <Database size={16} /> },
    { id: 'SKELETON', label: '3. Skeleton Implementation', icon: <Code2 size={16} /> },
    { id: 'TRAINING', label: '4. Full-Scale Training', icon: <Activity size={16} /> },
  ];

  return (
    <div className="flex flex-col flex-grow h-[calc(100vh-4rem)] bg-slate-950 text-slate-300">
      {/* Header Bar */}
      <div className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700">
            <FileText size={16} className="text-indigo-400" />
            <span className="text-sm font-medium text-slate-200 truncate max-w-[300px]" title={paperUrl || 'No paper selected'}>
              {paperUrl || 'No paper loaded'}
            </span>
          </div>
          {currentPhase !== 'COMPLETED' && (
            <div className="flex items-center gap-2 text-sm text-indigo-400">
              <span className="relative flex h-3 w-3">
                {isRunning && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>}
                <span className={clsx("relative inline-flex rounded-full h-3 w-3", isRunning ? "bg-indigo-500" : "bg-slate-600")}></span>
              </span>
              {isRunning ? 'Pipeline Active' : 'Pipeline Idle'}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleRun}
            className={clsx(
              "flex items-center gap-2 px-4 py-1.5 rounded-md font-medium text-sm transition-colors",
              isRunning
                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20"
                : "bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-500"
            )}
            disabled={currentPhase === 'COMPLETED'}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? 'Pause' : 'Run Pipeline'}
          </button>

          <button
            onClick={() => { setIsRunning(false); setCurrentPhase('DECONSTRUCTION'); setLogs([]); }}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 text-sm transition-colors"
          >
            <Square size={16} /> Stop
          </button>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar - Progress/Tree */}
        <div className="w-72 border-r border-slate-800 bg-slate-900/30 flex flex-col">
          <div className="p-4 border-b border-slate-800/50">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ListTree size={16} />
              Execution Plan
            </h3>
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const isActive = step.id === currentPhase;
                const isPast = steps.findIndex(s => s.id === currentPhase) > idx || currentPhase === 'COMPLETED';

                return (
                  <div key={step.id} className="relative flex items-start gap-3">
                    {/* Vertical Line Connector */}
                    {idx < steps.length - 1 && (
                      <div className={clsx(
                        "absolute left-3.5 top-8 w-px h-full -ml-px",
                        isPast ? "bg-indigo-500" : "bg-slate-700"
                      )} />
                    )}

                    <div className={clsx(
                      "flex items-center justify-center w-7 h-7 rounded-full border shrink-0 z-10 transition-colors",
                      isActive && isRunning ? "bg-indigo-500/20 border-indigo-500 text-indigo-400" :
                      isActive ? "bg-slate-800 border-indigo-400 text-indigo-400" :
                      isPast ? "bg-indigo-600 border-indigo-500 text-white" :
                      "bg-slate-900 border-slate-700 text-slate-500"
                    )}>
                      {step.icon}
                    </div>

                    <div className={clsx(
                      "flex flex-col pt-1",
                      isActive ? "text-indigo-400 font-medium" :
                      isPast ? "text-slate-300" :
                      "text-slate-500"
                    )}>
                      <span className="text-sm">{step.label}</span>
                      {isActive && isRunning && (
                        <span className="text-xs mt-1 text-slate-400 animate-pulse">Running sub-agents...</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 flex-grow overflow-y-auto">
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Alerts & Missing</h3>
             <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg p-3">
               <div className="flex items-start gap-2 text-amber-400 text-sm mb-2 font-medium">
                 <AlertCircle size={16} className="mt-0.5 shrink-0" />
                 <span>Hyperparameter Ambiguity</span>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Weight decay not specified in paper. Inferring default AdamW value (0.01) for baseline grid search.
               </p>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/80 px-4">
            <button
              onClick={() => setActiveTab('logs')}
              className={clsx(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === 'logs' ? "border-indigo-500 text-indigo-400" : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              <TerminalSquare size={16} /> Agent Logs
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={clsx(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === 'code' ? "border-indigo-500 text-indigo-400" : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              <Code2 size={16} /> Generated Code
            </button>
          </div>

          {/* Content Pane */}
          <div className="flex-grow bg-[#0d1117] relative overflow-hidden font-mono text-sm">
            <AnimatePresence mode="wait">
              {activeTab === 'logs' ? (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 p-4 overflow-y-auto"
                >
                  {logs.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-600">
                      Press 'Run Pipeline' to start the reproduction agents.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {logs.map((log, i) => (
                        <div key={i} className="text-slate-400">
                          <span className="text-emerald-500/80 mr-2">&gt;</span>
                          {log}
                        </div>
                      ))}
                      {isRunning && (
                        <div className="text-slate-500 animate-pulse flex items-center gap-2 mt-4">
                          <span className="w-2 h-4 bg-indigo-500 inline-block"></span>
                          Agent thinking...
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 p-4 overflow-y-auto text-slate-300"
                >
                  <pre className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <code className="text-indigo-300">import</code> torch<br/>
                    <code className="text-indigo-300">import</code> torch.nn <code className="text-indigo-300">as</code> nn<br/>
                    <br/>
                    <span className="text-slate-500"># Auto-generated skeleton from paper Deconstruction</span><br/>
                    <code className="text-indigo-300">class</code> <span className="text-amber-300">PaperModel</span>(nn.Module):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<code className="text-indigo-300">def</code> <span className="text-blue-300">__init__</span>(self, hidden_dim=512):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super().__init__()<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># TODO: Awaiting dimension inference from setup phase</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.layer = nn.Linear(128, hidden_dim)<br/>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<code className="text-indigo-300">def</code> <span className="text-blue-300">forward</span>(self, x):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code className="text-indigo-300">return</code> self.layer(x)
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;