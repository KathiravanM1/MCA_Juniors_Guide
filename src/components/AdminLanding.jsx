import React, { useState } from 'react';
import { Compass, LogOut, Map, BookOpen, Sparkles, LayoutGrid, FileCode, UserCheck, LayoutDashboard } from 'lucide-react';

// Mock function for logout
const handleLogout = () => {
  console.log("User logged out");
  // In a real application, you would handle token removal, state clearing, and redirection here.
};

// Reusable Card component with horizontal box layout
const DashboardCard = ({ icon, title, description, onManage, index }) => (
  <div 
    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
    style={{
      animationDelay: `${index * 0.1}s`,
      animation: 'fadeInUp 0.6s ease-out forwards'
    }}
  >
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Content - Horizontal Layout */}
    <div className="relative p-6 flex items-center gap-6">
      {/* Icon */}
      <div 
        className="flex-shrink-0 p-4 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: '#ECFAE5' }}
      >
        <div style={{ color: '#22c55e' }}>
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors font-space">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-space">
          {description}
        </p>
      </div>
      
      {/* Action button */}
      <div className="flex-shrink-0">
        <button
          onClick={onManage}
          className="font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-sm tracking-wide shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 whitespace-nowrap font-space"
          style={{ 
            backgroundColor: '#DDF6D2', 
            color: '#16a34a',
            border: '1px solid #bbf7d0'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#bbf7d0';
            e.target.style.color = '#15803d';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#DDF6D2';
            e.target.style.color = '#16a34a';
          }}
        >
          Manage
        </button>
      </div>
    </div>
  </div>
);

// Main Admin Dashboard Component
export default function AdminLanding() {
  // Data for the dashboard panels
  const dashboardModules = [
    {
      id: 1,
      title: "Technology Roadmaps",
      description: "Create, update, and manage career roadmaps for different specializations like Full-Stack, AI/ML, and Cybersecurity.",
      icon: <Map size={28} />,
      action: () => console.log("Manage Roadmaps"),
    },
    {
      id: 2,
      title: "Academic Hub",
      description: "Upload and organize syllabus documents, lecture notes, e-books, and previous year question papers by semester.",
      icon: <BookOpen size={28} />,
      action: () => console.log("Manage Academic Hub"),
    },
    {
      id: 3,
      title: "Problem-Solving & Frameworks",
      description: "Add and edit content on DSA patterns, software design principles, and project management methodologies.",
      icon: <LayoutGrid size={28} />,
      action: () => console.log("Manage Frameworks"),
    },
    {
      id: 4,
      title: "Impactful Project Hub",
      description: "Curate and manage the list of project ideas. Review and approve student-submitted projects for the gallery.",
      icon: <FileCode size={28} />,
      action: () => console.log("Manage Project Hub"),
    },
    {
      id: 5,
      title: "Interview Experiences",
      description: "Valuable knowledge and experiences of real interviews cracked by our seniors",
      icon: <UserCheck size={28} />,
      action: () => console.log("Manage Placement Prep"),
    },
    {
      id: 6,
      title: "Admin & Academic Tools",
      description: "Manage settings for administrative tools like the CGPA calculator and attendance trackers available to students.",
      icon: <LayoutDashboard size={28} />,
      action: () => console.log("Manage Admin Tools"),
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
        
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slideInRight 0.8s ease-out;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-space">
        {/* Header with enhanced styling */}
        <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo and Project Name */}
              <div className="flex items-center gap-4 animate-slide-in">
                <div 
                  className="p-3 rounded-2xl shadow-sm"
                  style={{ backgroundColor: '#ECFAE5' }}
                >
                  <Compass className="text-green-600" size={32} />
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-800 tracking-tight font-serif">
                    MCA Compass
                  </span>
                  <div className="text-sm text-gray-500 font-medium font-mono tracking-wider uppercase">Admin Portal</div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 bg-white text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-300 shadow-sm border border-gray-200 hover:shadow-md transform hover:scale-105 active:scale-95 font-space"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto p-6 lg:p-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-slide-in font-serif">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed animate-slide-in font-space">
              Welcome to your command center. Select any module below to manage and update its content with ease.
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div 
                className="h-1 w-24 rounded-full"
                style={{ backgroundColor: '#DDF6D2' }}
              ></div>
            </div>
          </div>
          
          {/* Dashboard Cards - Vertical Stack */}
          <div className="max-w-6xl mx-auto space-y-6">
            {dashboardModules.map((module, index) => (
              <DashboardCard
                key={module.id}
                icon={module.icon}
                title={module.title}
                description={module.description}
                onManage={module.action}
                index={index}
              />
            ))}
          </div>
          
          {/* Footer note */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm font-mono tracking-wide">
              Built with precision for seamless content management
            </p>
          </div>
        </main>
      </div>
    </>
  );
}