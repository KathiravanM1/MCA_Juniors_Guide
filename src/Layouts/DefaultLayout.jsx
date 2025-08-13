import { motion } from 'framer-motion';
import { GraduationCap, Menu, Twitter, Github, Linkedin } from 'lucide-react';
import { Outlet } from 'react-router-dom';


const StudentHeader = () => {

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-lg shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Left Side: Logo and App Name */}
                        <a href="#" className="flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-gray-800" />
                            <span className="font-serif text-2xl font-bold text-gray-900">Vidivu</span>
                        </a>

                        {/* Right Side: Desktop Navigation and Logout */}
                        <div className="hidden md:flex items-center gap-8">
                            <nav className="flex items-center gap-8">
                                <a href='/login' className="text-black-500 hover:text-gray-900">Login</a>
                                <a href='/signup' className="text-black-500 hover:text-gray-900">Sign Up</a>
                            </nav>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
                                <Menu className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>
        </>
    );
};

const StudentFooter = () => {
    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 border-t border-gray-200"
        >
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="#" className="text-gray-500 hover:text-gray-900"><Twitter /></a>
                    <a href="#" className="text-gray-500 hover:text-gray-900"><Github /></a>
                    <a href="#" className="text-gray-500 hover:text-gray-900"><Linkedin /></a>
                </div>
                <p className="font-mono text-sm text-gray-500">&copy; {new Date().getFullYear()} Vidivu. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};


export default function DefaultLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
             <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@400;500;700&display=swap');
                body { font-family: 'Space Grotesk', sans-serif; }
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-space { font-family: 'Space Grotesk', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }
            `}</style>
            
            <StudentHeader />
            <main className="flex-grow pt-20">
                <div className="max-w-10xl mx-auto" style={{background: 'linear-gradient(135deg, #ECFAE5 0%, #DDF6D2 100%)'}}>
                    <Outlet/>
                </div>
            </main>

            <StudentFooter />
        </div>
    );
}
