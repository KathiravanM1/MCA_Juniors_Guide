import React from 'react';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser } from 'react-icons/fi';
import ThreeJSBackground from './ThreeJSBackground';
import RoadmapCard from '../component/RoadMapCard.jsx'; // Importing our new card

// Using new, professional images and the expanded data structure
const roadmapData = [
  { id: 1, title: 'Machine Learning Engineer', description: 'Master model building, deployment, and MLOps with real-world projects.', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600', level: 'Intermediate', duration: '24 Weeks', modules: 15, rating: 4.8, reviews: 1250, tags: ['Python', 'TensorFlow', 'MLOps'] },
  { id: 2, title: 'Full-Stack Cloud Developer', description: 'Build scalable web apps with React, Node.js, and deploy them on AWS.', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600', level: 'Advanced', duration: '30 Weeks', modules: 22, rating: 4.9, reviews: 2130, tags: ['React', 'Node.js', 'AWS'] },
  { id: 3, title: 'DevOps & Site Reliability', description: 'Automate infrastructure and streamline deployments with Docker and Kubernetes.', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600', level: 'Intermediate', duration: '18 Weeks', modules: 12, rating: 4.7, reviews: 980, tags: ['Docker', 'Kubernetes', 'CI/CD'] },
  { id: 4, title: 'Cyber Security Analyst', description: 'Learn ethical hacking, penetration testing, and defensive security strategies.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600', level: 'Beginner', duration: '20 Weeks', modules: 18, rating: 4.6, reviews: 750, tags: ['Penetration Testing', 'Wireshark', 'Metasploit'] },
];


const Roadmaps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <div className="min-h-screen bg-light-green/40 text-gray-800 relative">
      <ThreeJSBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl sm:text-2xl font-bold font-space text-primary">Padidaw Parama</h1>
                            <button className="bg-secondary hover:bg-primary text-primary font-semibold py-2 px-4 sm:px-6 rounded-full transition-all duration-300 hover-lift">
                            Aarambikalaama
                            </button>
                        </div>
                    </div>
                </header>
        <h2 className="font-heading text-4xl font-bold mb-8 text-center">Explore Your Path</h2>

        {/* Roadmap Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {roadmapData.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Roadmaps;