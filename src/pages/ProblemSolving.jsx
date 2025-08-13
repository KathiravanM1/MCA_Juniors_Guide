import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Building, Code, Database, Star, Loader, ChevronDown, X } from 'lucide-react';

// --- MOCK BACKEND API & ENHANCED DATA STRUCTURE ---
// The data is now nested to support sub-categories (e.g., Company -> Google -> Problems)
const mockCategorizedProblems = {
    topics: {
        'Arrays': {
            featured: { id: 'topic_001', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.' },
            list: [ 
                { id: 'topic_005', title: 'Container With Most Water', difficulty: 'Medium', tags: ['Two Pointers', 'Array'], description: 'Find two lines that together with the x-axis form a container, such that the container contains the most water.' }, 
                { id: 'topic_006', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Binary Search', 'Array'], description: 'Find the median of two sorted arrays. The overall run time complexity should be O(log (m+n)).' } 
            ]
        },
        'Strings': {
            featured: { id: 'topic_004', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['Sliding Window', 'String'], description: 'Given a string `s`, find the length of the longest substring without repeating characters.' },
            list: [ 
                { id: 'topic_002', title: 'Valid Parentheses', difficulty: 'Easy', tags: ['Stack', 'String'], description: 'Determine if the input string of parentheses is valid.' } 
            ]
        },
        'Linked Lists': {
            featured: { id: 'topic_003', title: 'Merge Two Sorted Lists', difficulty: 'Easy', tags: ['Linked List', 'Recursion'], description: 'Merge two sorted linked lists and return it as a new sorted list.' },
            list: [
                { id: 'topic_007', title: 'Reverse a Linked List', difficulty: 'Easy', tags: ['Linked List'], description: 'Reverse a singly linked list.'}
            ]
        }
    },
    company: {
        'Google': {
            featured: { id: 'comp_001', title: 'LRU Cache', company: 'Google', difficulty: 'Medium', tags: ['Design', 'Hash Table'], description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.' },
            list: [ 
                { id: 'comp_005', title: 'Number of Islands', company: 'Google', difficulty: 'Medium', tags: ['DFS', 'BFS'], description: 'Given a 2D grid map of \'1\'s (land) and \'0\'s (water), count the number of islands.' } 
            ]
        },
        'Amazon': {
            featured: { id: 'comp_002', title: 'Product of Array Except Self', company: 'Amazon', difficulty: 'Medium', tags: ['Array', 'Prefix Sum'], description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.' },
            list: [ 
                { id: 'comp_006', title: 'Top K Frequent Elements', company: 'Amazon', difficulty: 'Medium', tags: ['Heap', 'Hash Table'], description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.' } 
            ]
        },
        'Microsoft': {
            featured: { id: 'comp_004', title: 'Serialize and Deserialize a Binary Tree', company: 'Microsoft', difficulty: 'Hard', tags: ['Tree', 'Design'], description: 'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization logic should work.' },
            list: [
                { id: 'comp_007', title: 'Validate Binary Search Tree', company: 'Microsoft', difficulty: 'Medium', tags: ['Tree', 'DFS'], description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).'}
            ]
        },
    },
    language: {
        'Python': {
            featured: { id: 'lang_001', title: 'Decorators in Python', language: 'Python', difficulty: 'Medium', tags: ['Functions', 'Metaprogramming'], description: 'Explain and implement a decorator that logs the execution time of a function.' },
            list: [
                { id: 'lang_003', title: 'Python List Comprehensions', language: 'Python', difficulty: 'Easy', tags: ['Data Structures'], description: 'Create a list of squares for numbers from 1 to 10 using a list comprehension.'}
            ]
        },
        'JavaScript': {
            featured: { id: 'lang_002', title: 'JavaScript Promises', language: 'JavaScript', difficulty: 'Easy', tags: ['Async', 'Callbacks'], description: 'Explain the concept of Promises in JavaScript and provide an example.' },
            list: [
                { id: 'lang_004', title: 'Closures in JavaScript', language: 'JavaScript', difficulty: 'Medium', tags: ['Functions', 'Scope'], description: 'Explain what a closure is in JavaScript and provide a simple example.'}
            ]
        },
    },
    domain: {
        'AI/ML': {
            featured: { id: 'dom_001', title: 'Implement a Neural Network', domain: 'AI/ML', difficulty: 'Hard', tags: ['Deep Learning', 'Math'], description: 'Build a simple feedforward neural network from scratch to classify handwritten digits from the MNIST dataset.' },
            list: [
                { id: 'dom_003', title: 'K-Nearest Neighbors Algorithm', domain: 'AI/ML', difficulty: 'Medium', tags: ['Classification', 'Algorithm'], description: 'Implement the K-Nearest Neighbors (KNN) algorithm from scratch.'}
            ]
        },
        'Cybersecurity': {
            featured: { id: 'dom_002', title: 'SQL Injection Prevention', domain: 'Cybersecurity', difficulty: 'Medium', tags: ['Security', 'SQL'], description: 'Explain what SQL Injection is and how to prevent it in a web application.' },
            list: [
                { id: 'dom_004', title: 'Cross-Site Scripting (XSS)', domain: 'Cybersecurity', difficulty: 'Medium', tags: ['Web Security'], description: 'Describe the difference between Stored and Reflected XSS attacks.'}
            ]
        },
    }
};

const useCategorizedProblems = () => {
    const [categorizedProblems, setCategorizedProblems] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCategorizedProblems(mockCategorizedProblems);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return { categorizedProblems, loading };
};

// --- STYLING & CONFIGURATION ---
const difficultyColors = { Easy: 'bg-green-100 text-green-800', Medium: 'bg-yellow-100 text-yellow-800', Hard: 'bg-red-100 text-red-800' };
const tabs = [
    { id: 'topics', label: 'Topics', icon: Book },
    { id: 'company', label: 'Company-Wise', icon: Building },
    { id: 'language', label: 'Language-Wise', icon: Code },
    { id: 'domain', label: 'Domain-Based', icon: Database },
];

// --- UI COMPONENTS ---

const ProblemListItem = ({ problem, onProblemClick }) => (
    <button onClick={() => onProblemClick(problem)} className="w-full text-left flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
        <div>
            <p className="font-bold text-gray-800">{problem.title}</p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{problem.description}</p>
        </div>
        <div className={`text-sm font-medium px-2 py-0.5 rounded-full self-start ${difficultyColors[problem.difficulty]}`}>{problem.difficulty}</div>
    </button>
);

const ProblemDisplay = ({ categoryData, onProblemClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredList = useMemo(() => {
        if (!categoryData || !categoryData.list) return [];
        return categoryData.list.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [categoryData, searchTerm]);

    if (!categoryData) return <div className="p-4 text-center">Select a category to see problems.</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search in this list..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                {filteredList.length > 0 ? (
                    filteredList.map(problem => <ProblemListItem key={problem.id} problem={problem} onProblemClick={onProblemClick} />)
                ) : (
                    <p className="p-4 text-center text-gray-500">No matching problems found.</p>
                )}
            </div>
        </motion.div>
    );
};

const ProblemModal = ({ problem, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-gray-900">{problem.title}</h2>
                            <div className={`mt-2 text-sm font-medium px-2 py-0.5 rounded-full inline-block ${difficultyColors[problem.difficulty]}`}>{problem.difficulty}</div>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function ProblemSolvingPlatform() {
    const { categorizedProblems, loading } = useCategorizedProblems();
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [viewingProblem, setViewingProblem] = useState(null);

    const subCategories = useMemo(() => {
        if (!categorizedProblems) return [];
        return Object.keys(categorizedProblems[activeTab] || {});
    }, [categorizedProblems, activeTab]);

    useEffect(() => {
        if (subCategories.length > 0) {
            setActiveSubCategory(subCategories[0]);
        } else {
            setActiveSubCategory(null);
        }
    }, [activeTab, subCategories]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader className="w-12 h-12 text-gray-400 animate-spin" /></div>;
    }

    const currentProblemData = categorizedProblems[activeTab]?.[activeSubCategory];

    return (
        <div className="min-h-screen bg-gradient-to-b from-#DDF6D2 to-white font-sans text-gray-800">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@400;500;700&display=swap');
                body { font-family: 'Space Grotesk', sans-serif; }
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-space { font-family: 'Space Grotesk', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }
            `}</style>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">Problem Solving Hub</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Explore challenges curated by seniors, categorized for your learning journey.</p>
                </div>
                <div className="border-b border-gray-200 mb-8">
                    <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
                        {tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap transition-colors`}><tab.icon className="mr-2 h-5 w-5" />{tab.label}</button>)}
                    </nav>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="md:hidden relative">
                            <select value={activeSubCategory || ''} onChange={(e) => setActiveSubCategory(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg appearance-none font-bold">
                                {subCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        <nav className="hidden md:block space-y-1">
                            {subCategories.map(sub => (
                                <button key={sub} onClick={() => setActiveSubCategory(sub)} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeSubCategory === sub ? 'bg-blue-100 text-green-800' : 'hover:bg-gray-100 text-gray-600'}`}>
                                    {sub}
                                </button>
                            ))}
                        </nav>
                    </aside>
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeSubCategory} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <ProblemDisplay categoryData={currentProblemData} onProblemClick={(problem) => setViewingProblem(problem)} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <AnimatePresence>
                {viewingProblem && (
                    <ProblemModal problem={viewingProblem} onClose={() => setViewingProblem(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
