import React, { useState } from 'react';
import { Screen } from '../types';
import {
  ShieldIcon, MessageIcon, BookmarkIcon, ClockIcon, SettingsIcon,
  AlertTriangleIcon, TrashIcon, LogOutIcon, LockIcon, PhoneIcon,
  CheckCircleIcon, ChevronRightIcon, HomeIcon, BookOpenIcon, UserIcon, ExternalLinkIcon
} from '../components/Icons';

interface Props {
  onNavigate: (s: Screen) => void;
}

export default function UserDashboard({ onNavigate }: Props) {
  const [showDeleteConvo, setShowDeleteConvo] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [toastMsg, setToastMsg] = useState('');

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0" style={{ background: '#FAF8F4', color: '#1C2B45' }}>

      {/* Header */}
      <header style={{ background: '#1C2B45' }} className="px-4 sm:px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#2D4169' }}>
              <ShieldIcon size={13} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, fontSize: '0.95rem', color: '#EEF2F8' }}>
              VA Coach
            </span>
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: '#B8C6DD' }}
          >
            <LogOutIcon size={15} /> Sign out
          </button>
        </div>
      </header>

      {/* Profile section */}
      <div style={{ background: '#1C2B45', borderBottom: '1px solid #243658' }} className="px-4 sm:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold"
              style={{ background: '#3A7A7A', color: '#fff' }}
            >
              JM
            </div>
            <div>
              <h1
                className="text-2xl"
                style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#EEF2F8' }}
              >
                John Martinez
              </h1>
              <p className="text-sm" style={{ color: '#B8C6DD' }}>Army veteran · Member since March 2024</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            {(['overview', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={{
                  background: activeTab === tab ? '#EEF2F8' : 'transparent',
                  color: activeTab === tab ? '#1C2B45' : '#B8C6DD',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Continue conversation */}
            <div
              className="md:col-span-2 rounded-xl p-5 cursor-pointer transition-all"
              style={{ background: '#fff', border: '1px solid #E8E2D9' }}
              onClick={() => onNavigate('conversation')}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(28,43,69,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageIcon size={16} style={{ color: '#3A7A7A' } as React.CSSProperties} />
                  <span className="text-sm font-semibold" style={{ color: '#1C2B45' }}>Continue conversation</span>
                </div>
                <ChevronRightIcon size={16} style={{ color: '#4D6799' } as React.CSSProperties} />
              </div>
              <div
                className="p-4 rounded-lg"
                style={{ background: '#F0EDE5', border: '1px solid #E8E2D9' }}
              >
                <div className="text-xs mb-2" style={{ color: '#4D6799' }}>Today · 9:15 AM</div>
                <p className="text-sm" style={{ color: '#2D4169' }}>
                  "I've been feeling really anxious lately and my sleep has been terrible."
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium" style={{ color: '#3A7A7A' }}>
                Resume <ChevronRightIcon size={14} />
              </div>
            </div>

            {/* Crisis quick access */}
            <div
              className="rounded-xl p-5 cursor-pointer"
              style={{ background: '#FDF0EE', border: '1.5px solid #F5D5D0' }}
              onClick={() => onNavigate('crisis')}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangleIcon size={16} style={{ color: '#B04A3A' } as React.CSSProperties} />
                <span className="text-sm font-semibold" style={{ color: '#B04A3A' }}>Crisis Support</span>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#7A3A2C' }}>
                Free, confidential support available 24 hours a day.
              </p>
              <a
                href="tel:988"
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: '#D4685A' }}
                onClick={e => e.stopPropagation()}
              >
                <PhoneIcon size={14} /> Call 988, press 1
              </a>
            </div>

            {/* Saved resources */}
            <div className="md:col-span-2 rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E8E2D9' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookmarkIcon size={16} style={{ color: '#3A7A7A' } as React.CSSProperties} />
                  <span className="text-sm font-semibold" style={{ color: '#1C2B45' }}>Saved resources</span>
                </div>
                <button
                  onClick={() => onNavigate('resources')}
                  className="text-xs font-medium"
                  style={{ color: '#3A7A7A' }}
                >
                  Browse all
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'VA Mental Health Services', type: 'VA', saved: 'Dec 3' },
                  { name: 'Give an Hour', type: 'Community', saved: 'Nov 28' },
                ].map(({ name, type, saved }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#1C2B45' }}>{name}</div>
                      <div className="text-xs" style={{ color: '#4D6799' }}>
                        <span
                          className="inline-block px-1.5 py-0.5 rounded mr-1.5"
                          style={{ background: type === 'VA' ? '#EEF2F8' : '#EBF3EC', color: type === 'VA' ? '#2D4169' : '#4A6B50' }}
                        >
                          {type}
                        </span>
                        Saved {saved}
                      </div>
                    </div>
                    <button style={{ color: '#3A7A7A' }}>
                      <ExternalLinkIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently viewed */}
            <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E8E2D9' }}>
              <div className="flex items-center gap-2 mb-4">
                <ClockIcon size={16} style={{ color: '#3A7A7A' } as React.CSSProperties} />
                <span className="text-sm font-semibold" style={{ color: '#1C2B45' }}>Recently viewed</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'VA Telehealth Services', time: '2 hours ago' },
                  { name: 'VA Home Loan Program', time: 'Yesterday' },
                  { name: '988 Veterans Crisis Line', time: 'Dec 3' },
                ].map(({ name, time }) => (
                  <div key={name} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm" style={{ color: '#1C2B45' }}>{name}</div>
                      <div className="text-xs" style={{ color: '#4D6799' }}>{time}</div>
                    </div>
                    <ChevronRightIcon size={14} style={{ color: '#4D6799' } as React.CSSProperties} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Settings tab */
          <div className="max-w-2xl space-y-5">

            {/* Privacy notice */}
            <div
              className="p-5 rounded-xl"
              style={{ background: '#EDF6F6', border: '1px solid #D4EDED' }}
            >
              <div className="flex items-start gap-3">
                <LockIcon size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#3A7A7A' } as React.CSSProperties} />
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#2A5F5F' }}>Privacy</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#2A5F5F' }}>
                    VA Coach stores only the information needed to provide resource-navigation features.
                    Your conversation history is stored locally and is never shared with third parties or VA systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Account settings */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8E2D9' }}>
              <div className="px-5 py-3" style={{ background: '#F0EDE5', borderBottom: '1px solid #E8E2D9' }}>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#4D6799' }}>Account</span>
              </div>
              {[
                { label: 'Display name', value: 'John Martinez', action: 'Edit' },
                { label: 'Email', value: 'j.martinez@email.com', action: 'Edit' },
                { label: 'Notifications', value: 'Email and in-app', action: 'Change' },
              ].map(({ label, value, action }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-5 py-4"
                  style={{ background: '#fff', borderBottom: '1px solid #F0EDE5' }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#1C2B45' }}>{label}</div>
                    <div className="text-sm" style={{ color: '#4D6799' }}>{value}</div>
                  </div>
                  <button className="text-sm font-medium" style={{ color: '#3A7A7A' }}>{action}</button>
                </div>
              ))}
            </div>

            {/* Data management */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8E2D9' }}>
              <div className="px-5 py-3" style={{ background: '#F0EDE5', borderBottom: '1px solid #E8E2D9' }}>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#4D6799' }}>Data &amp; Privacy</span>
              </div>
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                style={{ background: '#fff', borderBottom: '1px solid #F0EDE5' }}
                onClick={() => setShowDeleteConvo(true)}
              >
                <div>
                  <div className="text-sm font-medium" style={{ color: '#1C2B45' }}>Delete conversation history</div>
                  <div className="text-xs" style={{ color: '#4D6799' }}>Remove all past conversations from this device</div>
                </div>
                <TrashIcon size={16} style={{ color: '#B04A3A' } as React.CSSProperties} />
              </div>
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                style={{ background: '#fff' }}
                onClick={() => setShowDeleteAccount(true)}
              >
                <div>
                  <div className="text-sm font-medium" style={{ color: '#B04A3A' }}>Delete account</div>
                  <div className="text-xs" style={{ color: '#4D6799' }}>Permanently remove your account and all data</div>
                </div>
                <TrashIcon size={16} style={{ color: '#B04A3A' } as React.CSSProperties} />
              </div>
            </div>

            {/* What VA Coach doesn't store */}
            <div className="rounded-xl p-5" style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}>
              <div className="text-sm font-semibold mb-3" style={{ color: '#1C2B45' }}>
                What VA Coach never stores
              </div>
              <ul className="space-y-2">
                {[
                  'Medical records or diagnoses',
                  'Treatment plans or prescriptions',
                  'VA benefit eligibility decisions',
                  'Sensitive personal identifiers',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#4D6799' }}>
                    <CheckCircleIcon size={14} style={{ color: '#6B8F71', flexShrink: 0 } as React.CSSProperties} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Delete conversation dialog */}
      {showDeleteConvo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,43,69,0.5)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C2B45', fontFamily: 'Source Serif 4, serif' }}>
              Delete conversation history?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#4D6799' }}>
              This will permanently remove all past conversations. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowDeleteConvo(false); toast('Conversation history deleted.'); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: '#D4685A', color: '#fff' }}
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConvo(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: '#EEF2F8', color: '#1C2B45' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete account dialog */}
      {showDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,43,69,0.5)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#B04A3A', fontFamily: 'Source Serif 4, serif' }}>
              Delete your account?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#4D6799' }}>
              This will permanently remove your account and all associated data. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowDeleteAccount(false); onNavigate('landing'); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: '#B04A3A', color: '#fff' }}
              >
                Delete account
              </button>
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: '#EEF2F8', color: '#1C2B45' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-medium shadow-lg z-50"
          style={{ background: '#1C2B45', color: '#EEF2F8' }}
        >
          {toastMsg}
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2"
        style={{ background: '#FAF8F4', borderTop: '1px solid #E8E2D9', height: 60 }}
      >
        {[
          { icon: <HomeIcon size={20} />, label: 'Home', action: () => onNavigate('landing') },
          { icon: <MessageIcon size={20} />, label: 'Chat', action: () => onNavigate('conversation') },
          { icon: <BookOpenIcon size={20} />, label: 'Resources', action: () => onNavigate('resources') },
          { icon: <AlertTriangleIcon size={20} />, label: 'Crisis', action: () => onNavigate('crisis'), crisis: true },
          { icon: <UserIcon size={20} />, label: 'Profile', active: true, action: () => {} },
        ].map(({ icon, label, active, action, crisis }) => (
          <button
            key={label}
            onClick={action}
            className="flex flex-col items-center gap-0.5 px-2 py-1"
            style={{ color: crisis ? '#B04A3A' : active ? '#1C2B45' : '#4D6799' }}
          >
            {icon}
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
