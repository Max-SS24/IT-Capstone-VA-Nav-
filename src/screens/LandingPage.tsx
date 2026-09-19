import React, { useState } from 'react';
import { Screen } from '../types';
import { SearchIcon, PhoneIcon, ChevronRightIcon, MenuIcon, XIcon, MessageIcon, CheckCircleIcon, ShieldIcon } from '../components/Icons';

interface Props {
  onNavigate: (s: Screen) => void;
}

function LeafIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export default function LandingPage({ onNavigate }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF8F4', color: '#1C2B45' }}>

      {/* Header */}
      <header style={{ background: '#FAF8F4', borderBottom: '1px solid #E8E2D9' }} className="sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1C2B45' }}>
              <LeafIcon size={16} className="text-white" />
            </div>
            <div className="text-left">
              <div style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 700, fontSize: '1.05rem', color: '#1C2B45', lineHeight: 1.1 }}>
                VA Coach
              </div>
              <div style={{ fontSize: '0.6rem', color: '#4D6799', lineHeight: 1 }}>Real Support. A Brighter Tomorrow.</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {['Find Resources', 'How It Works', 'About', 'For Providers'].map(item => (
              <button
                key={item}
                onClick={() => item === 'Find Resources' && onNavigate('resources')}
                className="px-3 py-2 text-sm font-medium rounded"
                style={{ color: '#2D4169' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#EEF2F8')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex p-2 rounded" style={{ color: '#2D4169' }}>
              <SearchIcon size={18} />
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden md:flex px-3 py-1.5 text-sm font-medium rounded"
              style={{ color: '#2D4169' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#EEF2F8')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('conversation')}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all"
              style={{ background: '#1C2B45', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2D4169')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1C2B45')}
            >
              Get Help
            </button>
            <button
              className="md:hidden p-2 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: '#1C2B45' }}
            >
              {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: '#FAF8F4', borderTop: '1px solid #E8E2D9' }} className="md:hidden px-4 pb-4">
            {['Find Resources', 'How It Works', 'About', 'For Providers', 'Sign In'].map(item => (
              <button
                key={item}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium rounded mt-1"
                style={{ color: '#1C2B45' }}
                onClick={() => { setMobileMenuOpen(false); if (item === 'Find Resources') onNavigate('resources'); }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text column */}
        <div>
          <h1
            className="text-5xl sm:text-6xl leading-none mb-5"
            style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 700, color: '#1C2B45' }}
          >
            Find the right support,<br />
            <span style={{ color: '#3A7A7A' }}>one step at a time.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#3A5280', maxWidth: 480 }}>
            VA Coach helps veterans and their loved ones find trusted resources for mental health,
            housing, health care, benefits, and more—with guidance that meets you where you are.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => onNavigate('conversation')}
              className="flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-lg transition-all"
              style={{ background: '#1C2B45', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2D4169')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1C2B45')}
            >
              Start a conversation <ChevronRightIcon size={18} />
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-lg transition-all"
              style={{ background: '#fff', color: '#1C2B45', border: '1.5px solid #D8E2F0' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F0EDE5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              Browse resources
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: '🛡️', label: 'Trusted information', sub: 'VA-approved sources only' },
              { icon: '📋', label: 'VA and community resources', sub: 'Verified and current' },
              { icon: '🤝', label: 'Real people. Real support.', sub: 'Crisis line always available' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-start gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                  style={{ background: '#EEF2F8', border: '1px solid #D8E2F0' }}
                >
                  {icon}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#1C2B45' }}>{label}</div>
                  <div className="text-xs" style={{ color: '#4D6799' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image with overlay */}
        <div className="relative rounded-2xl overflow-hidden" style={{ height: 480, background: '#1C2B45' }}>
          <img
            src="https://images.unsplash.com/photo-1470429346530-f5590bff80d2?w=800&h=960&fit=crop&auto=format"
            alt="A person viewed from behind, sitting on a hillside looking out at a peaceful natural landscape"
            className="w-full h-full object-cover"
            style={{ opacity: 0.85 }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(28,43,69,0.55) 0%, rgba(28,43,69,0.15) 60%, rgba(28,43,69,0.4) 100%)' }}
          />
          {/* Handwritten-style overlay text */}
          <div className="absolute top-8 right-8 text-right">
            <p
              className="text-white leading-snug"
              style={{
                fontFamily: 'Source Serif 4, serif',
                fontWeight: 400,
                fontSize: '1.35rem',
                fontStyle: 'italic',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                letterSpacing: '0.01em',
              }}
            >
              You served us.<br />
              Now let us<br />
              support you.
            </p>
          </div>
          {/* Bottom quote card */}
          <div
            className="absolute bottom-5 left-5 right-5 p-4 rounded-xl"
            style={{ background: 'rgba(250,248,244,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(232,226,217,0.8)' }}
          >
            <p className="text-sm font-medium" style={{ color: '#1C2B45' }}>
              "VA Coach helped me find counseling services I didn't know existed."
            </p>
            <p className="text-xs mt-1" style={{ color: '#4D6799' }}>Marine Corps veteran, Pacific Northwest</p>
          </div>
        </div>
      </section>

      {/* Crisis banner */}
      <div style={{ background: '#FDF0EE', borderTop: '1px solid #F5D5D0', borderBottom: '1px solid #F5D5D0' }} className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#D4685A' }}
          >
            <PhoneIcon size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold" style={{ color: '#7A2518' }}>988 Veterans Crisis Line</div>
            <div className="text-sm" style={{ color: '#9A4030' }}>Confidential, 24/7 support for veterans and their loved ones.</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="tel:988"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ color: '#D4685A', background: '#fff', border: '1.5px solid #F5D5D0' }}
            >
              <PhoneIcon size={14} /> Call 988 then press 1
            </a>
            <a
              href="sms:838255"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ color: '#D4685A', background: '#fff', border: '1.5px solid #F5D5D0' }}
            >
              <MessageIcon size={14} /> Text 838255
            </a>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section style={{ background: '#F0EDE5', borderBottom: '1px solid #E8E2D9' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl mb-2"
              style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#1C2B45' }}
            >
              How VA Coach works
            </h2>
            <p className="text-sm" style={{ color: '#4D6799' }}>
              Describe what you need in plain language. We'll find the right resources.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Describe what you need', body: 'Tell VA Coach how you\'re feeling or what kind of support you\'re looking for—in your own words.' },
              { num: '02', title: 'Review trusted resources', body: 'Get a curated list of VA and community resources with verified contact information and details.' },
              { num: '03', title: 'Take the next step', body: 'Use the guidance and links to connect directly with care providers, crisis support, or benefits offices.' },
            ].map(({ num, title, body }) => (
              <div key={num} className="p-6 rounded-xl" style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}>
                <div className="text-xs font-mono font-semibold mb-4" style={{ color: '#3A7A7A', fontFamily: 'JetBrains Mono, monospace' }}>{num}</div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#1C2B45' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4D6799' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource categories */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl" style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#1C2B45' }}>
            Resources for what matters
          </h2>
          <button onClick={() => onNavigate('resources')} className="text-sm font-medium flex items-center gap-1" style={{ color: '#3A7A7A' }}>
            View all <ChevronRightIcon size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Mental Health', color: '#EDF6F6', text: '#2A5F5F', border: '#D4EDED' },
            { label: 'Housing', color: '#EBF3EC', text: '#4A6B50', border: '#D5E4D7' },
            { label: 'Benefits', color: '#EEF2F8', text: '#2D4169', border: '#D8E2F0' },
            { label: 'Crisis Support', color: '#FDF0EE', text: '#B04A3A', border: '#F5D5D0' },
            { label: 'Health Care', color: '#FDF5EA', text: '#6B4A20', border: '#F5E4CE' },
            { label: 'Employment', color: '#EBF3EC', text: '#4A6B50', border: '#D5E4D7' },
          ].map(({ label, color, text, border }) => (
            <button
              key={label}
              onClick={() => onNavigate('resources')}
              className="p-4 rounded-xl text-center text-sm font-medium transition-all"
              style={{ background: color, color: text, border: `1px solid ${border}` }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ background: '#EEF2F8', borderTop: '1px solid #E8E2D9' }} className="py-3 px-4">
        <div className="max-w-7xl mx-auto text-xs text-center" style={{ color: '#4D6799' }}>
          VA Coach is a resource-navigation tool, not a medical provider. It does not diagnose conditions, recommend medications, or replace professional care.
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#1C2B45', color: '#B8C6DD' }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#2D4169' }}>
                <LeafIcon size={14} className="text-white" />
              </div>
              <div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>VA Coach</div>
                <div style={{ fontSize: '0.6rem', color: '#4D6799' }}>Real Support. A Brighter Tomorrow.</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {['Privacy Policy', 'Accessibility', 'Terms of Use', 'Contact', 'Sitemap'].map(link => (
                <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
              ))}
              <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">Admin</button>
            </div>
          </div>
          <div className="mt-8 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs" style={{ borderTop: '1px solid #243658', color: '#4D6799' }}>
            <span>© 2025 VA Coach. This is a resource-navigation tool, not an official VA application.</span>
            <button onClick={() => onNavigate('crisis')} className="flex items-center gap-1.5 font-medium" style={{ color: '#E07B6E' }}>
              <PhoneIcon size={12} /> Crisis support available 24/7
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
