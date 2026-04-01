import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles } from 'lucide-react';

const CertificateNameModal = ({ isOpen, onClose, onSubmit }) => {
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!fullName || fullName.trim().length < 3) {
            setError('Ism va familiyangizni to\'liq kiriting');
            return;
        }

        onSubmit(fullName.trim());
        setFullName('');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-2xl border border-white/10 p-8"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-pulse">
                                <Award size={32} className="text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Tabriklaymiz! 🎉
                        </h2>
                        <p className="text-gray-400">
                            Siz barcha 60 ta darsni muvaffaqiyatli tugatdingiz!
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Sertifikatga yozilishi uchun to'liq FIO kiriting
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ism Familiya"
                                className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                                autoFocus
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Bu ism sertifikatingizda ko'rsatiladi
                            </p>
                        </div>

                        {error && (
                            <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            Sertifikatni Olish
                        </button>
                    </form>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
                        <Sparkles className="absolute top-10 right-10 text-yellow-400 opacity-20" size={24} />
                        <Sparkles className="absolute bottom-10 left-10 text-orange-400 opacity-20" size={20} />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CertificateNameModal;
