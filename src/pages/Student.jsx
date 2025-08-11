import React, { useState } from 'react';
import { LogOut, Map, FileText, BookOpen, Code, GraduationCap, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'question-paper', label: 'Question Paper', icon: FileText },
    { id: 'materials', label: 'Materials', icon: BookOpen },
    { id: 'problem-solving', label: 'Problem Solving', icon: Code },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: FolderOpen }
  ];

  const handleNavClick = (id) => {
    setActiveButton(id);
    console.log(`Navigating to: ${id}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ECFAE5 0%, #DDF6D2 100%)' }}>
      <header className="flex justify-end p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg shadow-md transition-all duration-200 text-gray-700 hover:text-red-600 font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
            <p className="text-lg text-gray-600">Choose a module to get started</p>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeButton === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    group relative overflow-hidden
                    p-8 rounded-xl shadow-lg
                    bg-white bg-opacity-90 hover:bg-opacity-100
                    border border-white border-opacity-50
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105 hover:shadow-xl
                    ${isActive ? 'ring-2 ring-green-400 bg-opacity-100 scale-105' : ''}
                  `}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`
                      p-4 rounded-full mb-4 transition-all duration-300
                      ${isActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                      }
                    `}>
                      <IconComponent size={28} />
                    </div>
                    
                    <h3 className={`
                      text-xl font-semibold mb-2 transition-colors
                      ${isActive ? 'text-green-700' : 'text-gray-800 group-hover:text-green-700'}
                    `}>
                      {item.label}
                    </h3>
                    
                    <div className={`
                      w-12 h-1 rounded-full transition-all duration-300
                      ${isActive 
                        ? 'bg-green-500' 
                        : 'bg-gray-300 group-hover:bg-green-400'
                      }
                    `}></div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
                </button>
              );
            })}
          </div>

          {/* Active Section Indicator */}
          {activeButton && (
            <div className="mt-12 p-6 bg-white bg-opacity-60 rounded-lg text-center">
              <p className="text-lg text-gray-700">
                Selected: <span className="font-semibold text-green-700 capitalize">
                  {navigationItems.find(item => item.id === activeButton)?.label}
                </span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Student;