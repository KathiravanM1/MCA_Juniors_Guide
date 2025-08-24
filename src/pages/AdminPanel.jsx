import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { 
  Users, 
  BookOpen, 
  Brain, 
  FolderOpen, 
  FileText, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  Settings,
  ChevronDown,
  Calendar,
  Star,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingSeniors, setPendingSeniors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch pending seniors on component mount
  useEffect(() => {
    if (activeTab === 'approvals') {
      fetchPendingSeniors();
    }
  }, [activeTab]);

  const fetchPendingSeniors = async () => {
    setLoading(true);
    const result = await adminService.getPendingSeniors();
    if (result.success) {
      setPendingSeniors(result.data);
    } else {
      setMessage('Failed to fetch pending seniors');
    }
    setLoading(false);
  };

  const handleApproveSenior = async (userId) => {
    const result = await adminService.approveSenior(userId);
    if (result.success) {
      setMessage('Senior approved successfully!');
      fetchPendingSeniors(); // Refresh the list
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Failed to approve senior');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRejectSenior = async (userId) => {
    if (window.confirm('Are you sure you want to reject this senior application?')) {
      const result = await adminService.rejectSenior(userId);
      if (result.success) {
        setMessage('Senior application rejected');
        fetchPendingSeniors(); // Refresh the list
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to reject senior');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };
  const [users, setUsers] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'junior', joinDate: '2024-01-15', status: 'active' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'senior', joinDate: '2023-08-20', status: 'active' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', role: 'junior', joinDate: '2024-02-01', status: 'inactive' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', role: 'senior', joinDate: '2023-07-10', status: 'active' }
  ]);

  const [interviewExperiences, setInterviewExperiences] = useState([
    { id: 1, title: 'Google SDE Interview', company: 'Google', author: 'Priya Patel', status: 'pending', submittedDate: '2024-08-10', rating: 5 },
    { id: 2, title: 'Microsoft Internship Experience', company: 'Microsoft', author: 'Amit Singh', status: 'approved', submittedDate: '2024-08-08', rating: 4 },
    { id: 3, title: 'Amazon ML Engineer', company: 'Amazon', author: 'Neha Raj', status: 'rejected', submittedDate: '2024-08-05', rating: 3 }
  ]);

  const [problemSolutions, setProblemSolutions] = useState([
    { id: 1, title: 'Dynamic Programming Approaches', category: 'Algorithms', author: 'Rohit Kumar', status: 'pending', submittedDate: '2024-08-12', difficulty: 'Hard' },
    { id: 2, title: 'Binary Search Variations', category: 'Data Structures', author: 'Anita Sharma', status: 'approved', submittedDate: '2024-08-09', difficulty: 'Medium' },
    { id: 3, title: 'Graph Traversal Methods', category: 'Algorithms', author: 'Vikash Jain', status: 'pending', submittedDate: '2024-08-11', difficulty: 'Hard' }
  ]);

  const [projectGuidelines, setProjectGuidelines] = useState([
    { id: 1, title: 'Full Stack Web Development Guide', category: 'Web Development', author: 'Sanjay Patel', status: 'approved', submittedDate: '2024-08-07', views: 245 },
    { id: 2, title: 'Machine Learning Project Roadmap', category: 'AI/ML', author: 'Kavya Singh', status: 'pending', submittedDate: '2024-08-13', views: 0 },
    { id: 3, title: 'Mobile App Development Best Practices', category: 'Mobile Development', author: 'Arjun Mehta', status: 'pending', submittedDate: '2024-08-10', views: 0 }
  ]);

  const [academicResources, setAcademicResources] = useState([
    { id: 1, title: 'Database Management Systems - Sem 1', type: 'Question Paper', semester: '1', subject: 'DBMS', uploadDate: '2024-08-01', downloads: 156 },
    { id: 2, title: 'Data Structures Notes', type: 'Study Material', semester: '2', subject: 'DSA', uploadDate: '2024-08-03', downloads: 203 },
    { id: 3, title: 'Operating Systems - Mid Term', type: 'Question Paper', semester: '2', subject: 'OS', uploadDate: '2024-08-05', downloads: 87 }
  ]);

  const handlePromoteUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: user.role === 'junior' ? 'senior' : 'junior' } : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleApproveContent = (contentType, itemId) => {
    switch(contentType) {
      case 'interview':
        setInterviewExperiences(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'approved' } : item
        ));
        break;
      case 'problem':
        setProblemSolutions(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'approved' } : item
        ));
        break;
      case 'project':
        setProjectGuidelines(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'approved' } : item
        ));
        break;
    }
  };

  const handleRejectContent = (contentType, itemId) => {
    switch(contentType) {
      case 'interview':
        setInterviewExperiences(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'rejected' } : item
        ));
        break;
      case 'problem':
        setProblemSolutions(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'rejected' } : item
        ));
        break;
      case 'project':
        setProjectGuidelines(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'rejected' } : item
        ));
        break;
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily: 'Space Grotesk'}}>
          MCA Admin
        </h1>
        <p className="text-sm text-gray-600 mt-1">Resource Portal</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'approvals', label: 'Senior Approvals', icon: Users },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'interviews', label: 'Interview Experiences', icon: BookOpen },
            { id: 'problems', label: 'Problem Solving', icon: Brain },
            { id: 'projects', label: 'Project Guidelines', icon: FolderOpen },
            { id: 'academics', label: 'Academic Resources', icon: FileText }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg mb-1 transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#ECFAE5] to-[#DDF6D2] text-green-800 border-l-4 border-green-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{fontFamily: 'Space Grotesk'}}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600" style={{fontFamily: 'Space Grotesk'}}>{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2" style={{fontFamily: 'Instrument Serif'}}>{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1">↑ {trend}% from last month</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>Dashboard Overview</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={users.length} 
          icon={Users} 
          color="bg-blue-500"
          trend={12}
        />
        <StatCard 
          title="Pending Approvals" 
          value={pendingSeniors.length} 
          icon={AlertTriangle} 
          color="bg-orange-500"
        />
        <StatCard 
          title="Total Resources" 
          value={academicResources.length} 
          icon={FileText} 
          color="bg-green-500"
          trend={8}
        />
        <StatCard 
          title="Active Seniors" 
          value={users.filter(u => u.role === 'senior' && u.status === 'active').length} 
          icon={Star} 
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Space Grotesk'}}>Recent Submissions</h3>
          <div className="space-y-3">
            {[...interviewExperiences, ...problemSolutions, ...projectGuidelines]
              .filter(item => item.status === 'pending')
              .slice(0, 5)
              .map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">by {item.author}</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Space Grotesk'}}>User Activity</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'senior' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>User Management</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Join Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'senior' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handlePromoteUser(user.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title={user.role === 'junior' ? 'Promote to Senior' : 'Demote to Junior'}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ContentTable = ({ data, type, onApprove, onReject }) => (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Date</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  {item.category && <div className="text-sm text-gray-600">{item.category}</div>}
                  {item.company && <div className="text-sm text-gray-600">{item.company}</div>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === 'approved' ? 'bg-green-100 text-green-800' :
                    item.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.submittedDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    {item.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => onApprove(type, item.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onReject(type, item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const InterviewExperiences = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>Interview Experiences</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search experiences..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600" style={{fontFamily: 'Instrument Serif'}}>
            {interviewExperiences.filter(item => item.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-orange-600" style={{fontFamily: 'Instrument Serif'}}>
            {interviewExperiences.filter(item => item.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600" style={{fontFamily: 'Instrument Serif'}}>
            {interviewExperiences.filter(item => item.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      <ContentTable 
        data={interviewExperiences} 
        type="interview"
        onApprove={handleApproveContent}
        onReject={handleRejectContent}
      />
    </div>
  );

  const ProblemSolving = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>Problem Solving Resources</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search problems..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Category
          </button>
        </div>
      </div>

      <ContentTable 
        data={problemSolutions} 
        type="problem"
        onApprove={handleApproveContent}
        onReject={handleRejectContent}
      />
    </div>
  );

  const ProjectGuidelines = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>Project Guidelines</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search guidelines..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Category
          </button>
        </div>
      </div>

      <ContentTable 
        data={projectGuidelines} 
        type="project"
        onApprove={handleApproveContent}
        onReject={handleRejectContent}
      />
    </div>
  );

  const SeniorApprovals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>Senior Approvals</h1>
        <button 
          onClick={fetchPendingSeniors}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Refresh
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') || message.includes('approved') 
            ? 'bg-green-50 border border-green-200 text-green-600' 
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-orange-600" style={{fontFamily: 'Instrument Serif'}}>
            {pendingSeniors.length}
          </div>
          <div className="text-sm text-gray-600">Pending Approvals</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600" style={{fontFamily: 'Instrument Serif'}}>
            {users.filter(u => u.role === 'senior' && u.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Approved Seniors</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600" style={{fontFamily: 'Instrument Serif'}}>
            {users.filter(u => u.role === 'student').length}
          </div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          {pendingSeniors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pending senior approvals
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>User Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Registration Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingSeniors.map((senior) => (
                    <tr key={senior._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {senior.firstName} {senior.lastName}
                          </div>
                          <div className="text-sm text-gray-600">{senior.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(senior.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          Pending Approval
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleApproveSenior(senior._id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            title="Approve Senior"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectSenior(senior._id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                            title="Reject Senior"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const AcademicResources = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Instrument Serif'}}>Academic Resources</h1>
        <div className="flex space-x-3">
          <Link to={"resources"} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" aria-label="Upload Resource">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resource
        </Link>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Resource</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Semester</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Upload Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Downloads</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900" style={{fontFamily: 'Space Grotesk'}}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {academicResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      resource.type === 'Question Paper' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Semester {resource.semester}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resource.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resource.uploadDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resource.downloads}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'approvals':
        return <SeniorApprovals />;
      case 'users':
        return <UserManagement />;
      case 'interviews':
        return <InterviewExperiences />;
      case 'problems':
        return <ProblemSolving />;
      case 'projects':
        return <ProjectGuidelines />;
      case 'academics':
        return <AcademicResources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{
      backgroundColor: '#ECFAE5',
      fontFamily: 'Space Grotesk'
    }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-800" style={{fontFamily: 'Space Grotesk'}}>
                Admin Dashboard
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Admin User</div>
                  <div className="text-gray-600">admin@mcaportl.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )};

export default AdminPanel;