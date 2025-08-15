import React, { useState, useMemo } from 'react';
import SEMESTER_DATA from '../static.jsx';
// Move data outside component to prevent recreation on each render
// Format data for readability and maintainability

const Resources = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Memoize current semester data to prevent unnecessary re-renders
  const currentSemesterData = useMemo(() => SEMESTER_DATA[activeSemester], [activeSemester]);
  
  // Memoize available semesters
  const availableSemesters = useMemo(() => Object.keys(SEMESTER_DATA).map(Number), []);

  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'pptx':
        return '📊';
      case 'docx':
        return '📝';
      default:
        return '📄';
    }
  };

  const getQuestionPaperBadge = (type) => {
    return type === 'ca' ? 
      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">CA</span> :
      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">ESE</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-#DDF6D2 to-white" style={{ 
      fontFamily: 'Space Grotesk, sans-serif'
    }}>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-xl border border-gray-200">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-xl sm:rounded-2xl">
              <span className="text-2xl sm:text-3xl lg:text-4xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-green-800" style={{ fontFamily: 'Instrument Serif, serif' }}>
                Academic Resource Repository
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
                Centralized hub for study materials and question papers
              </p>
            </div>
          </div>
        </div>

        {/* Semester Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          {availableSemesters.map((semId) => (
            <button
              key={semId}
              onClick={() => setActiveSemester(semId)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all duration-300 shadow-lg text-sm sm:text-base ${
                activeSemester === semId
                  ? 'bg-green-800/80 text-white shadow-green-200'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:shadow-xl'
              }`}
            >
              {SEMESTER_DATA[semId].name} 
            </button>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-6">
          {currentSemesterData?.subjects.map((subject) => (
            <div key={`${activeSemester}-${subject.id}`} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Subject Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => toggleSubject(`${activeSemester}-${subject.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{subject.name}</h3>
                      <p className="text-green-600 font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {subject.code}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {subject.materials.length} Materials
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full ml-2">
                        {subject.questionPapers.length} Papers
                      </span>
                    </div>
                    <span className="text-xl">
                      {expandedSubjects[`${activeSemester}-${subject.id}`] ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSubjects[`${activeSemester}-${subject.id}`] && (
                <div className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Study Materials */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">📄</span>
                        <h4 className="text-lg font-semibold text-gray-800">Study Materials</h4>
                      </div>
                      <div className="space-y-3">
                        {subject.materials.map((material, index) => (
                          <div key={index} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className="text-2xl">{getFileIcon(material.type)}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-800 truncate">{material.name}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <span>{material.size}</span>
                                    <span>by {material.uploadedBy}</span>
                                    <span>{material.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <button className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                                  <span className="text-sm">👁</span>
                                </button>
                                <button className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors">
                                  <span className="text-sm">⬇</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Question Papers */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">📋</span>
                        <h4 className="text-lg font-semibold text-gray-800">Question Papers</h4>
                      </div>
                      <div className="space-y-3">
                        {subject.questionPapers.map((paper, index) => (
                          <div key={index} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className="text-2xl">📋</span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-800 truncate">{paper.name}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <span>{paper.date}</span>
                                    <span>{paper.marks} marks</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {getQuestionPaperBadge(paper.type)}
                                <div className="flex gap-2">
                                  <button className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                                    <span className="text-sm">👁</span>
                                  </button>
                                  <button className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors">
                                    <span className="text-sm">⬇</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;