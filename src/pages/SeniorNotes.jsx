import React, { useState, useEffect } from 'react';
import { GraduationCap, LogOut, FileText, BookOpen, Upload, ChevronDown, ChevronUp, X, CheckCircle, AlertCircle, File } from 'lucide-react';

// Upload Section Component
const UploadSection = ({ 
  title, 
  icon: Icon, 
  type, 
  selectedSemester, 
  setSelectedSemester, 
  selectedSubject, 
  setSelectedSubject, 
  isDropdownOpen, 
  setIsDropdownOpen,
  files,
  setFiles,
  uploadStatus,
  setUploadStatus,
  selectedAssessment,
  setSelectedAssessment
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isAssessmentDropdownOpen, setIsAssessmentDropdownOpen] = useState(false);

  const semesters = [
    { id: 1, name: 'Semester 1' },
    { id: 2, name: 'Semester 2' },
    { id: 3, name: 'Semester 3' },
    { id: 4, name: 'Semester 4' }
  ];

  const subjectsBySemester = {
    1: [
      { id: 1, name: 'DATA STRUCTURES', code: 'CA101' },
      { id: 2, name: 'DATABASE TECHNOLOGIES', code: 'CA102' },
      { id: 3, name: 'JAVA PROGRAMMING', code: 'CA103' },
      { id: 4, name: 'COMPUTER NETWORKS AND MANAGEMENT', code: 'CA104' },
      { id: 5, name: 'ADVANCED SOFTWARE ENGINEERING', code: 'CA105' },
      { id: 6, name: 'MATHEMATICAL FOUNDATIONS OF COMPUTER SCIENCE', code: 'MA3111' }
    ],
    2: [
      { id: 1, name: 'SOFTWARE TESTING AND AUTOMATION', code: 'CA3020' },
      { id: 2, name: 'ADVANCED DATABASE SYSTEMS', code: 'CA3026' },
      { id: 3, name: 'PYTHON PROGRAMMING WITH DATA SCIENCE', code: 'CA3202' },
      { id: 4, name: 'FULL STACK SOFTWARE DEVELOPMENT', code: 'CA3203' },
      { id: 5, name: 'INTERNET OF THINGS', code: 'CA3204' },
      { id: 6, name: 'DESIGN AND ANALYSIS OF ALGORITHMS', code: 'CA3205' },
      { id: 7, name: 'MOBILE APPLICATION DEVELOPMENT LABORATORY', code: 'CA3211' },
      { id: 8, name: 'RESEARCH METHODOLOGY AND IPR', code: 'RM3151' }
    ],
    3: [
      { id: 1, name: 'ARTIFICIAL INTELLIGENCE', code: 'CA3002' },
      { id: 2, name: 'BIG DATA ANALYTICS', code: 'CA3004' },
      { id: 3, name: 'BLOCKCHAIN TECHNOLOGIES', code: 'CA3005' },
      { id: 4, name: 'MACHINE LEARNING', code: 'CA3301' },
      { id: 5, name: 'CLOUD COMPUTING TECHNIQUES', code: 'CA3302' },
      { id: 6, name: 'CRYPTOGRAPHY AND SECURITY', code: 'CA3303' }
    ],
    4: [{ id: 1, name: 'Project Management', code: 'CS404' }
    ]
  };

  const assessmentTypes = [
    { id: 1, name: 'Internal Assessment 1', code: 'IA1' },
    { id: 2, name: 'Internal Assessment 2', code: 'IA2' },
    { id: 3, name: 'End Semester', code: 'ES' }
  ];

  const getSubjectsForSemester = (semesterId) => {
    return subjectsBySemester[semesterId] || [];
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null);
    setSelectedAssessment(null);
    setIsDropdownOpen(false);
    setIsSubjectDropdownOpen(true);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedAssessment(null);
    setIsSubjectDropdownOpen(false);
    setIsAssessmentDropdownOpen(true);
  };

  const handleAssessmentSelect = (assessment) => {
    setSelectedAssessment(assessment);
    setIsAssessmentDropdownOpen(false);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Different validation for question papers vs notes
    if (type === 'questionpaper') {
      if (!selectedSemester || !selectedSubject || !selectedAssessment || files.length === 0) {
        setUploadStatus({ type: 'error', message: 'Please select semester, subject, assessment type, and files to upload.' });
        return;
      }
    } else {
      if (!selectedSemester || !selectedSubject || files.length === 0) {
        setUploadStatus({ type: 'error', message: 'Please select semester, subject, and files to upload.' });
        return;
      }
    }

    setUploadStatus({ type: 'uploading', message: 'Uploading files...' });
    
    // Simulate upload process
    setTimeout(() => {
      const successMessage = type === 'questionpaper' 
        ? `Successfully uploaded ${files.length} file(s) for ${selectedSubject.name} - ${selectedSemester.name} - ${selectedAssessment.name}`
        : `Successfully uploaded ${files.length} file(s) for ${selectedSubject.name} - ${selectedSemester.name}`;
      
      setUploadStatus({ 
        type: 'success', 
        message: successMessage
      });
      setFiles([]);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
    }, 2000);
  };

  const resetSection = () => {
    setSelectedSemester(null);
    setSelectedSubject(null);
    setSelectedAssessment(null);
    setIsDropdownOpen(false);
    setIsSubjectDropdownOpen(false);
    setIsAssessmentDropdownOpen(false);
    setFiles([]);
    setUploadStatus(null);
  };

  return (
    <div className="flex-1">
      <div className="bg-gradient-to-br from-#DDF6D2-50 to-white-100 rounded-3xl p-8 shadow-lg border border-green-100 h-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-white shadow-md mb-6">
            <Icon size={40} className='text-gray-500' />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-serif mb-4">
            {title}
          </h3>
          <button 
            onClick={resetSection}
            className="text-sm text-gray-500 hover:text-gray-700 font-space underline"
          >
            Reset Selection
          </button>
        </div>

        {/* Semester Selection */}
        <div className="mb-6">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-between hover:shadow-lg transition-all duration-300 font-space"
            >
              <span className={selectedSemester ? 'text-gray-800' : 'text-gray-500'}>
                {selectedSemester ? selectedSemester.name : 'Select Semester'}
              </span>
              {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                {semesters.map((semester) => (
                  <button
                    key={semester.id}
                    onClick={() => handleSemesterSelect(semester)}
                    className="w-full p-4 text-left hover:bg-lime-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 font-space"
                  >
                    {semester.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Subject Selection */}
        {selectedSemester && (
          <div className="mb-6">
            <div className="relative">
              <button
                onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                className="w-full p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-between hover:shadow-lg transition-all duration-300 font-space"
              >
                <span className={selectedSubject ? 'text-gray-800' : 'text-gray-500'}>
                  {selectedSubject ? `${selectedSubject.name} (${selectedSubject.code})` : 'Select Subject'}
                </span>
                {isSubjectDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isSubjectDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                  {getSubjectsForSemester(selectedSemester.id).map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => handleSubjectSelect(subject)}
                      className="w-full p-4 text-left hover:bg-lime-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 font-space"
                    >
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-gray-500">{subject.code}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assessment Type Selection - Only for Question Papers */}
        {type === 'questionpaper' && selectedSemester && selectedSubject && (
          <div className="mb-6">
            <div className="relative">
              <button
                onClick={() => setIsAssessmentDropdownOpen(!isAssessmentDropdownOpen)}
                className="w-full p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-between hover:shadow-lg transition-all duration-300 font-space"
              >
                <span className={selectedAssessment ? 'text-gray-800' : 'text-gray-500'}>
                  {selectedAssessment ? `${selectedAssessment.name} (${selectedAssessment.code})` : 'Select Assessment Type'}
                </span>
                {isAssessmentDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isAssessmentDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                  {assessmentTypes.map((assessment) => (
                    <button
                      key={assessment.id}
                      onClick={() => handleAssessmentSelect(assessment)}
                      className="w-full p-4 text-left hover:bg-lime-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 font-space"
                    >
                      <div>
                        <div className="font-medium">{assessment.name}</div>
                        <div className="text-sm text-gray-500">{assessment.code}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* File Upload Area */}
        {selectedSemester && selectedSubject && (type === 'notes' || (type === 'questionpaper' && selectedAssessment)) && (
          <div className="mb-6">
            <div
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-lime-400 bg-lime-50' 
                  : 'border-gray-300 bg-white hover:border-lime-300'
              }`}
            >
              <Upload size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4 font-space">
                Drag and drop files here, or click to browse
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id={`file-input-${type}`}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor={`file-input-${type}`}
                className="inline-block px-6 py-3 bg-green-100 text-black rounded-xl hover:bg-green-300 transition-colors duration-300 cursor-pointer font-space font-semibold"
              >
                Browse Files
              </label>
            </div>
          </div>
        )}

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 font-serif">Selected Files:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <File size={20} className="text-gray-500" />
                    <span className="text-gray-700 font-space text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500 font-mono">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Status */}
        {uploadStatus && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            uploadStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : uploadStatus.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {uploadStatus.type === 'success' && <CheckCircle size={20} />}
            {uploadStatus.type === 'error' && <AlertCircle size={20} />}
            {uploadStatus.type === 'uploading' && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            )}
            <span className="font-space">{uploadStatus.message}</span>
          </div>
        )}

        {/* Upload Button */}
        {((type === 'questionpaper' && selectedSemester && selectedSubject && selectedAssessment && files.length > 0) || 
          (type === 'notes' && selectedSemester && selectedSubject && files.length > 0)) && (
          <button
            onClick={handleUpload}
            disabled={uploadStatus?.type === 'uploading'}
            className="w-full py-4 px-6 bg-green-600 text-gray rounded-2xl hover:bg-green-800 hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold font-space shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:transform-none"
          >
            {uploadStatus?.type === 'uploading' ? 'Uploading...' : `Upload ${files.length} File(s)`}
          </button>
        )}
      </div>
    </div>
  );
};

// Main Upload Page Component
export default function SeniorUploadPage() {
  // Question Papers state
  const [qpSelectedSemester, setQpSelectedSemester] = useState(null);
  const [qpSelectedSubject, setQpSelectedSubject] = useState(null);
  const [qpSelectedAssessment, setQpSelectedAssessment] = useState(null);
  const [qpIsDropdownOpen, setQpIsDropdownOpen] = useState(false);
  const [qpFiles, setQpFiles] = useState([]);
  const [qpUploadStatus, setQpUploadStatus] = useState(null);

  // Notes state
  const [notesSelectedSemester, setNotesSelectedSemester] = useState(null);
  const [notesSelectedSubject, setNotesSelectedSubject] = useState(null);
  const [notesSelectedAssessment, setNotesSelectedAssessment] = useState(null);
  const [notesIsDropdownOpen, setNotesIsDropdownOpen] = useState(false);
  const [notesFiles, setNotesFiles] = useState([]);
  const [notesUploadStatus, setNotesUploadStatus] = useState(null);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .shadow-lime {
          box-shadow: 0 20px 25px -5px rgba(101, 163, 13, 0.1), 0 10px 10px -5px rgba(101, 163, 13, 0.04);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-#DDF6D2 to-white">
        {/* Enhanced Header */}
       

        {/* Hero Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-serif animate-fade-in-up">
              Upload Academic Content
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-space leading-relaxed animate-fade-in-up">
              Upload question papers and notes for students. Select the appropriate semester and subject for organized content management.
            </p>
          </div>
        </section>

        {/* Upload Sections */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Question Papers Upload */}
            <UploadSection
              title="Question Papers"
              icon={FileText}
              type="questionpaper"
              selectedSemester={qpSelectedSemester}
              setSelectedSemester={setQpSelectedSemester}
              selectedSubject={qpSelectedSubject}
              setSelectedSubject={setQpSelectedSubject}
              selectedAssessment={qpSelectedAssessment}
              setSelectedAssessment={setQpSelectedAssessment}
              isDropdownOpen={qpIsDropdownOpen}
              setIsDropdownOpen={setQpIsDropdownOpen}
              files={qpFiles}
              setFiles={setQpFiles}
              uploadStatus={qpUploadStatus}
              setUploadStatus={setQpUploadStatus}
            />

            {/* Notes Upload */}
            <UploadSection
              title="Class Notes"
              icon={BookOpen}
              type="notes"
              selectedSemester={notesSelectedSemester}
              setSelectedSemester={setNotesSelectedSemester}
              selectedSubject={notesSelectedSubject}
              setSelectedSubject={setNotesSelectedSubject}
              selectedAssessment={notesSelectedAssessment}
              setSelectedAssessment={setNotesSelectedAssessment}
              isDropdownOpen={notesIsDropdownOpen}
              setIsDropdownOpen={setNotesIsDropdownOpen}
              files={notesFiles}
              setFiles={setNotesFiles}
              uploadStatus={notesUploadStatus}
              setUploadStatus={setNotesUploadStatus}
            />
          </div>
        </main>
      </div>
    </>
  );
}