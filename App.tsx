import React, { useState, useRef, useEffect } from 'react';
import InputArea from './components/InputArea';
import MarkdownViewer from './components/MarkdownViewer';
import LoadingView from './components/LoadingView';
import { analyzeTopic, generateTopicImage } from './services/geminiService';
import { BrainCircuit, Download, RotateCcw, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalysis = async (inputTopic: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setGeneratedImage(null);
    setTopic(inputTopic);

    try {
      // Parallel execution: Text analysis and Image generation
      // The image generation relies on the topic, not necessarily the full text analysis 
      // (though arguably better with it, speed is priority for UX here and the prompt format is standard)
      const [textResult, imageResult] = await Promise.all([
        analyzeTopic(inputTopic),
        generateTopicImage(inputTopic)
      ]);

      setAnalysis(textResult);
      setGeneratedImage(imageResult);
    } catch (err) {
      setError("An error occurred while connecting to the dimensional field. Please check your API key or connection.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (analysis && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [analysis]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-100 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-4 ring-1 ring-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <BrainCircuit className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Dimensional Thinker</h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Elevate your perspective. Analyze complex topics through deconstruction, abstraction, and systemic loop identification.
          </p>
        </header>

        {/* Input Section */}
        <div className={`${analysis ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'} transition-all duration-500`}>
             <InputArea onSubmit={handleAnalysis} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && <LoadingView />}

        {/* Error State */}
        {error && (
          <div className="max-w-3xl mx-auto p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-200 flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && analysis && (
          <main ref={resultRef} className="flex-grow animate-in fade-in slide-in-from-bottom-10 duration-700">
            
            {/* Control Bar */}
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                <button 
                  onClick={() => { setAnalysis(null); setGeneratedImage(null); setTopic(''); }}
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Analyze Another Topic
                </button>
                <div className="text-sm text-slate-500 font-mono">
                  TOPIC: {topic}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Main Analysis Column */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                   <div className="mb-4 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Analysis Stream</span>
                   </div>
                   <MarkdownViewer content={analysis} />
                </div>
              </div>

              {/* Sidebar: System Diagram Image */}
              <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-8">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80">
                      <div className="flex items-center justify-between">
                         <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">System Visualization</h3>
                         {generatedImage && (
                           <a 
                             href={generatedImage} 
                             download={`system-diagram-${topic.replace(/\s+/g, '-').toLowerCase()}.png`}
                             className="text-slate-500 hover:text-blue-400 transition-colors"
                             title="Download Image"
                           >
                             <Download className="w-4 h-4" />
                           </a>
                         )}
                      </div>
                    </div>
                    
                    <div className="aspect-square relative bg-slate-950 flex items-center justify-center p-2">
                      {generatedImage ? (
                        <img 
                          src={generatedImage} 
                          alt="System Diagram" 
                          className="w-full h-full object-contain rounded-lg border border-slate-800"
                        />
                      ) : (
                        <div className="text-center p-6">
                           <div className="w-full h-full border-2 border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-slate-600">
                              <BrainCircuit className="w-10 h-10 mb-2 opacity-20" />
                              <span className="text-xs">Generating Visualization...</span>
                              <span className="text-[10px] text-slate-700 mt-1">Wait or check input</span>
                           </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-slate-900/30 text-xs text-slate-500 leading-relaxed border-t border-slate-800">
                      AI Generated System Diagram for "{topic}". This visualization attempts to map the causal loops discussed in the analysis.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        <footer className="mt-auto py-8 text-center text-slate-600 text-sm">
          <p>Powered by Gemini 3 Pro & Gemini 2.5 Flash Image</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
