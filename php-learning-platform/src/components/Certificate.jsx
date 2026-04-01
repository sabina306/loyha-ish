import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Hash, Download } from 'lucide-react';

const Certificate = ({ userName, completionDate, certificateId, onDownload }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-2xl"
            id="certificate"
        >
            {/* Decorative Border */}
            <div className="absolute inset-0 border-8 border-double border-yellow-600 rounded-2xl pointer-events-none" />
            <div className="absolute inset-4 border-2 border-yellow-400 rounded-xl pointer-events-none" />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                {/* Header */}
                <div className="mb-8">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                            <Award size={48} className="text-white" />
                        </div>
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">PHPMaster Platform</h1>
                    <p className="text-gray-600 text-sm uppercase tracking-widest">Ta'lim Platformasi</p>
                </div>

                {/* Title */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
                        SERTIFIKAT
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full" />
                </motion.div>

                {/* Body */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-12"
                >
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                        Ushbu sertifikat tasdiqlaydiki
                    </p>

                    <div className="mb-8 px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <h3 className="text-3xl font-bold text-gray-800">
                            {userName}
                        </h3>
                    </div>

                    <p className="text-gray-700 text-lg mb-4">
                        <strong className="text-gray-900">"PHP Dasturlash Tili - To'liq Kurs"</strong> ni
                    </p>
                    <p className="text-gray-700 text-lg mb-8">
                        muvaffaqiyatli tugatdi va 60 ta darsni o'zlashtirib oldi
                    </p>

                    <div className="flex justify-center items-center space-x-8 text-gray-600">
                        <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-blue-600" />
                            <span className="text-sm">
                                <strong>Sana:</strong> {completionDate}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Hash size={18} className="text-purple-600" />
                            <span className="text-sm">
                                <strong>Sertifikat №:</strong> {certificateId}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-8 border-t border-gray-300"
                >
                    <div className="flex justify-between items-center">
                        <div className="text-left">
                            <div className="h-16 w-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-white font-bold text-xl">PHPMaster</span>
                            </div>
                            <p className="text-xs text-gray-500">Platform Imzosi</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Tasdiqlangan</p>
                            <p className="text-xs text-gray-500">phpmaster.uz</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Certificate;
