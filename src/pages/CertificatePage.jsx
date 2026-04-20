import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, Home, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import Certificate from '../components/Certificate';

const CertificatePage = () => {
    const { user } = useAuth();
    const { completedLessons, getCertificateData } = useProgress();
    const navigate = useNavigate();
    const certificateRef = useRef(null);

    // Check if user has earned certificate
    const hasCertificate = completedLessons.length >= 60;

    if (!hasCertificate) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-xl shadow-brand-primary/5 border border-slate-200 dark:border-slate-700"
                >
                    <Award size={64} className="text-slate-400 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-4">Sertifikat hali olinmagan</h2>
                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">
                        Sertifikat olish uchun barcha 60 ta darsni tugating
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">
                        Joriy progress: {completedLessons.length} / 60
                    </p>
                    <Link
                        to="/courses"
                        className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all inline-block"
                    >
                        Darslarni Davom Ettirish
                    </Link>
                </motion.div>
            </div>
        );
    }

    const certificateData = getCertificateData();

    // Get full name from certificate storage
    const certificateKey = user?.email ? `phpmaster_certificate_${user.email}` : null;
    const storedCertificate = certificateKey ? localStorage.getItem(certificateKey) : null;
    const certificateName = storedCertificate ? JSON.parse(storedCertificate).fullName : null;
    const userName = certificateName || user?.email?.split('@')[0] || 'Foydalanuvchi';

    const handleDownload = () => {
        // Use browser's print dialog to save as PDF
        window.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-12 px-4">
            {/* Celebration Banner */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex justify-center mb-4">
                    <Sparkles size={48} className="text-yellow-500 animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Tabriklaymiz! 🎉
                </h1>
                <p className="text-xl text-gray-600">
                    Siz PHP kursini muvaffaqiyatli yakunladingiz!
                </p>
            </motion.div>

            {/* Certificate */}
            <div ref={certificateRef} className="mb-12">
                <Certificate
                    userName={userName}
                    completionDate={certificateData.completionDate}
                    certificateId={certificateData.certificateId}
                />
            </div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
            >
                <button
                    onClick={handleDownload}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center space-x-2"
                >
                    <Download size={20} />
                    <span>Sertifikatni Yuklab Olish</span>
                </button>

                <Link
                    to="/"
                    className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-bold rounded-xl hover:shadow-lg transition-all flex items-center space-x-2 border-2 border-gray-200"
                >
                    <Home size={20} />
                    <span>Bosh Sahifa</span>
                </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <p className="text-4xl font-bold text-blue-600 mb-2">60</p>
                    <p className="text-gray-600">Darslar Tugatildi</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <p className="text-4xl font-bold text-purple-600 mb-2">100%</p>
                    <p className="text-gray-600">Tugallangan</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
                    <p className="text-4xl font-bold text-green-600 mb-2">1</p>
                    <p className="text-gray-600">Sertifikat Olindi</p>
                </div>
            </motion.div>
        </div>
    );
};

export default CertificatePage;
