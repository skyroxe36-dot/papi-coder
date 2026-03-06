import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, BrainCircuit, Sparkles, BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      // In a real app, we'd validate the URL and pass it to the workspace state
      navigate('/workspace', { state: { paperUrl: url } });
    }
  };

  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />,
      title: 'Deep Deconstruction',
      description: 'Extracts exact architectures, mathematical formulations, and hidden hyperparameters from PDFs.'
    },
    {
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      title: 'Skeleton Generation',
      description: 'Creates fully functional, modular starter code representing the core logic described in the paper.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Implementation Gap Bridging',
      description: 'Identifies missing details like optimization tricks or exact data splits using inference and agent logic.'
    }
  ];

  return (
    <div className="flex flex-col items-center flex-grow py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto w-full max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-4xl mt-8 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
          <Sparkles size={14} />
          <span>Intelligent Paper Reproduction Engine</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
          Turn Research Papers into <br className="hidden sm:block" />
          <span className="text-indigo-400">Runnable Code</span>
        </h1>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload an arXiv URL or PDF. Our multi-agent system reads, deconstructs,
          and implements the core algorithms into a structured code framework.
        </p>

        {/* Input Form */}
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <BookOpen className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full pl-12 pr-32 py-4 bg-slate-800 border border-slate-700 rounded-xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition-all shadow-xl"
              placeholder="Paste arXiv link or PDF URL..."
              required
            />
            <button
              type="submit"
              className="absolute right-2 inset-y-2 px-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/30"
            >
              Start
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="mt-3 text-sm text-slate-500 flex items-center justify-center gap-2">
            <span>Example:</span>
            <button
              type="button"
              onClick={() => setUrl('https://arxiv.org/abs/1706.03762')}
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 decoration-indigo-400/30 transition-colors"
            >
              Attention Is All You Need
            </button>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8"
      >
        {features.map((feature, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-colors duration-300 flex flex-col items-start text-left">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 mb-4 shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </motion.div>

      {/* How it works */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5, duration: 0.5 }}
         className="mt-24 w-full text-center pb-12"
      >
        <h2 className="text-3xl font-bold text-slate-200 mb-12">The Reproduction Pipeline</h2>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 relative max-w-5xl mx-auto">
          {/* Connector line visible on desktop */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0"></div>

          {[
            { step: '1', title: 'Parse', desc: 'Agent reads and maps the paper architecture.' },
            { step: '2', title: 'Plan', desc: 'Identifies missing logic & hyperparameters.' },
            { step: '3', title: 'Code', desc: 'Generates robust, isolated functional blocks.' },
            { step: '4', title: 'Test', desc: 'Verifies single batch overfitting logic.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center relative z-10 w-full md:w-1/4 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-xl font-bold text-indigo-400 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">{item.title}</h4>
              <p className="text-slate-500 text-sm text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;