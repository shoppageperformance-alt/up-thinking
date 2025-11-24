import React from 'react';

const LoadingView: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-12 text-center">
      <div className="relative inline-flex mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 blur-md animate-pulse"></div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Ascending Dimensions...</h3>
      <p className="text-slate-400 max-w-md mx-auto">
        Applying System 2 thinking, deconstructing the problem, and generating visual synthesis.
      </p>
      <div className="flex justify-center gap-2 mt-6">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-0"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-100"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingView;
