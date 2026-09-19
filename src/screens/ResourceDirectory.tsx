import React, { useState } from 'react';
import { Screen } from '../types';
import {
  SearchIcon, FilterIcon, CheckCircleIcon, ExternalLinkIcon,
  PhoneIcon, MapPinIcon, ClockIcon, XIcon, ChevronRightIcon,
  HomeIcon, MessageIcon, AlertTriangleIcon, UserIcon, BookOpenIcon, ShieldIcon
} from '../components/Icons';

interface Props {
  onNavigate: (s: Screen) => void;
}

interface Resource {
  id: string;
  name: string;
  type: 'VA' | 'Community' | 'Crisis Support';
  category: string;
  desc: string;
  phone: string;
  area: string;
  website: string;
  verified: boolean;
  lastVerified: string;
  hours?: string;
  icon: 'va' | 'crisis' | 'community' | 'housing';
}

const RESOURCES: Resource[] = [
  {
    id: '1', name: 'VA Mental Health Services', type: 'VA', category: 'Mental Health', icon: 'va',
    desc: 'Comprehensive mental health care including individual and group counseling, PTSD treatment, substance use programs, and evidence-based therapies.',
    phone: '1-800-698-2411', area: 'Nationwide', website: 'va.gov/health-care',
    verified: true, lastVerified: 'Apr 10, 2024', hours: 'Varies by location.',
  },
  {
    id: '2', name: '988 Veterans Crisis Line', type: 'Crisis Support', category: 'Crisis Support', icon: 'crisis',
    desc: 'Free, confidential crisis support for veterans, service members, and their families. Available 24 hours a day, 7 days a week.',
    phone: '988 (press 1)', area: 'Nationwide', website: 'veteranscrisisline.net',
    verified: true, lastVerified: 'Apr 12, 2024', hours: '24/7',
  },
  {
    id: '3', name: 'Union Gospel Mission', type: 'Community', category: 'Housing', icon: 'housing',
    desc: 'Emergency shelter, transitional housing, and veteran-specific services including case management and job placement assistance.',
    phone: '206-621-7691', area: 'Seattle, WA', website: 'ugm.org',
    verified: true, lastVerified: 'Mar 28, 2024', hours: 'Mon–Fri 8 AM–5 PM',
  },
  {
    id: '4', name: 'Give an Hour', type: 'Community', category: 'Mental Health', icon: 'community',
    desc: 'Free mental health care provided by volunteer licensed clinicians for veterans and military families.',
    phone: '1-866-617-4483', area: 'Nationwide', website: 'giveanhour.org',
    verified: true, lastVerified: 'Nov 22, 2024', hours: 'Varies by provider',
  },
  {
    id: '5', name: 'VA Home Loan Guarantee Program', type: 'VA', category: 'Benefits', icon: 'va',
    desc: 'Zero-down-payment home loans backed by the VA for eligible veterans, service members, and surviving spouses.',
    phone: '1-877-827-3702', area: 'Nationwide', website: 'va.gov/housing-assistance',
    verified: true, lastVerified: 'Dec 1, 2024', hours: 'Mon–Fri 8 AM–6 PM ET',
  },
  {
    id: '6', name: 'VA Telehealth Services', type: 'VA', category: 'Health Care', icon: 'va',
    desc: 'Virtual health care appointments with VA providers including primary care, mental health, and specialty services.',
    phone: '1-800-827-1000', area: 'Nationwide', website: 'va.gov/telehealth',
    verified: true, lastVerified: 'Dec 4, 2024', hours: 'By appointment; 24/7 urgent telehealth available',
  },
];

const TYPE_FILTERS = ['All Resources', 'VA', 'Community', 'Crisis Support', 'Telehealth'];

function ResourceTypeIcon({ icon, type }: { icon: Resource['icon']; type: Resource['type'] }) {
  const styles = {
    va: { bg: '#1C2B45', color: '#EEF2F8' },
    crisis: { bg: '#D4685A', color: '#fff' },
    community: { bg: '#3A7A7A', color: '#fff' },
    housing: { bg: '#4A8F8F', color: '#fff' },
  };
  const s = styles[icon];
  if (icon === 'va') return (
    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: s.bg, color: s.color }}>
      VA
    </div>
  );
  if (icon === 'crisis') return (
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
      <PhoneIcon size={18} className="text-white" />
    </div>
  );
  if (icon === 'housing') return (
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
      <HomeIcon size={18} className="text-white" />
    </div>
  );
  return (
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
  );
}

const badgeCfg = (type: Resource['type']) => {
  if (type === 'VA') return { bg: '#EEF2F8', text: '#2D4169', border: '#D8E2F0' };
  if (type === 'Crisis Support') return { bg: '#FDF0EE', text: '#B04A3A', border: '#F5D5D0' };
  return { bg: '#EBF3EC', text: '#4A6B50', border: '#D5E4D7' };
};

function LeafIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export default function ResourceDirectory({ onNavigate }: Props) {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('Seattle, WA');
  const [activeFilter, setActiveFilter] = useState('All Resources');
  const [selected, setSelected] = useState<Resource | null>(null);

  const filtered = RESOURCES.filter(r => {
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All Resources' || r.type === activeFilter ||
      (activeFilter === 'Telehealth' && r.category === 'Health Care');
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0" style={{ background: '#FAF8F4', color: '#1C2B45' }}>

      {/* Header */}
      <header style={{ background: '#FAF8F4', borderBottom: '1px solid #E8E2D9' }} className="sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#1C2B45' }}>
              <LeafIcon size={13} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 700, fontSize: '0.95rem', color: '#1C2B45' }}>
              VA Coach
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-0.5">
            {['Find Resources', 'How It Works', 'About', 'For Providers'].map(item => (
              <button key={item} className="px-3 py-2 text-sm font-medium rounded"
                style={{ color: item === 'Find Resources' ? '#1C2B45' : '#4D6799',
                  borderBottom: item === 'Find Resources' ? '2px solid #1C2B45' : 'none',
                  borderRadius: 0, paddingBottom: item === 'Find Resources' ? 6 : 8 }}>
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden md:flex p-2 rounded" style={{ color: '#2D4169' }}><SearchIcon size={18} /></button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#1C2B45', color: '#fff' }}>JD</div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold" style={{ color: '#1C2B45' }}>John D.</div>
              <div className="text-xs" style={{ color: '#4D6799' }}>Veteran</div>
            </div>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6 w-full">
        <h1 className="text-3xl sm:text-4xl mb-1" style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 700, color: '#1C2B45' }}>
          Resource Directory
        </h1>
        <p className="text-base" style={{ color: '#4D6799' }}>Find trusted VA and community resources in your area.</p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#fff', border: '1.5px solid #D8E2F0' }}>
            <SearchIcon size={17} style={{ color: '#4D6799', flexShrink: 0 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for resources (e.g., counseling, housing, benefits)"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: '#1C2B45' }}
            />
            {search && <button onClick={() => setSearch('')} style={{ color: '#4D6799' }}><XIcon size={15} /></button>}
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl sm:w-44" style={{ background: '#fff', border: '1.5px solid #D8E2F0' }}>
            <MapPinIcon size={15} style={{ color: '#4D6799', flexShrink: 0 }} />
            <input value={location} onChange={e => setLocation(e.target.value)} className="flex-1 text-sm outline-none bg-transparent" style={{ color: '#1C2B45' }} />
          </div>
          <button
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: '#1C2B45', color: '#fff' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2D4169')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1C2B45')}
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mt-4">
          {TYPE_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeFilter === f ? '#1C2B45' : '#fff',
                color: activeFilter === f ? '#fff' : '#2D4169',
                border: `1px solid ${activeFilter === f ? '#1C2B45' : '#D8E2F0'}`,
              }}
            >
              {f}
            </button>
          ))}
          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium ml-auto"
            style={{ color: '#2D4169', border: '1px solid #D8E2F0', background: '#fff' }}
          >
            <FilterIcon size={13} /> More Filters
          </button>
        </div>

        {/* Count */}
        <div className="mt-4 text-sm" style={{ color: '#4D6799' }}>
          Showing {filtered.length} of {RESOURCES.length} resources
        </div>
      </div>

      {/* Resource cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(resource => {
              const badge = badgeCfg(resource.type);
              return (
                <div
                  key={resource.id}
                  className="flex flex-col rounded-xl overflow-hidden transition-all"
                  style={{ background: '#fff', border: '1px solid #E8E2D9' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(28,43,69,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div className="p-5 flex-1">
                    {/* Icon + badges row */}
                    <div className="flex items-center gap-3 mb-3">
                      <ResourceTypeIcon icon={resource.icon} type={resource.type} />
                      <div className="flex flex-col gap-1">
                        <span
                          className="inline-flex px-2 py-0.5 rounded text-xs font-semibold self-start"
                          style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.border}` }}
                        >
                          {resource.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: '#1C2B45' }}>{resource.name}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: '#4D6799' }}>{resource.desc}</p>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-sm" style={{ color: '#1C2B45' }}>
                        <PhoneIcon size={13} /> {resource.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: '#4D6799' }}>
                        <MapPinIcon size={12} /> {resource.area}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3" style={{ borderTop: '1px solid #F0EDE5', background: '#FAF8F4' }}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <a
                          href={`https://${resource.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs"
                          style={{ color: '#3A7A7A' }}
                        >
                          https://{resource.website} <ExternalLinkIcon size={10} />
                        </a>
                        {resource.verified && (
                          <div className="flex items-center gap-1 text-xs" style={{ color: '#3A7A7A' }}>
                            <CheckCircleIcon size={11} /> Last verified {resource.lastVerified}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setSelected(resource)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: '#EEF2F8', color: '#1C2B45' }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#EEF2F8' }}>
              <SearchIcon size={24} style={{ color: '#4D6799' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C2B45' }}>No resources match your search</h3>
            <p className="text-sm max-w-sm" style={{ color: '#4D6799' }}>
              Try a different keyword or remove a filter.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveFilter('All Resources'); }}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: '#EEF2F8', color: '#2D4169' }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28,43,69,0.5)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: '#FAF8F4', border: '1px solid #E8E2D9', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-5 flex items-start justify-between" style={{ background: '#1C2B45' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {(() => { const b = badgeCfg(selected.type); return (
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold" style={{ background: b.bg, color: b.text }}>{selected.type}</span>
                  ); })()}
                  {selected.verified && <span className="flex items-center gap-1 text-xs" style={{ color: '#5CA5A5' }}><CheckCircleIcon size={12} /> Verified</span>}
                </div>
                <h2 className="text-xl" style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#EEF2F8' }}>{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: '#B8C6DD' }}><XIcon size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: '#2D4169' }}>{selected.desc}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Phone', value: selected.phone, icon: <PhoneIcon size={14} /> },
                  { label: 'Service Area', value: selected.area, icon: <MapPinIcon size={14} /> },
                  { label: 'Hours', value: selected.hours || 'Contact for hours', icon: <ClockIcon size={14} /> },
                  { label: 'Last Verified', value: selected.lastVerified, icon: <CheckCircleIcon size={14} /> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="p-3 rounded-lg" style={{ background: '#F0EDE5', border: '1px solid #E8E2D9' }}>
                    <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#4D6799' }}>{icon} {label}</div>
                    <div className="text-sm" style={{ color: '#1C2B45' }}>{value}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg" style={{ background: '#EDF6F6', border: '1px solid #D4EDED' }}>
                <div className="text-xs font-medium mb-1" style={{ color: '#2A5F5F' }}>Source URL</div>
                <a href={`https://${selected.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium" style={{ color: '#3A7A7A' }}>
                  https://{selected.website} <ExternalLinkIcon size={13} />
                </a>
              </div>
              <div className="flex gap-2 pt-1">
                <a href={`tel:${selected.phone.replace(/\D/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: '#1C2B45', color: '#fff' }}>
                  <PhoneIcon size={15} /> Call Now
                </a>
                <a href={`https://${selected.website}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: '#fff', color: '#1C2B45', border: '1px solid #E8E2D9' }}>
                  Visit Website <ExternalLinkIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2"
        style={{ background: '#FAF8F4', borderTop: '1px solid #E8E2D9', height: 60 }}>
        {[
          { icon: <HomeIcon size={20} />, label: 'Home', action: () => onNavigate('landing') },
          { icon: <MessageIcon size={20} />, label: 'Chat', action: () => onNavigate('conversation') },
          { icon: <BookOpenIcon size={20} />, label: 'Resources', active: true, action: () => {} },
          { icon: <AlertTriangleIcon size={20} />, label: 'Crisis', action: () => onNavigate('crisis'), crisis: true },
          { icon: <UserIcon size={20} />, label: 'Profile', action: () => onNavigate('dashboard') },
        ].map(({ icon, label, active, action, crisis }) => (
          <button key={label} onClick={action} className="flex flex-col items-center gap-0.5 px-2 py-1"
            style={{ color: crisis ? '#B04A3A' : active ? '#1C2B45' : '#4D6799' }}>
            {icon}
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
