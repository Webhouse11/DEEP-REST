
import React, { useState, useEffect, useRef } from 'react';
import { storageService } from '../services/storageService';
import { generateDailyArticle } from '../services/geminiService';
import { Post, AdConfig, SiteSettings, Category } from '../types';
import { FileText, Settings, Megaphone, Plus, Trash2, Edit, RefreshCw, Home, X, Save, Image as ImageIcon, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ads, setAds] = useState<AdConfig[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(storageService.getSettings());
  const [activeTab, setActiveTab] = useState<'posts' | 'ads' | 'settings'>('posts');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Post Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<Partial<Post>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(storageService.getPosts());
    setAds(storageService.getAds());
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        alert("Gemini API key is required in process.env.API_KEY");
        return;
      }
      const newPost = await generateDailyArticle(apiKey);
      storageService.savePost(newPost as Post);
      setPosts(storageService.getPosts());
      alert("Article generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate article.");
    } finally {
      setIsGenerating(false);
    }
  };

  const openEditForm = (post: Post) => {
    setEditingPost(post);
    setFormData(post);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingPost(null);
    setFormData({
      category: Category.RECOVERY,
      author: "Editor",
      date: new Date().toISOString(),
      imageUrl: '',
    });
    setIsFormOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert("Title and Slug are required.");
      return;
    }

    const postToSave: Post = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title || '',
      slug: formData.slug || '',
      summary: formData.summary || '',
      content: formData.content || '',
      category: formData.category || Category.RECOVERY,
      author: formData.author || 'Editor',
      date: formData.date || new Date().toISOString(),
      imageUrl: formData.imageUrl || 'https://picsum.photos/1200/800',
      seoTitle: formData.seoTitle || formData.title || '',
      metaDescription: formData.metaDescription || formData.summary || '',
      keywords: formData.keywords || [],
      canonicalUrl: formData.canonicalUrl || `https://deeprestjournal.com/${formData.slug}`,
      altText: formData.altText || formData.title || '',
    };

    storageService.savePost(postToSave);
    setPosts(storageService.getPosts());
    setIsFormOpen(false);
    setEditingPost(null);
    setFormData({});
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      storageService.deletePost(id);
      setPosts(storageService.getPosts());
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex flex-col fixed inset-y-0">
        <div className="p-6 border-b border-zinc-800">
           <h2 className="text-xl font-black serif italic text-rose-600">EDITOR HUB</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
           <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${activeTab === 'posts' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
              <FileText size={18} /> Posts Manager
           </button>
           <button onClick={() => setActiveTab('ads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${activeTab === 'ads' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
              <Megaphone size={18} /> Monetization
           </button>
           <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${activeTab === 'settings' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
              <Settings size={18} /> Site Settings
           </button>
        </nav>
        <div className="p-4 border-t border-zinc-800">
           <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-white transition">
              <Home size={18} /> View Public Site
           </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
              {activeTab === 'posts' && 'Content Library'}
              {activeTab === 'ads' && 'Ad Management'}
              {activeTab === 'settings' && 'Global Configurations'}
           </h1>
           {activeTab === 'posts' && (
             <div className="flex gap-4">
                <button onClick={handleGenerate} disabled={isGenerating} className="bg-zinc-800 text-white px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-700 transition disabled:opacity-50">
                   {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />} 
                   AI Auto-Post
                </button>
                <button onClick={openCreateForm} className="bg-rose-600 text-white px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-rose-700 transition">
                   <Plus size={14} /> Manual Post
                </button>
             </div>
           )}
        </header>

        {activeTab === 'posts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 text-xs font-black text-gray-500 uppercase tracking-widest border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-gray-800 max-w-md truncate">{post.title}</td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-[10px] font-black uppercase py-1 px-2 rounded-full">{post.category}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-3">
                         <button onClick={() => openEditForm(post)} className="text-gray-400 hover:text-rose-600 transition" title="Edit">
                           <Edit size={16} />
                         </button>
                         <button onClick={() => handleDeletePost(post.id)} className="text-gray-400 hover:text-red-600 transition" title="Delete">
                           <Trash2 size={16} />
                         </button>
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        )}

        {/* Post Editor Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <header className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-black uppercase tracking-tight text-gray-800">
                  {editingPost ? 'Edit Article' : 'Create New Article'}
                </h3>
                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                  <X size={24} />
                </button>
              </header>
              <form onSubmit={handleSavePost} className="p-6 overflow-y-auto space-y-6">
                
                {/* Image Management Section */}
                <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3">Feature Image</label>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                  />

                  {formData.imageUrl ? (
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-grow">
                        <div className="flex gap-2">
                          <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                          >
                            <Edit size={14} /> Change Image
                          </button>
                          <button 
                            type="button"
                            onClick={removeImage}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 italic break-all">
                          Current Attachment: {formData.imageUrl.startsWith('data:') ? 'Local Upload' : formData.imageUrl}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl hover:border-rose-300 hover:bg-rose-50 transition group"
                    >
                      <div className="bg-white p-3 rounded-full shadow-sm text-gray-400 group-hover:text-rose-500 transition">
                        <Upload size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-500 group-hover:text-rose-600">Click to upload or drag image here</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">Supports JPG, PNG, WEBP</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Title</label>
                    <input 
                      type="text" 
                      value={formData.title || ''} 
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter article title"
                      className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Slug</label>
                    <input 
                      type="text" 
                      value={formData.slug || ''} 
                      onChange={e => setFormData({...formData, slug: e.target.value})}
                      placeholder="url-friendly-slug"
                      className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Category</label>
                    <select 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-rose-500 outline-none"
                    >
                      {Object.values(Category).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Author</label>
                    <input 
                      type="text" 
                      value={formData.author || ''} 
                      onChange={e => setFormData({...formData, author: e.target.value})}
                      placeholder="Author name"
                      className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Summary</label>
                  <textarea 
                    value={formData.summary || ''} 
                    onChange={e => setFormData({...formData, summary: e.target.value})}
                    placeholder="Brief description for social media and search engines"
                    className="w-full border border-gray-200 p-2 rounded h-20 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Content (HTML)</label>
                  <textarea 
                    value={formData.content || ''} 
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    placeholder="Enter the main body of your article..."
                    className="w-full border border-gray-200 p-2 rounded h-40 font-mono text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>

                {/* Legacy URL field - hidden but kept for compatibility/manual fixes */}
                <details className="text-[10px] text-gray-400">
                  <summary className="cursor-pointer hover:text-gray-600 mb-2">Advanced SEO & Metadata</summary>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase mb-1">Manual Image URL override</label>
                      <input 
                        type="text" 
                        value={formData.imageUrl || ''} 
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full border border-gray-100 p-2 rounded text-[10px] outline-none"
                      />
                    </div>
                  </div>
                </details>
              </form>
              <footer className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                <button onClick={handleSavePost} className="bg-rose-600 text-white px-6 py-2 rounded font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-rose-700 transition shadow-lg shadow-rose-200">
                  <Save size={16} /> Save Changes
                </button>
              </footer>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-6">
             {ads.map(ad => (
               <div key={ad.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-gray-800">{ad.placement}</h3>
                     <label className="flex items-center cursor-pointer">
                        <input type="checkbox" checked={ad.active} onChange={(e) => {
                          const newAds = ads.map(a => a.id === ad.id ? { ...a, active: e.target.checked } : a);
                          setAds(newAds);
                          storageService.saveAds(newAds);
                        }} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600 relative"></div>
                     </label>
                  </div>
                  <textarea 
                    value={ad.code} 
                    onChange={(e) => {
                      const newAds = ads.map(a => a.id === ad.id ? { ...a, code: e.target.value } : a);
                      setAds(newAds);
                      storageService.saveAds(newAds);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs focus:ring-2 focus:ring-rose-500 outline-none h-24"
                  />
               </div>
             ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
             <div className="space-y-8">
                <div>
                   <label className="block text-xs font-black uppercase text-gray-400 mb-2">Website Name</label>
                   <input type="text" value={settings.siteName} onChange={(e) => {
                      const newSettings = { ...settings, siteName: e.target.value };
                      setSettings(newSettings);
                      storageService.saveSettings(newSettings);
                   }} className="w-full border border-gray-200 p-3 rounded-md focus:ring-2 focus:ring-rose-500 outline-none" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                   <div>
                      <h4 className="font-bold text-sm">Push Notifications</h4>
                      <p className="text-xs text-gray-500">Enable automatic browser notifications for new posts.</p>
                   </div>
                   <input type="checkbox" checked={settings.pushEnabled} onChange={(e) => {
                      const newSettings = { ...settings, pushEnabled: e.target.checked };
                      setSettings(newSettings);
                      storageService.saveSettings(newSettings);
                   }} className="cursor-pointer h-5 w-5 accent-rose-600" />
                </div>
                <button 
                  onClick={() => alert("Settings saved successfully!")}
                  className="bg-rose-600 text-white w-full py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-rose-700 transition shadow-lg shadow-rose-200"
                >
                  Save Settings
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
