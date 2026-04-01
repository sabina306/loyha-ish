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
        <div className="flex flex-col h-full bg-[#1e1e1e]/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono flex items-center">
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
                        className="bg-[#1e1e1e]/50 text-gray-600 select-none text-right pr-4 pl-4 py-4 border-r border-white/5 overflow-hidden w-16 leading-relaxed font-medium"
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
                        className="flex-1 bg-transparent border-0 outline-none text-gray-300 resize-none h-full py-4 pr-4 pl-4 leading-relaxed focus:ring-0 overflow-auto custom-scrollbar"
                        spellCheck="false"
                        wrap="off"
                    />
                </div>
            </div>

            <div className="bg-[#007acc]/90 backdrop-blur text-white px-4 py-1.5 text-[10px] font-medium tracking-wide flex justify-between items-center border-t border-white/5">
                <div className="flex space-x-4">
                    <span>PHP 8.2</span>
                    <span>UTF-8</span>
                </div>
                <span>Ln {lines}, Col 1</span>
            </div>
        </div>
    );
};

export default CodeEditor;
