import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Briefcase, LogOut, Save, X, HelpCircle } from 'lucide-react';

interface Project {
  id?: number;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  status: string;
  details: string;
}

interface TeamMember {
  id?: number;
  name: string;
  position: string;
  specialization: string;
  email: string;
  phone: string;
  image: string;
  experience: string;
  education: string;
  bio?: string;
  certifications?: string;
  location?: string;
}

interface FAQ {
  id?: number;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
}

const API = 'http://localhost:5000/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'team' | 'faqs'>('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showFAQForm, setShowFAQForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Load data from API
  useEffect(() => {
    loadProjects();
    loadTeamMembers();
    loadFAQs();
  }, []);

  // --- PROJECTS ---
  const loadProjects = () => {
    fetch(`${API}/projects`)
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  };

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    fetch(`${API}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
      .then(() => {
        loadProjects();
        setShowProjectForm(false);
      });
  };

  const handleEditProject = (projectData: Project) => {
    if (!projectData.id) return;
    fetch(`${API}/projects/${projectData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
      .then(() => {
        loadProjects();
        setEditingProject(null);
      });
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      fetch(`${API}/projects/${id}`, { method: 'DELETE' })
        .then(() => loadProjects());
    }
  };

  // --- TEAM MEMBERS ---
  const loadTeamMembers = () => {
    fetch(`${API}/team`)
      .then(res => res.json())
      .then(setTeamMembers)
      .catch(() => setTeamMembers([]));
  };

  const handleAddTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    fetch(`${API}/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData)
    })
      .then(() => {
        loadTeamMembers();
        setShowTeamForm(false);
      });
  };

  const handleEditTeamMember = (memberData: TeamMember) => {
    if (!memberData.id) return;
    fetch(`${API}/team/${memberData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData)
    })
      .then(() => {
        loadTeamMembers();
        setEditingTeamMember(null);
      });
  };

  const handleDeleteTeamMember = (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      fetch(`${API}/team/${id}`, { method: 'DELETE' })
        .then(() => loadTeamMembers());
    }
  };

  // --- FAQ ---
  const loadFAQs = () => {
    fetch(`${API}/faqs`)
      .then(res => res.json())
      .then(setFaqs)
      .catch(() => setFaqs([]));
  };

  const handleAddFAQ = (faqData: Omit<FAQ, 'id'>) => {
    fetch(`${API}/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faqData)
    })
      .then(() => {
        loadFAQs();
        setShowFAQForm(false);
      });
  };

  const handleEditFAQ = (faqData: FAQ) => {
    if (!faqData.id) return;
    fetch(`${API}/faqs/${faqData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faqData)
    })
      .then(() => {
        loadFAQs();
        setEditingFAQ(null);
      });
  };

  const handleDeleteFAQ = (id: number) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      fetch(`${API}/faqs/${id}`, { method: 'DELETE' })
        .then(() => loadFAQs());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  // ...rest of your component (UI, forms) remains unchanged...
  // Paste your existing UI code here (from your previous AdminPanel.tsx)
  // No changes needed to the form components

  // --- UI code below (unchanged) ---
  // ...existing code...
  // (Paste the rest of your AdminPanel.tsx file here, starting from the return statement)
  // ...existing code...


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img src="/logo2 copy.png" alt="Waheedsons" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Projects ({projects.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Members ({teamMembers.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'faqs'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>FAQs ({faqs.length})</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Projects Management</h2>
              <button
                onClick={() => setShowProjectForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => project.id && handleDeleteProject(project.id)}
                          className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{project.duration}</span>
                      <span className="text-green-600 font-medium">{project.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Team Management</h2>
              <button
                onClick={() => setShowTeamForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-green-600 font-medium mb-2">{member.position}</p>
                        <p className="text-gray-600 text-sm">{member.specialization}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingTeamMember(member)}
                          className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => member.id && handleDeleteTeamMember(member.id)}
                          className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>{member.email}</p>
                      <p>{member.phone}</p>
                      <p className="mt-2 font-medium">{member.experience}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">FAQs Management</h2>
              <button
                onClick={() => setShowFAQForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 mb-3">{faq.answer}</p>
                      <div className="flex items-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {faq.category}
                        </span>
                        <span className="text-sm text-gray-500">Order: {faq.order_index}</span>
                        <span className={`text-sm ${faq.is_active ? 'text-green-600' : 'text-red-600'}`}>
                          {faq.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setEditingFAQ(faq)}
                        className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => faq.id && handleDeleteFAQ(faq.id)}
                        className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Forms */}
      {(showProjectForm || editingProject) && (
        <ProjectForm
          project={editingProject}
          onSave={editingProject ? handleEditProject : handleAddProject}
          onCancel={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
        />
      )}

      {(showTeamForm || editingTeamMember) && (
        <TeamMemberForm
          member={editingTeamMember}
          onSave={editingTeamMember ? handleEditTeamMember : handleAddTeamMember}
          onCancel={() => {
            setShowTeamForm(false);
            setEditingTeamMember(null);
          }}
        />
      )}

      {(showFAQForm || editingFAQ) && (
        <FAQForm
          faq={editingFAQ}
          onSave={editingFAQ ? handleEditFAQ : handleAddFAQ}
          onCancel={() => {
            setShowFAQForm(false);
            setEditingFAQ(null);
          }}
        />
      )}
    </div>
  );
};

// Project Form Component
const ProjectForm: React.FC<{
  project?: Project | null;
  onSave: (project: any) => void;
  onCancel: () => void;
}> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || '',
    description: project?.description || '',
    image: project?.image || '',
    duration: project?.duration || '',
    status: project?.status || 'In Progress',
    details: project?.details || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      ...(project && { id: project.id })
    };
    onSave(projectData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              <option value="Solar Systems">Solar Systems</option>
              <option value="EV Charging">EV Charging</option>
              <option value="Battery Chargers">Battery Chargers</option>
              <option value="Repair Service">Repair Service</option>
              <option value="Technical Consultancy">Technical Consultancy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 2 days"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Details (comma-separated)</label>
            <input
              type="text"
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Solar Panels, Inverter, Battery Storage"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Save className="h-5 w-5" />
              <span>{project ? 'Update Project' : 'Add Project'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Team Member Form Component
const TeamMemberForm: React.FC<{
  member?: TeamMember | null;
  onSave: (member: any) => void;
  onCancel: () => void;
}> = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    position: member?.position || '',
    specialization: member?.specialization || '',
    email: member?.email || '',
    phone: member?.phone || '',
    image: member?.image || '',
    experience: member?.experience || '',
    education: member?.education || '',
    bio: member?.bio || '',
    certifications: member?.certifications || '',
    location: member?.location || 'Lahore, Pakistan'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData = {
      ...formData,
      ...(member && { id: member.id })
    };
    onSave(memberData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {member ? 'Edit Team Member' : 'Add New Team Member'}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 5+ Years"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., B.Sc Electrical Engineering"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Brief biography..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications (comma-separated)</label>
            <input
              type="text"
              value={formData.certifications}
              onChange={(e) => setFormData({...formData, certifications: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., PV System Design, Energy Storage Systems"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Lahore, Pakistan"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Save className="h-5 w-5" />
              <span>{member ? 'Update Member' : 'Add Member'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// FAQ Form Component
const FAQForm: React.FC<{
  faq?: FAQ | null;
  onSave: (faq: any) => void;
  onCancel: () => void;
}> = ({ faq, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'General',
    order_index: faq?.order_index || 0,
    is_active: faq?.is_active !== undefined ? faq.is_active : true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const faqData = {
      ...formData,
      ...(faq && { id: faq.id })
    };
    onSave(faqData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {faq ? 'Edit FAQ' : 'Add New FAQ'}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({...formData, answer: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="General">General</option>
                <option value="Solar Systems">Solar Systems</option>
                <option value="EV Charging">EV Charging</option>
                <option value="Services">Services</option>
                <option value="Repair Services">Repair Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Active (visible on website)</span>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Save className="h-5 w-5" />
              <span>{faq ? 'Update FAQ' : 'Add FAQ'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;