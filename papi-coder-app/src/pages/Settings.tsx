import { useState } from 'react';
import { Save, Key, Cpu, Settings2, Code, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    gemini: ''
  });

  const [hardware, setHardware] = useState({
    device: 'auto',
    precision: 'fp16',
  });

  const handleApiKeyChange = (provider: keyof typeof apiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  const handleSave = () => {
    // Save to local storage or backend
    console.log('Settings saved');
  };

  return (
    <div className="flex flex-col flex-grow items-center py-12 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
              <Settings2 className="text-indigo-400" />
              Engine Configuration
            </h1>
            <p className="text-slate-400 mt-2">Manage API keys, compute resources, and agent behavior.</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Save size={18} />
            Save Configuration
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* API Keys Section */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <Key className="text-amber-400" size={20} />
              Model Providers
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                  OpenAI API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKeys.openai}
                    onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    placeholder="sk-..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                  Anthropic API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKeys.anthropic}
                    onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    placeholder="sk-ant-..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                  Google Gemini Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKeys.gemini}
                    onChange={(e) => handleApiKeyChange('gemini', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    placeholder="AIza..."
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
              <Shield size={14} className="text-indigo-400 shrink-0" />
              <p>Keys are stored locally in your browser and are only sent directly to the respective model APIs.</p>
            </div>
          </div>

          {/* Environment Section */}
          <div className="space-y-8">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <Cpu className="text-emerald-400" size={20} />
                Hardware & Training
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">Target Device</label>
                  <select
                    value={hardware.device}
                    onChange={(e) => setHardware({...hardware, device: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none"
                  >
                    <option value="auto">Auto-detect (CUDA/MPS/CPU)</option>
                    <option value="cuda">CUDA (NVIDIA GPU)</option>
                    <option value="mps">MPS (Apple Silicon)</option>
                    <option value="cpu">CPU Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">Compute Precision</label>
                  <select
                    value={hardware.precision}
                    onChange={(e) => setHardware({...hardware, precision: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none"
                  >
                    <option value="fp32">FP32 (Full Precision)</option>
                    <option value="fp16">FP16 (Half Precision - Recommended)</option>
                    <option value="bf16">BF16 (BFloat16)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Code className="text-blue-400" size={20} />
                Output Preferences
              </h2>
              <div className="space-y-4">
                 <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/50 bg-slate-900/30 hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500 bg-slate-900" defaultChecked />
                    <span className="text-sm text-slate-300 font-medium">Generate Jupyter Notebooks alongside scripts</span>
                 </label>
                 <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/50 bg-slate-900/30 hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500 bg-slate-900" defaultChecked />
                    <span className="text-sm text-slate-300 font-medium">Create requirements.txt / Conda environment file</span>
                 </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;