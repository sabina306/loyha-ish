import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Code, BookOpen, Lightbulb, Zap } from 'lucide-react';

const AIChatPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: "Salom! Men sizning PHP o'rganishda yordamchingizman 🤖. Men sizga quyidagilarda yordam bera olaman:\n\n• PHP sintaksisi va asoslari\n• Kod xatolarini tuzatish\n• Best practices va maslahatlar\n• Ma'lumotlar bazasi bilan ishlash\n• OOP tushunchalari\n\nSavol bering, men yordam beraman! 💡"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const quickQuestions = [
        { icon: Code, text: "PHP da array qanday yaratiladi?", color: "from-blue-500 to-cyan-500" },
        { icon: BookOpen, text: "function va method farqi nima?", color: "from-purple-500 to-pink-500" },
        { icon: Lightbulb, text: "Ma'lumotlar bazasiga qanday ulanaman?", color: "from-green-500 to-emerald-500" },
        { icon: Zap, text: "OOP nima va nima uchun kerak?", color: "from-orange-500 to-red-500" }
    ];

    const generateAIResponse = (userQuestion) => {
        const responses = {
            'array': "PHP da array yaratishning bir necha usuli bor:\n\n```php\n// 1-usul: array() funksiyasi\n$colors = array('qizil', 'yashil', 'ko'k');\n\n// 2-usul: qisqa sintaksis []\n$fruits = ['olma', 'banan', 'apelsin'];\n\n// Associative array\n$user = [\n    'ism' => 'Ali',\n    'yosh' => 25,\n    'shahar' => 'Toshkent'\n];\n```\n\nArrayga element qo'shish:\n```php\n$fruits[] = 'uzum'; // oxiriga\narray_push($fruits, 'shaftoli'); // funksiya orqali\n```",
            'function': "Function va method o'rtasidagi farq:\n\n**Function** - mustaqil kod bloki:\n```php\nfunction salom($ism) {\n    return \"Salom, $ism!\";\n}\n```\n\n**Method** - class ichidagi function:\n```php\nclass Greeting {\n    public function salom($ism) {\n        return \"Salom, $ism!\";\n    }\n}\n\n// Ishlatish\n$obj = new Greeting();\necho $obj->salom('Ali');\n```\n\nAsosiy farq: Method - bu class bilan bog'langan function!",
            'database': "Ma'lumotlar bazasiga ulanish (PDO bilan):\n\n```php\ntry {\n    $pdo = new PDO(\n        'mysql:host=localhost;dbname=test',\n        'username',\n        'password'\n    );\n    \n    // Xatolarni ko'rsatish\n    $pdo->setAttribute(\n        PDO::ATTR_ERRMODE,\n        PDO::ERRMODE_EXCEPTION\n    );\n    \n    echo \"Muvaffaqiyatli ulandi!\";\n} catch(PDOException $e) {\n    echo \"Xato: \" . $e->getMessage();\n}\n```\n\nMa'lumot olish:\n```php\n$stmt = $pdo->query(\"SELECT * FROM users\");\n$users = $stmt->fetchAll();\n```",
            'oop': "OOP (Object-Oriented Programming) - bu dasturlashning ob'ektga yo'naltirilgan uslubi.\n\n**Nima uchun kerak?**\n• Kodni qayta ishlatish (reusability)\n• Tashkiliy struktura\n• Oson saqlash (maintainability)\n• Real dunyoni modellashtirish\n\n**Asosiy tushunchalar:**\n```php\nclass Car {\n    // Properties (xususiyatlar)\n    public $color;\n    public $model;\n    \n    // Constructor\n    public function __construct($color, $model) {\n        $this->color = $color;\n        $this->model = $model;\n    }\n    \n    // Methods (amallar)\n    public function drive() {\n        return \"$this->model haydab ketyapti!\";\n    }\n}\n\n// Obyekt yaratish\n$myCar = new Car('qizil', 'Tesla');\necho $myCar->drive();\n```"
        };

        const lowerQuestion = userQuestion.toLowerCase();
        if (lowerQuestion.includes('array')) return responses.array;
        if (lowerQuestion.includes('function') || lowerQuestion.includes('method')) return responses.function;
        if (lowerQuestion.includes('baza') || lowerQuestion.includes('database')) return responses.database;
        if (lowerQuestion.includes('oop') || lowerQuestion.includes('class')) return responses.oop;

        return "Bu juda qiziq savol! Men sizga ko'proq aniq javob berish uchun, iltimos savolingizni biroz batafsil yozing. Masalan:\n\n• PHP da qanday qilib...\n• ... xatosi qanday tuzatiladi?\n• ... kod to'g'ri ishlamayapti, nima qilish kerak?\n\nYoki yuqoridagi tezkor savollardan birini tanlang! 😊";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: input
        };
        setMessages([...messages, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                type: 'ai',
                text: generateAIResponse(input)
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleQuickQuestion = (question) => {
        setInput(question);
        // Auto-send after a brief moment
        setTimeout(() => {
            handleSend();
        }, 100);
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-20 pb-8 px-4">
            <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-center"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent mb-4">
                        <Sparkles size={16} className="mr-2" />
                        <span className="text-sm font-medium">AI Yordamchi</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        PHP o'rganishda sizga yordam beramiz
                    </h1>
                    <p className="text-gray-400">Savollaringizni bering, biz javob beramiz! 🚀</p>
                </motion.div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                    >
                        {quickQuestions.map((q, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickQuestion(q.text)}
                                className="group relative bg-[#1e293b] border border-white/10 rounded-xl p-4 text-left hover:border-brand-primary/50 transition-all overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${q.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />
                                <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${q.color} bg-opacity-10`}>
                                        <q.icon size={20} className="text-white" />
                                    </div>
                                    <span className="text-gray-300 text-sm">{q.text}</span>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Chat Messages */}
                <div className="flex-1 bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start space-x-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <div className={`p-2 rounded-xl ${msg.type === 'ai' ? 'bg-brand-primary/20' : 'bg-brand-secondary/20'}`}>
                                        {msg.type === 'ai' ? <Bot size={20} className="text-brand-primary" /> : <User size={20} className="text-brand-secondary" />}
                                    </div>
                                    <div className={`rounded-2xl p-4 ${msg.type === 'ai' ? 'bg-[#0f172a]' : 'bg-gradient-to-r from-brand-primary to-brand-secondary'}`}>
                                        <p className="text-white whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-3 max-w-3xl">
                                    <div className="p-2 rounded-xl bg-brand-primary/20">
                                        <Bot size={20} className="text-brand-primary" />
                                    </div>
                                    <div className="rounded-2xl p-4 bg-[#0f172a]">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-[#0f172a]">
                        <div className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Savolingizni yozing..."
                                className="flex-1 bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="p-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl hover:shadow-lg hover:shadow-brand-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatPage;
