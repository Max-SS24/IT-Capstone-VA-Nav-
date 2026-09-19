import React, { useState } from 'react';
import { Screen } from '../types';
import {
  SearchIcon, PlusIcon, EditIcon, TrashIcon, ArchiveIcon,
  CheckCircleIcon, ClockIcon, BarChart2Icon, UsersIcon, FileTextIcon,
  SettingsIcon, GridIcon, ListIcon, XIcon, CheckIcon,
  AlertTriangleIcon, EyeIcon
} from '../components/Icons';

interface Props {
  onNavigate: (s: Screen) => void;
}

type AdminTab = 'dashboard' | 'resources' | 'queue' | 'users' | 'analytics' | 'reports' | 'settings';
type ResourceStatus = 'Approved' | 'Active' | 'In Review' | 'Needs Update' | 'Archived';

interface AdminResource {
  id: string;
  name: string;
  type: 'VA' | 'Community' | 'Crisis Support';
  area: string;
  status: ResourceStatus;
  lastVerified: string;
  submittedBy?: string;
  submittedDate?: string;
}

const RESOURCES: AdminResource[] = [
  { id: '1', name: 'VA Mental Health Services', type: 'VA', area: 'Nationwide', status: 'Approved', lastVerified: 'Apr 10, 2024' },
  { id: '2', name: '988 Veterans Crisis Line', type: 'Crisis Support', area: 'Nationwide', status: 'Approved', lastVerified: 'Apr 12, 2024' },
  { id: '3', name: 'Give an Hour', type: 'Community', area: 'Nationwide', status: 'Active', lastVerified: 'Nov 22, 2024' },
  { id: '4', name: 'Union Gospel Mission — Seattle', type: 'Community', area: 'Seattle, WA', status: 'Needs Update', lastVerified: 'Sep 14, 2024' },
  { id: '5', name: 'Navy Marine Corps Relief Society', type: 'Community', area: 'Nationwide', status: 'In Review', lastVerified: 'Mar 15, 2024', submittedBy: 'Sarah M.', submittedDate: 'Apr 24, 2024' },
  { id: '6', name: 'Trauma Recovery Center', type: 'Community', area: 'Nationwide', status: 'In Review', lastVerified: 'Mar 1, 2024', submittedBy: 'James L.', submittedDate: 'Apr 23, 2024' },
  { id: '7', name: 'VA Housing Assistance', type: 'VA', area: 'Nationwide', status: 'In Review', lastVerified: 'Feb 20, 2024', submittedBy: 'Emily K.', submittedDate: 'Apr 22, 2024' },
  { id: '8', name: 'VA Telehealth Services', type: 'VA', area: 'Nationwide', status: 'Approved', lastVerified: 'Dec 4, 2024' },
  { id: '9', name: 'VA Home Loan Program', type: 'VA', area: 'Nationwide', status: 'Needs Update', lastVerified: 'Aug 30, 2024' },
];

const QUEUE_ITEMS = RESOURCES.filter(r => r.status === 'In Review');

const RECENT_ACTIVITY = [
  { initials: 'SM', name: 'Sarah M.', action: 'approved a resource', detail: 'VA Mental Health Services', time: '10:24 AM' },
  { initials: 'JL', name: 'James L.', action: 'updated a resource', detail: 'Give an Hour', time: 'Apr 24, 2024' },
  { initials: 'EK', name: 'Emily K.', action: 'added a new resource', detail: 'Veterans Green Jobs', time: 'Apr 23, 2024' },
  { initials: 'SM', name: 'Sarah M.', action: 'changed status', detail: 'Community Care Network', time: 'Apr 22, 2024' },
];

const statusStyle = (status: ResourceStatus) => {
  if (status === 'Approved') return { bg: '#EBF3EC', text: '#4A6B50', dot: '#3A7A7A' };
  if (status === 'Active') return { bg: '#EDF6F6', text: '#2A5F5F', dot: '#3A7A7A' };
  if (status === 'In Review') return { bg: '#EEF2F8', text: '#2D4169', dot: '#4D6799' };
  if (status === 'Needs Update') return { bg: '#FDF5EA', text: '#6B4A20', dot: '#D4924A' };
  return { bg: '#F0EDE5', text: '#4D6799', dot: '#4D6799' };
};

const typeStyle = (type: AdminResource['type']) => {
  if (type === 'VA') return { bg: '#243658', text: '#B8C6DD' };
  if (type === 'Crisis Support') return { bg: '#2A1A18', text: '#E07B6E' };
  return { bg: '#1A2B20', text: '#82A588' };
};

const STATS = [
  { label: 'Total Resources', value: '1,248', trend: '+12%', trendUp: true, icon: <ListIcon size={18} />, iconColor: '#5CA5A5' },
  { label: 'Active Resources', value: '1,112', sub: '98% of total', trendUp: true, icon: <CheckCircleIcon size={18} />, iconColor: '#82A588' },
  { label: 'In Review', value: '24', trend: '-18%', trendUp: false, icon: <ClockIcon size={18} />, iconColor: '#4D6799' },
  { label: 'Needs Update', value: '112', trend: '-6%', trendUp: false, icon: <AlertTriangleIcon size={18} />, iconColor: '#E07B6E' },
];

function LeafIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ThreeDotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export default function AdminDashboard({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOk, setToastOk] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [openDotMenu, setOpenDotMenu] = useState<string | null>(null);
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '', description: '', type: 'VA', category: 'Mental Health',
    phone: '', website: '', area: '', hours: '', eligibility: '',
    sourceUrl: '', lastVerified: '', status: 'Active',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const toast = (msg: string, ok = true) => {
    setToastMsg(msg); setToastOk(ok);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const filteredResources = RESOURCES.filter(r => {
    const matchSearch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === 'All Types' || r.type === typeFilter;
    const matchStatus = statusFilter === 'All Statuses' || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Resource name is required.';
    if (!formData.description.trim()) errors.description = 'Description is required.';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required.';
    if (!formData.website.trim()) errors.website = 'Website URL is required.';
    if (!formData.area.trim()) errors.area = 'Service area is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setShowAddForm(false);
    toast('Resource saved successfully.');
    setFormData({ name: '', description: '', type: 'VA', category: 'Mental Health', phone: '', website: '', area: '', hours: '', eligibility: '', sourceUrl: '', lastVerified: '', status: 'Active' });
    setFormErrors({});
  };

  const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <GridIcon size={16} /> },
    { id: 'resources', label: 'Resources', icon: <ListIcon size={16} /> },
    { id: 'queue', label: 'Review Queue', icon: <ClockIcon size={16} /> },
    { id: 'users', label: 'Users', icon: <UsersIcon size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2Icon size={16} /> },
    { id: 'reports', label: 'Reports', icon: <FileTextIcon size={16} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0F1B30', color: '#EEF2F8' }}
      onClick={() => setOpenDotMenu(null)}>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col flex-shrink-0" style={{ width: 220, background: '#1C2B45', borderRight: '1px solid #243658' }}>
        {/* Logo */}
        <div className="p-5 flex items-center gap-2" style={{ borderBottom: '1px solid #243658' }}>
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#3A7A7A' }}>
            <LeafIcon size={13} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 700, fontSize: '0.9rem', color: '#EEF2F8' }}>VA Coach</span>
              <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: '#3A7A7A', color: '#fff' }}>Admin</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: '#4D6799' }}>Support Veterans. Stronger Communities.</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all"
              style={{ background: activeTab === id ? '#243658' : 'transparent', color: activeTab === id ? '#EEF2F8' : '#7A94B8' }}
              onMouseEnter={e => activeTab !== id && (e.currentTarget.style.background = '#1A2B4A')}
              onMouseLeave={e => activeTab !== id && (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: activeTab === id ? '#5CA5A5' : '#4D6799' }}>{icon}</span>
              {label}
              {id === 'queue' && (
                <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: '#3A7A7A', color: '#fff' }}>
                  {QUEUE_ITEMS.length - approvedIds.size > 0 ? QUEUE_ITEMS.length - approvedIds.size : 0}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin profile */}
        <div className="p-3" style={{ borderTop: '1px solid #243658' }}>
          <div className="flex items-center gap-2.5 p-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#3A7A7A', color: '#fff' }}>SM</div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: '#EEF2F8' }}>Sarah M.</div>
              <div className="text-xs truncate" style={{ color: '#4D6799' }}>Program Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 h-14 flex-shrink-0" style={{ background: '#1C2B45', borderBottom: '1px solid #243658' }}>
          <div className="text-sm font-semibold" style={{ color: '#EEF2F8' }}>
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: '#4D6799' }}>Apr 25, 2024</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#3A7A7A', color: '#fff' }}>SM</div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold" style={{ color: '#EEF2F8' }}>Sarah M.</div>
              <div className="text-xs" style={{ color: '#4D6799' }}>Program Manager</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ background: '#0F1B30' }}>

          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold" style={{ color: '#EEF2F8', fontFamily: 'Source Serif 4, serif' }}>Dashboard</h1>
                <p className="text-sm mt-1" style={{ color: '#7A94B8' }}>Manage resources, track impact, and keep information up to date.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map(({ label, value, trend, sub, trendUp, icon, iconColor }) => (
                  <div key={label} className="p-5 rounded-xl" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium" style={{ color: '#7A94B8' }}>{label}</span>
                      <span style={{ color: iconColor }}>{icon}</span>
                    </div>
                    <div className="text-2xl font-semibold mb-1" style={{ fontFamily: 'Source Serif 4, serif', color: '#EEF2F8' }}>{value}</div>
                    {trend && (
                      <div className="flex items-center gap-1 text-xs font-medium" style={{ color: trendUp ? '#82A588' : '#E07B6E' }}>
                        {trendUp ? '↑' : '↓'} {trend}
                      </div>
                    )}
                    {sub && <div className="text-xs" style={{ color: '#7A94B8' }}>{sub}</div>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Review Queue */}
                <div className="rounded-xl overflow-hidden" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
                  <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #243658' }}>
                    <span className="text-sm font-semibold" style={{ color: '#EEF2F8' }}>Review Queue</span>
                    <button onClick={() => setActiveTab('queue')} className="text-xs font-medium flex items-center gap-1" style={{ color: '#5CA5A5' }}>
                      View all →
                    </button>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#243658' }}>
                    {QUEUE_ITEMS.map(r => (
                      <div key={r.id} className="px-5 py-4 flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: typeStyle(r.type).bg, color: typeStyle(r.type).text }}
                        >
                          {r.type === 'VA' ? 'VA' : r.type[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate" style={{ color: '#EEF2F8' }}>{r.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#7A94B8' }}>
                            {r.type} · {r.area} · Submitted {r.submittedDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: '#243658', color: '#B8C6DD' }}>
                            Needs Review
                          </span>
                          <button
                            onClick={e => { e.stopPropagation(); setApprovedIds(prev => new Set([...prev, r.id])); toast(`"${r.name}" approved.`); }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold"
                            style={{ background: '#3A7A7A', color: '#fff' }}
                          >
                            <CheckIcon size={11} /> Approve
                          </button>
                          <button className="text-xs font-medium" style={{ color: '#5CA5A5' }}>View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl overflow-hidden" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
                  <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #243658' }}>
                    <span className="text-sm font-semibold" style={{ color: '#EEF2F8' }}>Recent Activity</span>
                    <button className="text-xs font-medium" style={{ color: '#5CA5A5' }}>View all →</button>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#243658' }}>
                    {RECENT_ACTIVITY.map(({ initials, name, action, detail, time }) => (
                      <div key={`${name}-${time}`} className="px-5 py-3.5 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                          style={{ background: '#243658', color: '#B8C6DD' }}
                        >{initials}</div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold" style={{ color: '#EEF2F8' }}>{name} </span>
                          <span className="text-sm" style={{ color: '#B8C6DD' }}>{action}</span>
                          <div className="text-xs mt-0.5" style={{ color: '#3A7A7A' }}>{detail}</div>
                        </div>
                        <div className="text-xs flex-shrink-0" style={{ color: '#4D6799' }}>{time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* All Resources table */}
              <div className="rounded-xl overflow-hidden" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
                <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderBottom: '1px solid #243658' }}>
                  <span className="text-sm font-semibold" style={{ color: '#EEF2F8' }}>All Resources</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#0F1B30', border: '1px solid #243658' }}>
                      <SearchIcon size={13} style={{ color: '#4D6799' }} />
                      <input placeholder="Search resources…" className="text-xs outline-none bg-transparent w-32" style={{ color: '#EEF2F8' }} />
                    </div>
                    {['All Types', 'All Statuses'].map((p, i) => (
                      <select key={i} className="px-2 py-1.5 rounded-lg text-xs outline-none" style={{ background: '#0F1B30', color: '#EEF2F8', border: '1px solid #243658' }}>
                        <option>{p}</option>
                      </select>
                    ))}
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: '#3A7A7A', color: '#fff' }}
                    >
                      <PlusIcon size={13} /> Add Resource
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: '#1C2B45', borderBottom: '1px solid #243658' }}>
                        {['Name', 'Type', 'Service Area', 'Status', 'Last Verified', 'Actions'].map(col => (
                          <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#4D6799' }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RESOURCES.slice(0, 5).map(r => {
                        const s = statusStyle(r.status);
                        const t = typeStyle(r.type);
                        return (
                          <tr key={r.id} style={{ borderBottom: '1px solid #1A2540' }}>
                            <td className="px-4 py-3.5">
                              <span
                                className="text-sm font-medium cursor-pointer"
                                style={{ color: '#5CA5A5' }}
                              >{r.name}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: t.bg, color: t.text }}>{r.type}</span>
                            </td>
                            <td className="px-4 py-3.5 text-sm" style={{ color: '#B8C6DD' }}>{r.area}</td>
                            <td className="px-4 py-3.5">
                              <span className="flex items-center gap-1.5 text-xs font-medium w-max" style={{ color: s.text }}>
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                                {r.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs" style={{ color: '#4D6799' }}>{r.lastVerified}</td>
                            <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                              <div className="relative">
                                <button
                                  onClick={() => setOpenDotMenu(openDotMenu === r.id ? null : r.id)}
                                  className="p-1.5 rounded"
                                  style={{ color: '#4D6799' }}
                                >
                                  <ThreeDotIcon />
                                </button>
                                {openDotMenu === r.id && (
                                  <div
                                    className="absolute right-0 top-7 z-10 rounded-lg py-1 min-w-max shadow-xl"
                                    style={{ background: '#1C2B45', border: '1px solid #243658' }}
                                  >
                                    {[
                                      { icon: <EditIcon size={13} />, label: 'Edit', color: '#EEF2F8', action: () => { setOpenDotMenu(null); setShowAddForm(true); } },
                                      { icon: <ArchiveIcon size={13} />, label: 'Archive', color: '#7A94B8', action: () => { setOpenDotMenu(null); toast(`"${r.name}" archived.`); } },
                                      { icon: <TrashIcon size={13} />, label: 'Delete', color: '#E07B6E', action: () => { setOpenDotMenu(null); setConfirmDelete(r.id); } },
                                    ].map(({ icon, label, color, action }) => (
                                      <button
                                        key={label}
                                        onClick={action}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left"
                                        style={{ color }}
                                        onMouseEnter={e => (e.currentTarget.style.background = '#243658')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                      >
                                        {icon} {label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Resources tab */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-48" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
                  <SearchIcon size={15} style={{ color: '#4D6799', flexShrink: 0 }} />
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search resources…" className="flex-1 text-sm outline-none bg-transparent" style={{ color: '#EEF2F8' }} />
                </div>
                {[
                  { value: typeFilter, opts: ['All Types', 'VA', 'Community', 'Crisis Support'], set: setTypeFilter },
                  { value: statusFilter, opts: ['All Statuses', 'Approved', 'Active', 'In Review', 'Needs Update', 'Archived'], set: setStatusFilter },
                ].map(({ value, opts, set }, i) => (
                  <select key={i} value={value} onChange={e => set(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: '#1C2B45', color: '#EEF2F8', border: '1px solid #243658' }}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                ))}
                <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold ml-auto" style={{ background: '#3A7A7A', color: '#fff' }}>
                  <PlusIcon size={14} /> Add Resource
                </button>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #243658' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#1C2B45', borderBottom: '1px solid #243658' }}>
                      {['Name', 'Type', 'Service Area', 'Status', 'Last Verified', 'Actions'].map(col => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#4D6799' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map(r => {
                      const s = statusStyle(r.status);
                      const t = typeStyle(r.type);
                      return (
                        <tr key={r.id} style={{ background: '#1C2B45', borderBottom: '1px solid #1A2540' }}>
                          <td className="px-4 py-3.5 text-sm font-medium" style={{ color: '#5CA5A5' }}>{r.name}</td>
                          <td className="px-4 py-3.5"><span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: t.bg, color: t.text }}>{r.type}</span></td>
                          <td className="px-4 py-3.5 text-sm" style={{ color: '#B8C6DD' }}>{r.area}</td>
                          <td className="px-4 py-3.5">
                            <span className="flex items-center gap-1.5 text-xs font-medium w-max" style={{ color: s.text }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />{r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-xs" style={{ color: '#4D6799' }}>{r.lastVerified}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setShowAddForm(true)} className="p-1.5 rounded" style={{ color: '#5CA5A5' }} title="Edit"><EditIcon size={14} /></button>
                              <button onClick={() => toast(`Archived.`)} className="p-1.5 rounded" style={{ color: '#4D6799' }} title="Archive"><ArchiveIcon size={14} /></button>
                              <button onClick={() => setConfirmDelete(r.id)} className="p-1.5 rounded" style={{ color: '#B04A3A' }} title="Delete"><TrashIcon size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredResources.length === 0 && (
                  <div className="py-12 text-center text-sm" style={{ background: '#1C2B45', color: '#4D6799' }}>No resources match your filters.</div>
                )}
              </div>
            </div>
          )}

          {/* Review Queue tab */}
          {activeTab === 'queue' && (
            <div className="space-y-4">
              <p className="text-sm" style={{ color: '#7A94B8' }}>{QUEUE_ITEMS.length} resources awaiting review.</p>
              {QUEUE_ITEMS.map(r => (
                <div key={r.id} className="p-5 rounded-xl" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold mb-1" style={{ color: '#EEF2F8' }}>{r.name}</div>
                      <div className="flex items-center gap-3 text-sm flex-wrap" style={{ color: '#7A94B8' }}>
                        <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: typeStyle(r.type).bg, color: typeStyle(r.type).text }}>{r.type}</span>
                        <span>{r.area}</span>
                        <span>Submitted {r.submittedDate} by {r.submittedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: '#243658', color: '#B8C6DD' }}>Needs Review</span>
                      <button
                        onClick={() => { setApprovedIds(prev => new Set([...prev, r.id])); toast(`"${r.name}" approved.`); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                        style={{ background: '#3A7A7A', color: '#fff' }}
                      >
                        <CheckIcon size={14} /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ background: '#243658', color: '#EEF2F8' }}>
                        <EyeIcon size={14} /> View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {['users', 'analytics', 'reports', 'settings'].includes(activeTab) && (
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="text-4xl mb-3">{activeTab === 'analytics' ? '📊' : activeTab === 'users' ? '👥' : activeTab === 'reports' ? '📋' : '⚙️'}</div>
                <div className="text-base font-semibold" style={{ color: '#EEF2F8' }}>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</div>
                <div className="text-sm mt-1" style={{ color: '#4D6799' }}>This panel is in development.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit form modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,27,48,0.85)' }} onClick={() => { setShowAddForm(false); setFormErrors({}); }}>
          <div className="w-full max-w-xl rounded-2xl overflow-hidden" style={{ background: '#1C2B45', border: '1px solid #243658', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #243658' }}>
              <h2 style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#EEF2F8', fontSize: '1.05rem' }}>Add Resource</h2>
              <button onClick={() => { setShowAddForm(false); setFormErrors({}); }} style={{ color: '#4D6799' }}><XIcon size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: 'name', label: 'Resource Name *', placeholder: 'e.g. VA Mental Health Services' },
                { key: 'phone', label: 'Phone Number *', placeholder: '1-800-827-1000' },
                { key: 'website', label: 'Website URL *', placeholder: 'va.gov/health-care/...' },
                { key: 'area', label: 'Service Area *', placeholder: 'e.g. Nationwide or Seattle, WA' },
                { key: 'hours', label: 'Hours', placeholder: 'Mon–Fri 8 AM–6 PM' },
                { key: 'sourceUrl', label: 'Source URL', placeholder: 'Source of information' },
                { key: 'lastVerified', label: 'Last Verified Date', placeholder: 'Apr 10, 2024' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#B8C6DD' }}>{label}</label>
                  <input
                    type="text"
                    value={(formData as any)[key]}
                    onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: '#0F1B30', border: formErrors[key] ? '1.5px solid #D4685A' : '1px solid #243658', color: '#EEF2F8' }}
                  />
                  {formErrors[key] && <div className="text-xs mt-1" style={{ color: '#E07B6E' }}>{formErrors[key]}</div>}
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#B8C6DD' }}>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of services…"
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ background: '#0F1B30', border: formErrors.description ? '1.5px solid #D4685A' : '1px solid #243658', color: '#EEF2F8' }}
                />
                {formErrors.description && <div className="text-xs mt-1" style={{ color: '#E07B6E' }}>{formErrors.description}</div>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'type', label: 'Type', opts: ['VA', 'Community', 'Crisis Support'] },
                  { key: 'status', label: 'Status', opts: ['Active', 'Approved', 'In Review', 'Needs Update', 'Archived'] },
                  { key: 'category', label: 'Category', opts: ['Mental Health', 'Housing', 'Benefits', 'Health Care', 'Crisis Support', 'Employment'] },
                ].map(({ key, label, opts }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#B8C6DD' }}>{label}</label>
                    <select value={(formData as any)[key]} onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: '#0F1B30', border: '1px solid #243658', color: '#EEF2F8' }}>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#3A7A7A', color: '#fff' }}>
                  Save Resource
                </button>
                <button onClick={() => { setShowAddForm(false); setFormErrors({}); }} className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#243658', color: '#EEF2F8' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,27,48,0.85)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: '#1C2B45', border: '1px solid #243658' }}>
            <h3 className="text-base font-semibold mb-2" style={{ color: '#EEF2F8' }}>Delete resource?</h3>
            <p className="text-sm mb-5" style={{ color: '#7A94B8' }}>This will permanently delete the resource. This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => { setConfirmDelete(null); toast('Resource deleted.', true); }} className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#B04A3A', color: '#fff' }}>Delete</button>
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#243658', color: '#EEF2F8' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-medium shadow-lg z-50 flex items-center gap-2"
          style={{ background: toastOk ? '#3A7A7A' : '#B04A3A', color: '#fff' }}
        >
          <CheckIcon size={15} /> {toastMsg}
        </div>
      )}
    </div>
  );
}
