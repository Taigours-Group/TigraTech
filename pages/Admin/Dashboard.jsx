import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Edit2, LogOut, LayoutDashboard, 
  Database, FileText, User, Calendar, Image as ImageIcon,
  ExternalLink, Github, CheckCircle2
} from 'lucide-react';
import { dbService } from '../../services/dbService.js';
import { ClientType } from '../../types.js';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'blogs'
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '', // Maps to 'excerpt' for blogs
    content: '',     // Blog only
    techStack: '',   // Project only (stored as string for UI)
    clientType: ClientType.EXTERNAL, // Project only
    author: '',      // Blog only
    date: new Date().toISOString().split('T')[0], // Blog only
    imageUrl: 'picsum.photos',
    liveUrl: '#',    // Project only
    githubUrl: '',   // Project only
    featured: false  // Project only
  });

  useEffect(() => {
    if (!dbService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    const data = activeTab === 'projects' 
      ? await dbService.getProjects() 
      : await dbService.getBlogs();
    setItems(data || []);
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      id: '', title: '', description: '', content: '', techStack: '',
      clientType: ClientType.EXTERNAL, author: '', 
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'picsum.photos',
      liveUrl: '#', githubUrl: '', featured: false
    });
  };

  const startEdit = (item) => {
    setFormData({
      ...item,
      // Map JSON 'excerpt' to Form 'description' for blogs
      description: activeTab === 'blogs' ? item.excerpt : item.description,
      // Map JSON Array to Form String for projects
      techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : ''
    });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const itemId = formData.id || `${activeTab === 'projects' ? 'p' : 'b'}_${Date.now()}`;

    if (activeTab === 'projects') {
      const projectPayload = {
        id: itemId,
        title: formData.title,
        description: formData.description,
        techStack: typeof formData.techStack === 'string' 
          ? formData.techStack.split(',').map(s => s.trim()).filter(s => s !== "")
          : formData.techStack,
        clientType: formData.clientType,
        imageUrl: formData.imageUrl,
        featured: formData.featured,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl
      };
      await dbService.saveProject(projectPayload);
    } else {
      const blogPayload = {
        id: itemId,
        title: formData.title,
        excerpt: formData.description, // Correctly mapped to blog schema
        content: formData.content,
        date: formData.date,
        author: formData.author,
        imageUrl: formData.imageUrl
      };
      await dbService.saveBlog(blogPayload);
    }

    setIsEditing(false);
    loadData();
    resetForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Permanently delete this ${activeTab.slice(0, -1)}?`)) {
      activeTab === 'projects' ? await dbService.deleteProject(id) : await dbService.deleteBlog(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#050505] border-r border-white/5 p-8 flex flex-col">
        <div className="flex items-center gap-3 text-white font-black text-xl mb-12 tracking-tighter">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} />
          </div>
          TIGRA ADMIN
        </div>
        
        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => { setActiveTab('projects'); setIsEditing(false); }} 
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
          >
            <Database size={20} /> Projects
          </button>
          <button 
            onClick={() => { setActiveTab('blogs'); setIsEditing(false); }} 
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'blogs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
          >
            <FileText size={20} /> Blogs
          </button>
        </nav>

        <button 
          onClick={() => { dbService.logout(); navigate('/'); }} 
          className="mt-auto flex items-center gap-3 px-5 py-4 text-red-500 font-bold hover:bg-red-500/10 rounded-2xl transition-colors"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight capitalize">{activeTab}</h1>
              <p className="text-gray-500 mt-1">Manage your platform content for 2026.</p>
            </div>
            {!isEditing && (
              <button 
                onClick={() => { resetForm(); setIsEditing(true); }} 
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-transform active:scale-95"
              >
                <Plus size={20} strokeWidth={3} /> ADD NEW
              </button>
            )}
          </div>

          {isEditing ? (
            /* FORM SECTION */
            <form onSubmit={handleSave} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dynamic Left Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-colors" placeholder="Enter title..." />
                  </div>

                  {activeTab === 'projects' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Client Type</label>
                      <select value={formData.clientType} onChange={e => setFormData({...formData, clientType: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500">
                        {Object.values(ClientType).map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Author Name</label>
                      <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" placeholder="e.g. Chief Architect" />
                    </div>
                  )}
                </div>

                {/* Dynamic Right Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Feature Image URL</label>
                    <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" placeholder="https://..." />
                  </div>

                  {activeTab === 'projects' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Tech Stack (CSV)</label>
                      <input value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" placeholder="React, Tailwind, Node.js" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Publish Date</label>
                      <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description / Excerpt */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
                  {activeTab === 'projects' ? 'Project Description' : 'Blog Excerpt (Summary)'}
                </label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white h-24 outline-none focus:border-blue-500 resize-none" placeholder="Provide a brief overview..." />
              </div>

              {/* Blog Content Only */}
              {activeTab === 'blogs' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Full Article Content</label>
                  <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white h-64 outline-none focus:border-blue-500 resize-none" placeholder="Write your long-form content here..." />
                </div>
              )}

              {/* Project URLs Only */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Live Demo URL</label>
                    <input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">GitHub Repository URL</label>
                    <input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black transition-all transform active:scale-[0.98]">
                  CONFIRM & SAVE
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-5 rounded-2xl font-black transition-all">
                  DISCARD
                </button>
              </div>
            </form>
          ) : (
            /* LIST SECTION */
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-bold animate-pulse">SYNCHRONIZING...</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center group hover:border-blue-600/40 transition-all duration-300"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex gap-6 items-center w-full">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 border border-white/10 shrink-0">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                        <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-tighter">
                          {activeTab === 'projects' ? (
                            <span className="text-blue-500 font-bold px-2 py-0.5 bg-blue-500/10 rounded-md border border-blue-500/20">{item.clientType}</span>
                          ) : (
                            <span className="flex items-center font-bold gap-1 text-blue-500"><User size={12} strokeWidth={3}/> {item.author}</span>
                          )}
                          <span className="flex items-center font-bold gap-1 text-gray-500"><Calendar size={12} strokeWidth={3}/> {item.date || '2026-01-03'}</span>
                          {activeTab === 'projects' && (
                             <span className="text-gray-500 font-bold">{item.techStack?.length || 0} TECHNOLOGIES</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
                      <button onClick={() => startEdit(item)} className="flex-1 md:flex-none p-4 bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-2xl transition-all"><Edit2 size={20} /></button>
                      <button onClick={() => handleDelete(item.id)} className="flex-1 md:flex-none p-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))
              )}
              {!isLoading && items.length === 0 && (
                <div className="text-center py-20 bg-white/[0.01] rounded-[2.5rem] border border-dashed border-white/10">
                  <p className="text-gray-600 font-bold">No {activeTab} found in the database.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
