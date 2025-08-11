import { useState, useEffect } from 'react';
import { 
  Rocket, BookOpen, FileText, Lightbulb, Zap, Target, GraduationCap, Sparkles,
  Star, Users, TrendingUp, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500;600&family=Clash+Display:wght@400;500;600;700&display=swap');
  
  .font-space { font-family: 'Space Grotesk', sans-serif; }
  .font-serif { font-family: 'Instrument Serif', serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
  .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
  
  .bg-primary { background-color: #ECFAE5; }
  .bg-secondary { background-color: #DDF6D2; }
  .text-primary { color: #1f2937; }
  .text-secondary { color: #6b7280; }
  
  .hover-lift:hover { transform: translateY(-4px); transition: transform 0.3s ease; }
  
  .feature-image {
    background: linear-gradient(135deg, #ECFAE5 0%, #DDF6D2 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
`;

const features = [
  { id: 'tech-roadmap', icon: Rocket, title: 'Tech Roadmap', description: 'Comprehensive learning paths...', highlight: '50+ Learning Paths' },
  { id: 'academic-resources', icon: BookOpen, title: 'Academic Resources', description: 'Access premium study materials...', highlight: '1000+ Resources' },
  { id: 'past-papers', icon: FileText, title: 'Past Papers', description: 'Extensive collection of previous year...', highlight: '5 Years Coverage' },
  { id: 'problem-solving', icon: Lightbulb, title: 'Problem-Solving Patterns', description: 'Master the art of algorithmic thinking...', highlight: '200+ Patterns' },
  { id: 'project-guide', icon: Zap, title: 'Project Guide', description: 'End-to-end guidance for projects...', highlight: 'Live Mentorship' },
  { id: 'interview-experiences', icon: Target, title: 'Interview Experiences', description: 'Real interview stories...', highlight: '300+ Experiences' }
];

const FeatureCard = ({ feature, index, isVisible }) => {
  const IconComponent = feature.icon;
  const isEven = index % 2 === 0;
  return (
    <div 
      className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 mb-16 sm:mb-20 ${
        isEven ? '' : 'lg:flex-row-reverse'
      } ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex-1">
        <div className="feature-image hover-lift shadow-lg p-4">
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-3 mx-auto animate-float">
              <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" />
            </div>
            <div className="text-xs sm:text-sm font-mono text-secondary px-3 py-1 bg-white rounded-full inline-block">
              {feature.highlight}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-3 sm:space-y-4 text-center lg:text-left">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space text-primary">
          {feature.title}
        </h3>
        <p className="text-base sm:text-lg text-secondary leading-relaxed font-space">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const StatsSection = ({ isVisible }) => {
  const stats = [
    { value: '10K+', label: <>Active Users <br /> But Total Strength 60 + 60</>, icon: Users },
    { value: '500+', label: <>Success Stories <br /> Nadakanunu Aasa thaa</>, icon: Award },
    { value: '95%', label: <>Placement Rate <br /> Poiii</>, icon: TrendingUp }
  ];
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className={`text-center group ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-full mb-4 sm:mb-6 group-hover:bg-primary transition-colors duration-300">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-primary font-space mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary font-space text-sm sm:text-lg">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MCALandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);
    setIsLoaded(true);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      }, { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-observe]');
    sections.forEach(section => observer.observe(section));

    return () => {
      document.head.removeChild(styleSheet);
      observer.disconnect();
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-primary overflow-x-hidden">
      <style>{customStyles}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold font-space text-primary">Padidaw Parama</h1>
            <button onClick={handleLoginClick} className="bg-secondary hover:bg-primary text-primary font-semibold py-2 px-4 sm:px-6 rounded-full transition-all duration-300 hover-lift">
              Aarambikalaama
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 sm:pt-20 pb-20 sm:pb-32 bg-gradient-to-br from-white via-primary/5 to-secondary/20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4 text-primary ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000`}>
            Innaila Irunthu Vidivu Kaalam 
            <span className="block text-gray-600 italic">daw Unaku</span>
          </h2>
          <p className={`text-base sm:text-xl text-secondary max-w-4xl mx-auto leading-relaxed font-space mb-6 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-300`}>
            Built by <span className="text-primary font-semibold">MCA seniors</span> for juniors – your comprehensive academic and career navigator designed with love and expertise
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-500`}>
            <button onClick={handleLoginClick} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg flex items-center gap-2 hover-lift">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div data-observe id="stats">
        <StatsSection isVisible={visibleSections.has('stats')} />
      </div>

      {/* Features */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-primary/5" data-observe id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 text-primary">Premium Features</h3>
            <p className="text-base sm:text-xl text-secondary max-w-6xl mx-auto font-space leading-relaxed">
              Discover our comprehensive suite of tools designed to accelerate your academic and professional growth
            </p>
          </div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} isVisible={visibleSections.has('features')} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </div>
            <span className="text-lg sm:text-xl font-bold font-space text-primary">MCA Juniors Guide</span>
          </div>
          <p className="text-xs sm:text-sm text-secondary font-space">
            © 2025 MCA Juniors Guide. Built with 💚 by passionate seniors.
            <br />
            <span className="font-mono text-[10px] sm:text-xs opacity-75">Empowering the next generation of tech leaders</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MCALandingPage;
