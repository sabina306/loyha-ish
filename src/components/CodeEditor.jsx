import React from 'react';

const CodeEditor = ({ code, onChange }) => {
    const textareaRef = React.useRef(null);
    const lineNumbersRef = React.useRef(null);

    const handleScroll = (e) => {
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const lines = code.split('\n').length;
    const lineNumbers = Array.from({ length: Math.max(lines, 15) }, (_, i) => i + 1);

    return (
        <div className="flex flex-col h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl ring-1 ring-slate-100">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center font-bold tracking-wider">
                        <span className="text-brand-primary mr-1">⚡</span>
                        index.php
                    </span>
                </div>
            </div>

            <div className="flex-1 relative font-mono text-sm overflow-hidden" onClick={() => textareaRef.current?.focus()}>
                <div className="absolute inset-0 flex">
                    {/* Line Numbers */}
                    <div
                        ref={lineNumbersRef}
                        className="bg-slate-50/50 text-slate-400 select-none text-right pr-4 pl-4 py-4 border-r border-slate-200 dark:border-slate-700 overflow-hidden w-16 leading-relaxed font-bold"
                    >
                        {lineNumbers.map(num => (
                            <div key={num}>{num}</div>
                        ))}
                    </div>

                    {/* TextArea */}
                    <textarea
                        id="code-textarea"
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => onChange(e.target.value)}
                        onScroll={handleScroll}
                        className="flex-1 bg-transparent border-0 outline-none text-slate-800 dark:text-gray-200 font-bold resize-none h-full py-4 pr-4 pl-4 leading-relaxed focus:ring-0 overflow-auto custom-scrollbar"
                        spellCheck="false"
                        wrap="off"
                    />
                </div>
            </div>

            <div className="bg-brand-primary/10 backdrop-blur text-brand-primary px-4 py-2 text-[10px] font-bold tracking-wider flex justify-between items-center border-t border-brand-primary/20">
                <div className="flex space-x-4">
                    <span className="bg-white/50 px-2 rounded-md">PHP 8.2</span>
                    <span className="bg-white/50 px-2 rounded-md">UTF-8</span>
                </div>
                <span className="bg-white/50 px-2 rounded-md">Ln {lines}, Col 1</span>
            </div>
        </div>
    );
};

export default CodeEditor;
