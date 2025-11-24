import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface InputAreaProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
        <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-colors shadow-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a topic for dimensional analysis (e.g., 'Procrastination', 'AI Evolution')"
            className="w-full bg-transparent text-white placeholder-slate-400 px-6 py-5 outline-none text-lg rounded-xl"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-3 p-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
              input.trim() && !isLoading
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <p className="text-slate-500 text-sm">
          Try topics like: <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => setInput("Why do we procrastinate?")}>Procrastination</span>, <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => setInput("The future of work")}>Future of Work</span>, <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => setInput("Information Anxiety")}>Information Anxiety</span>
        </p>
      </div>
    </div>
  );
};

export default InputArea;
