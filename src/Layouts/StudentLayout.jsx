import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, LogOut, Menu, X, Twitter, Github, Linkedin } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// --- DATA ---
const studentNavLinks = [
    { href: "", text: "Dashboard" },
    { href: "roadmap", text: "Roadmap" },
    { href: "markingsystem", text: "Grades" },
    { href: "seniorsexp", text: "Seniors Experience" },
];

const mobileNavVariants = {
    hidden: {
        y: "-100%",
        opacity: 0,
        transition: { duration: 0.4, ease: "easeInOut" }
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const mobileLinkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { ease: "easeOut" } }
};


// --- LAYOUT COMPONENTS ---

const StudentHeader = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        console.log("Logout clicked");
        navigate('/login');
    };

    const handleNavigate = (path) => {
        setIsOpen(false);
        console.log(`Navigating to ${path}`);
        navigate(`/student/${path}`);
    }

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm"
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
                                {studentNavLinks.map(link => (
                                    <Link to={`/student/${link.href}`} className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
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

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileNavVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
                    >
                        <motion.button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-7 right-4"
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>
                        <nav className="flex flex-col items-center gap-10">
                            {studentNavLinks.map(link => (
                                <motion.a
                                    key={link.text}
                                    href={link.href}
                                    onClick={() => handleNavigate(link.href)}
                                    variants={mobileLinkVariants}
                                    className="font-serif text-4xl text-gray-900"
                                >
                                    {link.text}
                                </motion.a>
                            ))}
                             <motion.button
                                variants={mobileLinkVariants}
                                onClick={handleLogout}
                                className="flex items-center gap-3 text-red-600 font-semibold text-2xl mt-8"
                            >
                                <LogOut className="w-7 h-7" />
                                <span>Logout</span>
                            </motion.button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
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


// --- MAIN LAYOUT COMPONENT ---
// This is the component you will use to wrap your student pages.
// Example Usage:
// <StudentLayout>
//   <h1>My Dashboard</h1>
//   <p>Page content goes here...</p>
// </StudentLayout>

export default function StudentLayout() {
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
