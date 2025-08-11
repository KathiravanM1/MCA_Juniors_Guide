import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, BookOpen, FileText, Lightbulb, Zap, Target, Sparkles, Menu, X, Github, Twitter, Linkedin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function AnimatedBackground() {
    return (
        <motion.div
            className="absolute inset-0 z-0"
            style={{
                background: 'linear-gradient(120deg, #ECFAE5, #DDF6D2, #ECFAE5)',
                backgroundSize: '200% 200%',
            }}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
            }}
        />
    );
}


const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const wordContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 120 },
    },
};

const bentoBoxVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
};

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



const features = [
    { id: 'tech-roadmap', icon: Rocket, title: 'Tech Roadmap', description: 'Navigate your learning journey with curated paths designed by industry experts. From foundational concepts to advanced specializations, we provide a clear route to mastery.', highlight: '50+ Learning Paths', className: '', bgColor: 'bg-green-50', iconColor: 'text-green-600', subFeatures: ['Step-by-step guides', 'Beginner to advanced topics', 'Specialized career tracks'] },
    { id: 'academic-resources', icon: BookOpen, title: 'Academic Resources', description: 'Gain access to a vast library of premium study materials. Find comprehensive notes, e-books, and presentations for every subject in your curriculum.', highlight: '1000+ Resources', className: '', bgColor: 'bg-blue-50', iconColor: 'text-blue-600', subFeatures: ['Subject-wise notes', 'Curated e-book library', 'Presentation slides'] },
    { id: 'past-papers', icon: FileText, title: 'Past Papers', description: 'Prepare for exams with an extensive collection of previous year question papers. Understand patterns, manage your time, and ace your assessments.', highlight: '5 Years Coverage', className: '', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600', subFeatures: ['All major subjects covered', 'Detailed solution keys', 'Time-based practice sets'] },
    { id: 'problem-solving', icon: Lightbulb, title: 'Problem-Solving Patterns', description: 'Master the art of algorithmic thinking. Our curated collection of problem-solving patterns will equip you to tackle any coding challenge with confidence.', highlight: '200+ Patterns', className: '', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', subFeatures: ['Data structures patterns', 'Algorithmic techniques', 'Company-wise questions'] },
    { id: 'project-guide', icon: Zap, title: 'Project Guide', description: 'Receive end-to-end guidance for building impactful projects. From ideation and design to deployment and presentation, we support you at every step.', highlight: 'Live Mentorship', className: '', bgColor: 'bg-rose-50', iconColor: 'text-rose-600', subFeatures: ['Project idea repository', 'Code review sessions', 'Deployment assistance'] },
    { id: 'interview-experiences', icon: Target, title: 'Interview Experiences', description: 'Learn from the best. Read through hundreds of real interview stories and preparation tips shared by seniors and alumni from top companies.', highlight: '300+ Experiences', className: '', bgColor: 'bg-indigo-50', iconColor: 'text-indigo-600', subFeatures: ['Company-specific experiences', 'Technical & HR round insights', 'Salary negotiation tips'] }
];

const navLinks = [
    { href: "#features", text: "Features" },
    { href: "#tech-roadmap", text: "Roadmaps" },
    { href: "#academic-resources", text: "Academics" },
    { href: "#interview-experiences", text: "Interviews" },
];



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#ECFAE5] backdrop-blur-lg"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#" className="font-serif text-2xl font-bold text-gray-900">Padida Parama</a>
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className="text-gray-700 hover:text-gray-900 transition-colors font-medium">{link.text}</a>
                            ))}
                        </nav>
                        <div className="md:hidden">
                            <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
                                <Menu className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileNavVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-40 bg-[#ECFAE5] flex flex-col items-center justify-center"
                    >
                        <motion.button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-7 right-4"
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>
                        <nav className="flex flex-col items-center gap-10">
                            {navLinks.map(link => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    variants={mobileLinkVariants}
                                    className="font-serif text-4xl text-gray-900"
                                >
                                    {link.text}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const BentoBox = ({ className, children }) => {
    return (
        <motion.div
            variants={bentoBoxVariants}
            whileHover={{ 
                translateY: -8, 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative flex flex-col justify-between p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-lg h-full`}
        >
            {children}
        </motion.div>
    );
};

const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    return (
        <>
            <div className="flex-grow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bgColor}`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="mt-4 text-xl font-bold font-space text-gray-800">{feature.title}</h3>
                <p className="mt-2 text-gray-600 font-sans leading-relaxed">{feature.description}</p>
            </div>
            <div className="mt-6">
                <p className="font-mono text-sm text-gray-500 bg-gray-100/80 px-3 py-1 rounded-full inline-block">
                    {feature.highlight}
                </p>
            </div>
        </>
    );
};


const FeatureRow = ({ feature, index }) => {
    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            id={feature.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 ${isReversed ? 'md:flex-row-reverse' : ''}`}
        >
           
            <div className="md:w-1/2 lg:w-2/5">
                <div className="relative">
                     <div className={`absolute -left-4 top-1 h-8 w-1 ${feature.bgColor.replace('bg-', 'bg-')}`} style={{ backgroundColor: `var(--${feature.iconColor.replace('text-','color-')})` }}></div>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">{feature.description}</p>
                <ul className="mt-6 space-y-3">
                    {feature.subFeatures.map((sub, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <CheckCircle className={`w-5 h-5 ${feature.iconColor}`} />
                            <span className="text-gray-700">{sub}</span>
                        </li>
                    ))}
                </ul>
            </div>

           
            <div className="w-full md:w-1/2 lg:w-3/5">
                <BentoBox>
                    <FeatureCard feature={feature} />
                </BentoBox>
            </div>
        </motion.div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-transparent py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="font-serif text-2xl font-bold text-gray-900">Padida Parama</h3>
                        <p className="mt-2 text-gray-600 text-sm">Your academic and career navigator.</p>
                    </div>
                    <div className="col-span-1">
                        <h4 className="font-bold text-gray-800 mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#tech-roadmap" className="text-gray-600 hover:text-gray-900">Tech Roadmaps</a></li>
                            <li><a href="#academic-resources" className="text-gray-600 hover:text-gray-900">Academics</a></li>
                            <li><a href="#project-guide" className="text-gray-600 hover:text-gray-900">Project Guides</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h4 className="font-bold text-gray-800 mb-4">Preparation</h4>
                        <ul className="space-y-2">
                            <li><a href="#past-papers" className="text-gray-600 hover:text-gray-900">Past Papers</a></li>
                            <li><a href="#problem-solving" className="text-gray-600 hover:text-gray-900">Patterns</a></li>
                            <li><a href="#interview-experiences" className="text-gray-600 hover:text-gray-900">Interviews</a></li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-bold text-gray-800 mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-500 hover:text-gray-900"><Twitter /></a>
                            <a href="#" className="text-gray-500 hover:text-gray-900"><Github /></a>
                            <a href="#" className="text-gray-500 hover:text-gray-900"><Linkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
                    <p className="font-mono text-sm">&copy; {new Date().getFullYear()} MCA Senior Batch. Crafted with ❤️ for our juniors.</p>
                </div>
            </div>
        </footer>
    );
};



export default function App() {

    const headline = "Innaila Irunthu Vidivu Kaalam";
    const subHeadline = "daw Unaku";

    return (
        <div className="min-h-screen bg-[#ECFAE5] font-sans text-gray-800 overflow-x-hidden">
             <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@400;500;700&display=swap');
                body { font-family: 'Space Grotesk', sans-serif; scroll-behavior: smooth; }
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-space { font-family: 'Space Grotesk', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }
                :root {
                    --color-green-600: #16a34a;
                    --color-blue-600: #2563eb;
                    --color-yellow-600: #ca8a04;
                    --color-purple-600: #9333ea;
                    --color-rose-600: #e11d48;
                    --color-indigo-600: #4f46e5;
                }
            `}
            </style>
            
            <AnimatedBackground />
            <Header />

            <div className="relative z-10">
               
                <motion.header 
                    initial="hidden"
                    animate="visible"
                    variants={heroContainerVariants}
                    className="pt-40 pb-24 sm:pt-48 sm:pb-32 text-center"
                >
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <motion.h1 
                            variants={wordContainerVariants}
                            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif leading-tight text-gray-900"
                        >
                            {headline.split().map((word, index) => (
                                <motion.span key={index} variants={wordVariants} className="inline-block">
                                    {word}{' '}
                                </motion.span>
                            ))}
                            <motion.span 
                                variants={wordContainerVariants}
                                className="block text-gray-500 italic text-3xl sm:text-5xl mt-2"
                            >
                                {subHeadline.split().map((word, index) => (
                                    <motion.span key={index} variants={wordVariants} className="inline-block">
                                        {word}{' '}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </motion.h1>

                        <motion.p variants={wordVariants} className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-space">
                            Built by <span className="font-bold text-gray-900">MCA seniors</span> for juniors – your comprehensive academic and career navigator, designed with love and expertise.
                        </motion.p>
                        <motion.div variants={wordVariants} className="mt-10 flex items-center justify-center gap-4">
                          <Link to={"/login"}>
                            <motion.button 
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-800 px-8 py-4 font-bold text-white shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded-full bg-white/10 transition-all duration-500 ease-in-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                    Start Your Journey
                                </span>
                            </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.header>

               
                <main id="features" className="py-16 sm:py-24 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 md:mb-24">
                             <h2 className="text-3xl sm:text-5xl font-bold font-serif text-gray-900">Everything You Need, All in One Place</h2>
                             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated resources designed to help you succeed academically and professionally.</p>
                        </div>
                        <div className="flex flex-col gap-24 md:gap-32">
                           {features.map((feature, index) => (
                                <FeatureRow key={feature.id} feature={feature} index={index} />
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
