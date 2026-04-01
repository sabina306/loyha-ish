
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Save, Share2, Terminal, Code as CodeIcon, Settings, Download } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';

const Playground = () => {
    const [code, setCode] = useState("<?php\n\n// PHP Kod yozish maydoni\n// Istalgan kodni yozing va 'Natijani Ko'rish' tugmasini bosing\n\necho 'Salom, Dunyo!';\n\n$ism = 'Dasturchi';\necho \"\\nMen $ism man!\";\n\n?>");
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setIsRunning(true);
        setOutput(''); // Clear previous output

        // Simulating server execution time
        setTimeout(() => {
            // Simple mock output generator based on code content
            let mockOutput = "";
            if (code.includes("echo")) {
                // Extract rudimentary strings (very basic parsing for demo)
                const echoMatches = code.match(/echo\s+['"](.+?)['"]/g);
                if (echoMatches) {
                    mockOutput = echoMatches.map(m => m.replace(/echo\s+['"]|['"]/g, '')).join('\n');
                } else if (code.includes("Salom")) {
                    mockOutput = "Salom, Dunyo!\nMen Dasturchi man!";
                } else {
                    mockOutput = "Kod muvaffaqiyatli ishga tushdi (Simulyatsiya).\nNatija: 1";
                }
            } else {
                mockOutput = "Kod bajarildi. Ekranga hech narsa chiqmadi.";
            }

            setOutput(mockOutput);
            setIsRunning(false);
        }, 800);
    };

    const handleReset = () => {
        setCode("<?php\n\n// PHP Kod yozish maydoni\n// Istalgan kodni yozing va 'Natijani Ko'rish' tugmasini bosing\n\necho 'Salom, Dunyo!';\n\n$ism = 'Dasturchi';\necho \"\\nMen $ism man!\";\n\n?>");
        setOutput('');
    };

    return (
        <div className="pt-4 pb-8 px-4 h-screen flex flex-col max-w-[1920px] mx-auto overflow-hidden">

            {/* Header / Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center mb-6 bg-[#1e293b] p-4 rounded-xl border border-white/10 shadow-xl"
            >
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="p-2 bg-brand-primary/20 rounded-lg text-brand-primary">
                        <CodeIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Kod Maydoni</h1>
                        <p className="text-xs text-gray-400">PHP 8.2 • Sandbox Mode</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleReset}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors tooltip-trigger"
                        title="Tozalash"
                    >
                        <RotateCcw size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Settings size={20} />
                    </button>
                    <div className="h-6 w-px bg-white/10 mx-2" />
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className={`
                            flex items-center px-6 py-2 rounded-lg font-bold text-white shadow-lg transition-all
                            ${isRunning
                                ? 'bg-gray-600 cursor-not-allowed opacity-70'
                                : 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-brand-primary/50 hover:scale-105 active:scale-95'
                            }
                        `}
                    >
                        {isRunning ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Bajarilmoqda...
                            </>
                        ) : (
                            <>
                                <Play size={18} className="mr-2 fill-current" />
                                Natijani Ko'rish
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">

                {/* Editor Pane */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col min-h-[400px] lg:h-full relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent rounded-2xl pointer-events-none" />
                    <CodeEditor code={code} onChange={setCode} />

                    {/* Decorative glow behind editor */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-2xl blur-xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
                </motion.div>

                {/* Output Pane */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:w-1/3 flex flex-col h-full bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b] border-b border-white/10">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <Terminal size={16} />
                            <span className="text-sm font-mono font-bold">Terminal Output</span>
                        </div>
                        <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto custom-scrollbar bg-[#0f172a]">
                        {output ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-green-400 whitespace-pre-wrap"
                            >
                                <span className="text-gray-500 select-none">$ php script.php</span>
                                <br />
                                {output}
                                <br />
                                <span className="text-gray-500 select-none mt-2 block">Process finished with exit code 0</span>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                                <Terminal size={48} className="mb-4 text-gray-600" />
                                <p>Kod natijasi shu yerda ko'rinadi</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Playground;
