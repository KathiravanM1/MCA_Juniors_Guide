import React from 'react';

// --- Data ---
// Project data now includes a 'domain' field.
const projects = [
    {
      id: 1,
      title: 'Kanban-Style Task Manager',
      domain: 'Fullstack',
      description: 'A modern, responsive task management application where users can visually organize their tasks. Features include user authentication, drag-and-drop functionality, and real-time updates using a MERN stack with Vite.',
      author: 'Jane Doe',
      githubUrl: 'https://github.com/example/kanban',
      deploymentUrl: 'https://kanban-demo.example.com'
    },
    {
      id: 2,
      title: 'Smart Plant Watering System',
      domain: 'IoT',
      description: 'An IoT system that monitors soil moisture and waters plants automatically. Data is sent to a cloud dashboard for remote monitoring, built with an ESP32 microcontroller and MicroPython.',
      author: 'John Smith',
      githubUrl: 'https://github.com/example/iot-plant',
      deploymentUrl: null // This project is not deployed
    },
    {
      id: 3,
      title: 'Movie Recommendation Engine',
      domain: 'Data Science',
      description: 'A Python-based system that suggests movies to users based on their viewing history. This project introduces the core concepts of collaborative filtering using Pandas and Scikit-learn.',
      author: 'Alex Ray',
      githubUrl: 'https://github.com/example/movie-recommender',
      deploymentUrl: null
    },
    {
      id: 4,
      title: 'Personal Blog & Portfolio',
      domain: 'Next.js',
      description: 'A lightning-fast, SEO-friendly personal website to showcase projects and write blog posts. Leverages Next.js\'s powerful server-side rendering and static site generation capabilities.',
      author: 'Sam Chen',
      githubUrl: 'https://github.com/example/portfolio-nextjs',
      deploymentUrl: 'https://samchen.example.dev'
    },
    {
      id: 5,
      title: 'E-commerce REST API',
      domain: 'Spring Boot',
      description: 'A robust backend for an e-commerce platform built with Java and Spring Boot. This API handles products, user accounts, shopping carts, and orders, providing a solid foundation for any client.',
      author: 'Maria Garcia',
      githubUrl: 'https://github.com/example/ecommerce-api',
      deploymentUrl: 'https://api.ecommerce.example.com/docs'
    }
];


// --- Components ---

// A single, self-contained card for each project.
const ProjectCard = ({ title, description, domain, author, githubUrl, deploymentUrl }) => {
    return (
        <div className="project-card bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-300 border border-transparent p-6 flex flex-col">
            {/* Domain Tag */}
            <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold font-jetbrains-mono mr-2 px-3 py-1 rounded-full">
                    {domain}
                </span>
            </div>

            {/* Project Title */}
            <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            
            {/* Description */}
            <p className="font-instrument-serif text-gray-600 mb-6 flex-grow">{description}</p>
            
            {/* Creator Info */}
            <div className="font-space-grotesk mb-6">
                <span className="text-sm text-gray-500">Created by</span>
                <p className="font-medium text-gray-800">{author}</p>
            </div>

            {/* Links Section */}
            <div className="border-t pt-4 flex flex-wrap justify-between items-center gap-4">
                {/* GitHub Link */}
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-800 text-white font-jetbrains-mono text-sm py-2 px-4 rounded-lg hover:bg-gray-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                    GitHub
                </a>
                
                {/* Deployment Link (Conditional) */}
                {deploymentUrl ? (
                    <a href={deploymentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-600 font-jetbrains-mono text-sm py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>
                        Deployment
                    </a>
                ) : (
                    <div className="inline-flex items-center gap-2 text-gray-500 font-jetbrains-mono text-sm py-2 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        N/A
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App Component
const Projects = () => {
    return (
        <>
            {/* Styles are included directly in the component */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono&family=Space+Grotesk:wght@400;500;700&display=swap');

                .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
                .font-jetbrains-mono { font-family: 'JetBrains Mono', monospace; }
                .font-instrument-serif { font-family: 'Instrument Serif', serif; }

                /* Adding a subtle hover effect to the cards */
                .project-card:hover {
                    transform: translateY(-5px);
                }
            `}</style>

            <main className="container mx-auto p-4 sm:p-6 md:p-8 max-w-10xl bg-gradient-to-b from-#DDF6D2 to-white">
                <div className="text-center mb-12">
                    <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-gray-900">Project Showcase</h1>
                    <p className="font-instrument-serif text-lg text-gray-600 mt-2">A curated collection of our team's work and project blueprints.</p>
                </div>
                
                {/* Single Column Layout */}
                <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default Projects;
