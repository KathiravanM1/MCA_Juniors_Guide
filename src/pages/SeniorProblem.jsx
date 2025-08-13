import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, CheckCircle, Loader, Star } from 'lucide-react';

// --- MAIN COMPONENT ---
export default function PostProblemPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty: "Easy",
        category: "topics",
        subCategory: "",
        tags: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call to the backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would send this data to your database
        console.log("New Problem Submitted:", {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()) // Convert tags string to array
        });

        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset form and success message after a delay
        setTimeout(() => {
            setFormData({ title: "", description: "", difficulty: "Easy", category: "topics", subCategory: "", tags: "" });
            setSubmitted(false);
        }, 4000);
    };

    // --- Data for dropdowns ---
    const categories = {
        topics: ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "DP"],
        company: ["Google", "Amazon", "Microsoft", "Facebook", "Netflix"],
        language: ["Python", "JavaScript", "C++", "Java"],
        domain: ["AI/ML", "Cybersecurity", "System Design", "Web Development"]
    };

    const difficultyColors = { Easy: 'bg-green-100 text-green-800', Medium: 'bg-yellow-100 text-yellow-800', Hard: 'bg-red-100 text-red-800' };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Space+Grotesk:wght@400;500;700&display=swap');
                body { font-family: 'Space Grotesk', sans-serif; }
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">Post a New Problem</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Share your interview experience and help juniors prepare for their dream jobs.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Form */}
                    <div className="lg:w-1/2 w-full">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center p-8 bg-green-50 rounded-2xl border border-green-200 h-full flex flex-col justify-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h2 className="font-serif text-2xl font-bold text-gray-900">Problem Submitted!</h2>
                                    <p className="mt-2 text-gray-600">Thank you for your contribution. The problem is now available for students.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Problem Title</label>
                                        <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Two Sum" />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea name="description" id="description" required rows="6" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Provide a clear and concise description of the problem..."></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="difficulty" className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                                            <select name="difficulty" id="difficulty" required value={formData.difficulty} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                <option>Easy</option>
                                                <option>Medium</option>
                                                <option>Hard</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">Main Category</label>
                                            <select name="category" id="category" required value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                <option value="topics">Topic</option>
                                                <option value="company">Company</option>
                                                <option value="language">Language</option>
                                                <option value="domain">Domain</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="subCategory" className="block text-sm font-bold text-gray-700 mb-2">Specific {formData.category.slice(0,-1)}</label>
                                        <input type="text" name="subCategory" id="subCategory" required value={formData.subCategory} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder={`e.g., ${formData.category === 'topics' ? 'Arrays' : formData.category === 'company' ? 'Google' : formData.category === 'language' ? 'Python' : 'AI/ML'}`} />
                                    </div>

                                     <div>
                                        <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-2">Tags (comma-separated)</label>
                                        <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Array, Hash Table" />
                                    </div>

                                    <div>
                                        <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 px-4 py-4 font-bold text-white bg-gray-800 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all transform hover:scale-105">
                                            {isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
                                            {isSubmitting ? "Submitting Problem..." : "Post Problem"}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Live Preview */}
                    <div className="lg:w-1/2 w-full">
                        <div className="sticky top-28">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center lg:text-left">Live Preview</h3>
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <Star className="w-6 h-6 text-yellow-400" />
                                    <p className="font-inter text-sm font-semibold tracking-wider uppercase text-yellow-400">Featured Problem</p>
                                </div>
                                <h3 className="font-space font-bold text-2xl min-h-[32px]">{formData.title || "Problem Title"}</h3>
                                <p className="font-inter text-base mt-2 opacity-80 leading-relaxed min-h-[48px] line-clamp-2">{formData.description || "A preview of the problem description will appear here."}</p>
                                 <div className={`mt-4 text-sm font-medium px-2 py-0.5 rounded-full inline-block ${difficultyColors[formData.difficulty]}`}>{formData.difficulty}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
