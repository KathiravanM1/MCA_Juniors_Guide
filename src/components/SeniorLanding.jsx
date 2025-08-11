import React, { useState, useEffect } from 'react';
import { GraduationCap, LogOut, BookOpen, FileCode, UserCheck, Eye, Edit3, Lock, Rocket, FileText, Lightbulb, Zap, Target, ArrowRight, CheckCircle, Users, Calendar, TrendingUp } from 'lucide-react';

// Mock function for logout
const handleLogout = () => {
  console.log("Senior logged out");
};

// Module Section Component with alternating layout
const ModuleSection = ({ module, index, isReversed = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const OverviewPanel = () => (
    <div className={`flex-1 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'} py-8`}>
      <div className="h-full flex flex-col justify-center">
        <p className="text-gray-600 font-space leading-relaxed mb-8 text-lg">
          {module.longDescription}
        </p>
                
        <div className="space-y-4">
          <ul className="space-y-4">
            {module.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-lime-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600 font-space">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const ActionPanel = () => (
    <div className={`flex-1 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
      <div className="bg-gradient-to-br from-lime-50 to-lime-100 rounded-3xl p-8 shadow-lg border border-lime-100 h-full flex flex-col justify-center" style={{background: 'linear-gradient(135deg, #ECFAE5 0%, #DDF6D2 100%)'}}>
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-white shadow-md mb-6">
            <module.icon size={40} className='text-gray-500' />
          </div>
                    
          <h3 className="text-2xl font-bold text-gray-800 font-serif mb-4">
            {module.title}
          </h3>
                    
          <p className="text-gray-600 font-space mb-6 leading-relaxed">
            {module.description}
          </p>
                    
          {module.highlight?.trim() && (
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold font-mono bg-gray-100 text-gray-600 border border-gray-200">
                {module.highlight}
              </div>
            </div>
          )}

                    
          <button
            onClick={module.action}
            className={`group w-full py-4 px-6 rounded-2xl font-semibold font-space transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 bg-gray-200 text-gray-600 hover:bg-gray-300`}
          >
            <>
              <Eye size={20} />
              View 
            </>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
                    
          {module.stats && (
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {module.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold text-lime-600 font-serif">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-space">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mb-16 sm:mb-24">
      <div className={`flex flex-col lg:flex-row gap-8 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        <OverviewPanel />
        <ActionPanel />
      </div>
    </section>
  );
};

// Main Senior Dashboard Component
export default function SeniorDashboard() {
  // Enhanced modules data with detailed information
  const modules = [
    {
      id: 'tech-roadmap',
      icon: Rocket,
      title: 'Technology Roadmaps',
      description: 'Comprehensive career paths and learning trajectories for modern tech specializations.',
      longDescription: 'Explore detailed roadmaps covering Full-Stack Development, AI/ML Engineering, Cybersecurity, and emerging technologies. Each roadmap includes skill prerequisites, learning resources, and career progression paths.',
      isEditable: false,
      features: [
        'Full-Stack Development pathway with React, Node.js, and cloud technologies',
        'AI/ML roadmap covering Python, TensorFlow, and data science fundamentals',
        'Cybersecurity track with ethical hacking and security frameworks',
        'DevOps and Cloud Computing specialization paths',
        'Mobile development roadmaps for iOS and Android'
      ],
      action: () => console.log("View Roadmaps")
    },
    {
      id: 'academic-hub',
      icon: BookOpen,
      title: 'Academic Hub',
      description: 'Centralized repository for all academic materials, syllabi, and educational resources.',
      longDescription: 'Manage comprehensive academic content including semester-wise syllabi, lecture notes, e-books, reference materials, and previous year question papers. Organize content for easy student access.',
      isEditable: true,
      features: [
        'Upload and organize syllabus documents by semester',
        'Manage lecture notes and study materials',
        'Curate e-book collections and reference guides',
        'Organize previous year question papers',
        'Version control for academic content updates'
      ],
      action: () => console.log("Manage Academic Hub")
    },
    {
      id: 'project-hub',
      icon: FileCode,
      title: 'Impactful Project Hub',
      description: 'Project ideation, development guidance, and showcase management platform.',
      longDescription: 'Curate innovative project ideas, provide development guidance, and manage the project showcase gallery. Review student submissions and maintain quality standards for the project portfolio.',
      isEditable: true,
      features: [
        'Curate and categorize project ideas by technology stack',
        'Review and approve student project submissions',
        'Manage project showcase gallery and featured projects',
        'Provide development guidelines and best practices',
        'Track project completion rates and student engagement'
      ],
      action: () => console.log("Manage Project Hub")
    },
    {
      id: 'interview-experiences',
      icon: UserCheck,
      title: 'Interview Experiences',
      description: 'Company-specific interview insights, preparation materials, and placement guidance.',
      longDescription: 'Comprehensive collection of real interview experiences from top companies, including technical questions, HR rounds, and salary negotiations. Regularly updated with fresh insights.',
      isEditable: true,
      features: [
        'Update company-specific interview experiences',
        'Manage technical question databases',
        'Curate salary negotiation tips and strategies',
        'Organize placement preparation materials',
        'Track placement success stories and outcomes'
      ],
      action: () => console.log("Manage Interview Experiences")
    },
    {
      id: 'problem-solving',
      icon: Lightbulb,
      title: 'Problem-Solving & Frameworks',
      description: 'Algorithmic thinking patterns, software design principles, and methodologies.',
      longDescription: 'Access comprehensive content on data structures, algorithms, design patterns, and problem-solving methodologies. Essential for technical interview preparation and software development.',
      isEditable: false,
      features: [
        'Data structures and algorithms patterns',
        'Software design principles and SOLID concepts',
        'System design fundamentals and case studies',
        'Competitive programming strategies',
        'Code optimization techniques and best practices'
      ],
      action: () => console.log("View Frameworks")
    },
    {
      id: 'admin-tools',
      icon: Target,
      title: 'Admin & Academic Tools',
      description: 'Administrative utilities for academic tracking and student management.',
      longDescription: 'Collection of administrative tools including CGPA calculators, attendance trackers, academic progress monitors, and student performance analytics for comprehensive academic management.',
      isEditable: false,
      features: [
        'CGPA calculator with semester-wise tracking',
        'Attendance monitoring and reporting tools',
        'Academic progress tracking dashboards',
        'Student performance analytics',
        'Administrative reporting and insights'
      ],
      action: () => console.log("View Admin Tools")
    }
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .bg-lime-gradient {
          background: linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%);
        }

        .bg-light-gradient {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%);
        }

        .shadow-lime {
          box-shadow: 0 20px 25px -5px rgba(101, 163, 13, 0.1), 0 10px 10px -5px rgba(101, 163, 13, 0.04);
        }
      `}</style>

      <div className="min-h-screen bg-light-gradient">
        {/* Enhanced Header */}
        <header className="bg-white/95 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-lime-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex items-center gap-4 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-lime-gradient shadow-lime">
                  <GraduationCap className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-serif tracking-tight">
                    MCA Compass
                  </h1>
                  <div className="text-sm text-lime-700 font-medium font-mono tracking-wide uppercase">
                    Senior Portal
                  </div>
                </div>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 bg-white text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 active:scale-95 font-space hover:text-lime-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 font-serif animate-fade-in-up">
              Senior Dashboard
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto font-space leading-relaxed animate-fade-in-up">
              This portal offers comprehensive view-only access to academic content, projects, and interview experiences.
            </p>
          </div>
        </section>

        {/* Modules Sections */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          {modules.map((module, index) => (
            <ModuleSection
              key={module.id}
              module={module}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}

        </main>
      </div>
    </>
  );
}