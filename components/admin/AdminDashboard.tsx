import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, Save, RefreshCw } from 'lucide-react';
import KanbanBoard from './KanbanBoard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('cms');
    const [contacts, setContacts] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [cmsContent, setCmsContent] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            loadData();
        }
    }, [navigate]);

    const loadData = async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            // Load CMS Content
            const contentRes = await fetch(`${API_URL}/content`, { headers });
            const contentData = await contentRes.json();

            const contentMap: any = {};
            if (Array.isArray(contentData)) {
                contentData.forEach((item: any) => {
                    contentMap[item.key] = item.value;
                });
            }
            setCmsContent(prev => ({ ...prev, ...contentMap }));

            // Load Stats (if accessible)
            try {
                const statsRes = await fetch(`${API_URL}/admin/analytics`, { headers });
                if (statsRes.ok) setStats(await statsRes.json());
            } catch (e) { console.error("Stats load fail", e) }

            // Load Contacts
            try {
                const contactsRes = await fetch(`${API_URL}/admin/contacts`, { headers });
                if (contactsRes.ok) {
                    const contactsData = await contactsRes.json();
                    setContacts(contactsData.contacts || []);
                }
            } catch (e) { console.error("Contacts load fail", e) }

        } catch (error) {
            console.error(error);
            if ((error as any).status === 401) navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const handleCmsChange = (key: string, value: string) => {
        setCmsContent(prev => ({ ...prev, [key]: value }));
    };

    const saveCmsContent = async () => {
        setStatusMessage('Saving...');
        const token = localStorage.getItem('adminToken');

        const itemsToSave = Object.keys(cmsContent).map(key => ({
            key,
            value: cmsContent[key],
            section: 'landing'
        }));

        try {
            const res = await fetch(`${API_URL}/admin/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items: itemsToSave })
            });

            if (res.ok) {
                setStatusMessage('✅ Changes saved successfully!');
                setTimeout(() => setStatusMessage(''), 3000);
            } else {
                setStatusMessage('❌ Failed to save changes.');
            }
        } catch (error) {
            setStatusMessage('❌ Error saving changes.');
        }
    };

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        // Optimistic UI Update
        const originalContacts = [...contacts];
        setContacts(prev => prev.map((c: any) => c.id === id ? { ...c, status: newStatus } : c));

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/admin/contacts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) throw new Error('Failed to update');
        } catch (error) {
            console.error(error);
            // Revert on failure
            setContacts(originalContacts);
            setStatusMessage('❌ Failed to move contact');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white flex flex-col shadow-2xl">
                <div className="p-6 border-b border-indigo-800">
                    <h1 className="text-xl font-bold tracking-wider">Ishikawa Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-indigo-600 shadow-lg text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('cms')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cms' ? 'bg-indigo-600 shadow-lg text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
                    >
                        <FileText size={20} /> Edit Page Content
                    </button>
                    <button
                        onClick={() => setActiveTab('contacts')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'contacts' ? 'bg-indigo-600 shadow-lg text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
                    >
                        <Users size={20} /> CRM & Leads
                    </button>
                </nav>
                <div className="p-4 border-t border-indigo-800">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-red-100 transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center sticky top-0 z-30">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">
                        {activeTab === 'cms' ? 'Web Content Editor' : activeTab === 'contacts' ? 'CRM & Pipeline' : activeTab}
                    </h2>
                    <div className="flex items-center gap-4">
                        {statusMessage && <span className="text-sm font-semibold animate-pulse">{statusMessage}</span>}
                        <button onClick={loadData} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Refresh">
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </header>

                <main className="p-8">
                    {/* CMS TAB */}
                    {activeTab === 'cms' && (
                        <div className="max-w-4xl space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4">Hero Section Keys</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Hero Title', key: 'hero_title', type: 'text', placeholder: 'We are a digital agency...' },
                                        { label: 'Hero Subtitle', key: 'hero_subtitle', type: 'text', placeholder: 'Building products...' },
                                        { label: 'CTA Button Text', key: 'hero_cta', type: 'text', placeholder: 'Get Started' }
                                    ].map(field => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-bold text-gray-600 mb-2">{field.label}</label>
                                            <input
                                                type={field.type}
                                                value={cmsContent[field.key] || ''}
                                                onChange={(e) => handleCmsChange(field.key, e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4">About / Slider Text</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-600 mb-2">Who We Are Title</label>
                                            <input
                                                value={cmsContent['who_we_are_title'] || ''}
                                                onChange={(e) => handleCmsChange('who_we_are_title', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sticky bottom-6 flex justify-end">
                                <button
                                    onClick={saveCmsContent}
                                    className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full shadow-xl hover:bg-green-700 hover:scale-105 transition-all font-bold"
                                >
                                    <Save size={20} /> Save All Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h4 className="text-gray-500 font-medium">Total Views</h4>
                                <p className="text-4xl font-bold text-indigo-600 mt-2">{stats.totalViews || 0}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h4 className="text-gray-500 font-medium">Form Submissions</h4>
                                <p className="text-4xl font-bold text-green-600 mt-2">{stats.totalSubmissions || 0}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h4 className="text-gray-500 font-medium">Chat Interactions</h4>
                                <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalChatbot || 0}</p>
                            </div>
                        </div>
                    )}

                    {/* CONTACTS / CRM TAB */}
                    {activeTab === 'contacts' && (
                        <div className="space-y-6">
                            {/* View Toggle */}
                            <div className="flex bg-white w-fit p-1 rounded-lg border shadow-sm">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    List View
                                </button>
                                <button
                                    onClick={() => setViewMode('kanban')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'kanban' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Pipeline Board
                                </button>
                            </div>

                            {viewMode === 'kanban' ? (
                                <KanbanBoard contacts={contacts} onUpdateStatus={handleUpdateStatus} isLoading={loading} />
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
                                            <tr>
                                                <th className="p-4">Lead Score</th>
                                                <th className="p-4">Name</th>
                                                <th className="p-4">Company</th>
                                                <th className="p-4">Service</th>
                                                <th className="p-4">Source</th>
                                                <th className="p-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {contacts.map((contact: any) => (
                                                <tr key={contact.id} className="hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded font-bold text-xs ${contact.lead_score >= 40 ? 'bg-red-100 text-red-600' :
                                                            contact.lead_score >= 20 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                                            }`}>
                                                            {contact.lead_score}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="font-medium text-gray-900">{contact.name}</div>
                                                        <div className="text-xs text-gray-500">{contact.email}</div>
                                                    </td>
                                                    <td className="p-4 text-gray-600">{contact.company || '-'}</td>
                                                    <td className="p-4 text-gray-600">{contact.service}</td>
                                                    <td className="p-4 text-xs text-gray-500 space-x-1">
                                                        {contact.source === 'chatbot' && (
                                                            <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded border border-purple-100 font-bold">
                                                                Bot 🤖
                                                            </span>
                                                        )}
                                                        {contact.utm_source ? (
                                                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
                                                                {contact.utm_source}
                                                            </span>
                                                        ) : 'Direct'}
                                                    </td>
                                                    <td className="p-4">
                                                        <select
                                                            value={contact.status || 'New'}
                                                            onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                                                            className={`px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${contact.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                                contact.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                                    contact.status === 'Closed-Won' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                                }`}
                                                        >
                                                            <option value="New">New</option>
                                                            <option value="Contacted">Contacted</option>
                                                            <option value="Qualified">Qualified</option>
                                                            <option value="Proposal">Proposal</option>
                                                            <option value="Closed-Won">Won</option>
                                                            <option value="Lost">Lost</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                            {contacts.length === 0 && (
                                                <tr><td colSpan={6} className="p-8 text-center text-gray-400">No leads found.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
