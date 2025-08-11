import React, { useState } from 'react';

const App = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Sample data structure
  const semesterData = {
    1: {
      name: "Semester 1",
      subjects: [
        {
          id: "ds",
          name: "Data Structures",
          code: "MCA101",
          materials: [
            { name: "Introduction to Data Structures.pdf", type: "pdf", size: "2.3 MB", uploadedBy: "Dr. Smith", date: "2024-01-15" },
            { name: "Arrays and Linked Lists.pptx", type: "pptx", size: "1.8 MB", uploadedBy: "Prof. Johnson", date: "2024-01-20" },
            { name: "Trees and Graphs Notes.docx", type: "docx", size: "1.2 MB", uploadedBy: "Senior Batch", date: "2024-01-25" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-02-10", marks: "25" },
            { name: "CA2 Question Paper - 2024.pdf", type: "ca", date: "2024-03-15", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-04-20", marks: "50" },
          ]
        },
        {
          id: "dbms",
          name: "Database Management Systems",
          code: "MCA102",
          materials: [
            { name: "DBMS Fundamentals.pdf", type: "pdf", size: "3.1 MB", uploadedBy: "Dr. Wilson", date: "2024-01-18" },
            { name: "SQL Tutorial Complete.pptx", type: "pptx", size: "2.7 MB", uploadedBy: "Prof. Davis", date: "2024-01-22" },
            { name: "Normalization Concepts.pdf", type: "pdf", size: "1.5 MB", uploadedBy: "Senior Batch", date: "2024-01-28" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-02-12", marks: "25" },
            { name: "CA2 Question Paper - 2024.pdf", type: "ca", date: "2024-03-18", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-04-22", marks: "50" },
          ]
        },
        {
          id: "se",
          name: "Software Engineering",
          code: "MCA103",
          materials: [
            { name: "SDLC Models Overview.pdf", type: "pdf", size: "2.8 MB", uploadedBy: "Dr. Brown", date: "2024-01-16" },
            { name: "Requirements Engineering.pptx", type: "pptx", size: "2.2 MB", uploadedBy: "Prof. Miller", date: "2024-01-24" },
            { name: "Testing Methodologies.docx", type: "docx", size: "1.7 MB", uploadedBy: "Senior Batch", date: "2024-01-30" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-02-08", marks: "25" },
            { name: "CA2 Question Paper - 2024.pdf", type: "ca", date: "2024-03-12", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-04-18", marks: "50" },
          ]
        },
        {
          id: "networks",
          name: "Computer Networks",
          code: "MCA104",
          materials: [
            { name: "Network Fundamentals.pdf", type: "pdf", size: "3.5 MB", uploadedBy: "Dr. Taylor", date: "2024-01-19" },
            { name: "OSI Model Detailed.pptx", type: "pptx", size: "2.9 MB", uploadedBy: "Prof. Anderson", date: "2024-01-26" },
            { name: "TCP-IP Protocol Suite.pdf", type: "pdf", size: "2.1 MB", uploadedBy: "Senior Batch", date: "2024-02-02" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-02-14", marks: "25" },
            { name: "CA2 Question Paper - 2024.pdf", type: "ca", date: "2024-03-20", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-04-24", marks: "50" },
          ]
        },
        {
          id: "math",
          name: "Discrete Mathematics",
          code: "MCA105",
          materials: [
            { name: "Set Theory and Logic.pdf", type: "pdf", size: "2.6 MB", uploadedBy: "Dr. White", date: "2024-01-17" },
            { name: "Graph Theory Basics.pptx", type: "pptx", size: "2.4 MB", uploadedBy: "Prof. Garcia", date: "2024-01-23" },
            { name: "Combinatorics Problems.pdf", type: "pdf", size: "1.9 MB", uploadedBy: "Senior Batch", date: "2024-01-29" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-02-09", marks: "25" },
            { name: "CA2 Question Paper - 2024.pdf", type: "ca", date: "2024-03-14", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-04-19", marks: "50" },
          ]
        },
        {
          id: "programming",
          name: "Programming Fundamentals",
          code: "MCA106",
          materials: [
            { name: "C Programming Complete.pdf", type: "pdf", size: "4.2 MB", uploadedBy: "Dr. Lee", date: "2024-01-21" },
            { name: "Data Types and Operators.pptx", type: "pptx", size: "1.6 MB", uploadedBy: "Prof. Martinez", date: "2024-01-27" },
            { name: "Practice Problems Set.pdf", type: "pdf", size: "2.8 MB", uploadedBy: "Senior Batch", date: "2024-02-03" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-02-11", marks: "25" },
            { name: "CA2 Question Paper - 2024.pdf", type: "ca", date: "2024-03-16", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-04-21", marks: "50" },
          ]
        }
      ]
    },
    2: {
      name: "Semester 2",
      subjects: [
        {
          id: "oop",
          name: "Object Oriented Programming",
          code: "MCA201",
          materials: [
            { name: "OOP Concepts in Java.pdf", type: "pdf", size: "3.8 MB", uploadedBy: "Dr. Kumar", date: "2024-02-15" },
            { name: "Inheritance and Polymorphism.pptx", type: "pptx", size: "2.5 MB", uploadedBy: "Prof. Sharma", date: "2024-02-20" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-10", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-15", marks: "50" },
          ]
        },
        {
          id: "algorithms",
          name: "Design and Analysis of Algorithms",
          code: "MCA202",
          materials: [
            { name: "Algorithm Complexity.pdf", type: "pdf", size: "2.9 MB", uploadedBy: "Dr. Patel", date: "2024-02-18" },
            { name: "Sorting Algorithms.pptx", type: "pptx", size: "2.1 MB", uploadedBy: "Prof. Singh", date: "2024-02-25" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-12", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-18", marks: "50" },
          ]
        },
        {
          id: "os",
          name: "Operating Systems",
          code: "MCA203",
          materials: [
            { name: "OS Fundamentals.pdf", type: "pdf", size: "3.2 MB", uploadedBy: "Dr. Gupta", date: "2024-02-16" },
            { name: "Process Management.pptx", type: "pptx", size: "2.7 MB", uploadedBy: "Prof. Verma", date: "2024-02-22" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-08", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-12", marks: "50" },
          ]
        },
        {
          id: "web",
          name: "Web Technologies",
          code: "MCA204",
          materials: [
            { name: "HTML CSS Fundamentals.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "Dr. Agarwal", date: "2024-02-19" },
            { name: "JavaScript Basics.pptx", type: "pptx", size: "1.9 MB", uploadedBy: "Prof. Jain", date: "2024-02-26" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-14", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-20", marks: "50" },
          ]
        },
        {
          id: "stats",
          name: "Statistics and Probability",
          code: "MCA205",
          materials: [
            { name: "Probability Theory.pdf", type: "pdf", size: "3.1 MB", uploadedBy: "Dr. Mehta", date: "2024-02-17" },
            { name: "Statistical Analysis.pptx", type: "pptx", size: "2.8 MB", uploadedBy: "Prof. Pandey", date: "2024-02-24" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-09", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-16", marks: "50" },
          ]
        },
        {
          id: "system",
          name: "System Programming",
          code: "MCA206",
          materials: [
            { name: "Compilers and Interpreters.pdf", type: "pdf", size: "4.1 MB", uploadedBy: "Dr. Rao", date: "2024-02-21" },
            { name: "Assembly Language.pptx", type: "pptx", size: "3.3 MB", uploadedBy: "Prof. Nair", date: "2024-02-28" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-11", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-14", marks: "50" },
          ]
        },
        {
          id: "mobile",
          name: "Mobile Application Development",
          code: "MCA207",
          materials: [
            { name: "Android Development Basics.pdf", type: "pdf", size: "3.6 MB", uploadedBy: "Dr. Reddy", date: "2024-02-23" },
            { name: "React Native Tutorial.pptx", type: "pptx", size: "2.2 MB", uploadedBy: "Prof. Iyer", date: "2024-03-01" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-13", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-17", marks: "50" },
          ]
        },
        {
          id: "security",
          name: "Information Security",
          code: "MCA208",
          materials: [
            { name: "Cryptography Fundamentals.pdf", type: "pdf", size: "2.7 MB", uploadedBy: "Dr. Pillai", date: "2024-02-20" },
            { name: "Network Security.pptx", type: "pptx", size: "2.4 MB", uploadedBy: "Prof. Menon", date: "2024-02-27" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-15", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-19", marks: "50" },
          ]
        },
        {
          id: "ai",
          name: "Artificial Intelligence",
          code: "MCA209",
          materials: [
            { name: "Introduction to AI.pdf", type: "pdf", size: "3.9 MB", uploadedBy: "Dr. Choudhary", date: "2024-02-22" },
            { name: "Machine Learning Basics.pptx", type: "pptx", size: "3.1 MB", uploadedBy: "Prof. Bansal", date: "2024-03-02" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-03-07", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-05-13", marks: "50" },
          ]
        }
      ]
    },
    3: {
      name: "Semester 3",
      subjects: [
        {
          id: "advanced-db",
          name: "Advanced Database Systems",
          code: "MCA301",
          materials: [
            { name: "NoSQL Databases.pdf", type: "pdf", size: "3.4 MB", uploadedBy: "Dr. Krishnan", date: "2024-03-15" },
            { name: "Database Optimization.pptx", type: "pptx", size: "2.6 MB", uploadedBy: "Prof. Sinha", date: "2024-03-20" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-04-10", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-06-15", marks: "50" },
          ]
        },
        {
          id: "cloud",
          name: "Cloud Computing",
          code: "MCA302",
          materials: [
            { name: "AWS Fundamentals.pdf", type: "pdf", size: "4.2 MB", uploadedBy: "Dr. Joshi", date: "2024-03-18" },
            { name: "Docker and Kubernetes.pptx", type: "pptx", size: "3.5 MB", uploadedBy: "Prof. Malhotra", date: "2024-03-25" },
          ],
          questionPapers: [
            { name: "CA1 Question Paper - 2024.pdf", type: "ca", date: "2024-04-12", marks: "25" },
            { name: "End Semester Exam - 2024.pdf", type: "ese", date: "2024-06-18", marks: "50" },
          ]
        }
      ]
    }
  };

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
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #ECFAE5 0%, #DDF6D2 100%)',
      fontFamily: 'Space Grotesk, sans-serif'
    }}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <span className="text-4xl">🎓</span>
            </div>
            <div>
              <h1 className="text-4xl font-medium text-green-800" style={{ fontFamily: 'Instrument Serif, serif' }}>
                Academic Resource Repository
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Centralized hub for study materials and question papers
              </p>
            </div>
          </div>
        </div>

        {/* Semester Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(semesterData).map(([semId, semData]) => (
            <button
              key={semId}
              onClick={() => setActiveSemester(parseInt(semId))}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-lg ${
                activeSemester === parseInt(semId)
                  ? 'bg-green-600 text-white shadow-green-200'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:shadow-xl'
              }`}
            >
              {semData.name}
            </button>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-6">
          {semesterData[activeSemester]?.subjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Subject Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => toggleSubject(subject.id)}
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
                      {expandedSubjects[subject.id] ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSubjects[subject.id] && (
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

        {/* Stats Footer */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Object.values(semesterData).reduce((total, sem) => total + sem.subjects.length, 0)}
              </div>
              <div className="text-gray-600">Total Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Object.values(semesterData).reduce((total, sem) => 
                  total + sem.subjects.reduce((subTotal, subject) => subTotal + subject.materials.length, 0), 0
                )}
              </div>
              <div className="text-gray-600">Study Materials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Object.values(semesterData).reduce((total, sem) => 
                  total + sem.subjects.reduce((subTotal, subject) => subTotal + subject.questionPapers.length, 0), 0
                )}
              </div>
              <div className="text-gray-600">Question Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">Active Semesters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;