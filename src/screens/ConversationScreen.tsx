import React, { useState, useRef, useEffect } from 'react';
import { Screen } from '../types';
import {
  PlusIcon, BookmarkIcon, SettingsIcon, HelpCircleIcon, AlertTriangleIcon,
  MessageIcon, SendIcon, PaperclipIcon, LockIcon, ExternalLinkIcon,
  PhoneIcon, CheckCircleIcon, MapPinIcon, HomeIcon, BookOpenIcon, UserIcon, MenuIcon, XIcon
} from '../components/Icons';

interface Props {
  onNavigate: (s: Screen) => void;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

const CRISIS_KEYWORDS = ['suicide', 'kill myself', 'end my life', 'hurt myself', 'self-harm', 'harm someone'];
const isCrisis = (text: string) => CRISIS_KEYWORDS.some(kw => text.toLowerCase().includes(kw));

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'assistant', content: "Hi John. How can I support you today?", timestamp: '10:24 AM' },
  { id: '2', role: 'user', content: "I've been feeling really anxious lately and my sleep has been terrible.", timestamp: '10:26 AM' },
  {
    id: '3', role: 'assistant',
    content: "I'm glad you reached out, John. Many veterans experience anxiety and sleep challenges, and there are effective resources that can help. Here are a couple of options to consider:",
    timestamp: '10:26 AM',
  },
];

const CHIPS = ['Anxiety', 'Sleep', 'PTSD', 'Counseling', 'Housing', 'Benefits'];

function LeafIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function MountainIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default function ConversationScreen({ onNavigate }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCrisisPanel, setShowCrisisPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    if (isCrisis(input)) setShowCrisisPanel(true);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Thank you for sharing that. I've found some additional resources that may be helpful. If you're ever in crisis or need immediate support, please call 988 and press 1 for the Veterans Crisis Line.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
      setLoading(false);
    }, 1400);
  };

  const SidebarContent = () => (
    <aside className="flex flex-col h-full" style={{ background: '#1C2B45', width: 240 }}>
      {/* Brand */}
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid #243658' }}>
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3A7A7A' }}>
            <LeafIcon size={16} className="text-white" />
          </div>
          <div className="text-left">
            <div style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 700, fontSize: '0.95rem', color: '#EEF2F8', lineHeight: 1.1 }}>
              VA Coach
            </div>
            <div style={{ fontSize: '0.58rem', color: '#5CA5A5', lineHeight: 1 }}>Here to help, always.</div>
          </div>
        </button>
        <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)} style={{ color: '#B8C6DD' }}>
          <XIcon size={16} />
        </button>
      </div>

      {/* New conversation */}
      <div className="p-3">
        <button
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: '#3A7A7A', color: '#fff' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#2A5F5F')}
          onMouseLeave={e => (e.currentTarget.style.background = '#3A7A7A')}
        >
          <PlusIcon size={15} /> New Conversation
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {[
          { icon: <MessageIcon size={15} />, label: 'Conversations', active: true },
          { icon: <BookOpenIcon size={15} />, label: 'Resource Directory', action: () => onNavigate('resources') },
          { icon: <BookmarkIcon size={15} />, label: 'My Resources' },
          { icon: <BookmarkIcon size={15} />, label: 'Saved' },
        ].map(({ icon, label, active, action }) => (
          <button
            key={label}
            onClick={action}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all"
            style={{
              background: active ? '#243658' : 'transparent',
              color: active ? '#EEF2F8' : '#7A94B8',
            }}
            onMouseEnter={e => !active && (e.currentTarget.style.background = '#1A2B4A')}
            onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ color: active ? '#5CA5A5' : '#4D6799' }}>{icon}</span> {label}
          </button>
        ))}

        <div className="pt-3 mt-2" style={{ borderTop: '1px solid #243658' }}>
          <button
            onClick={() => onNavigate('crisis')}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-left"
            style={{ color: '#E07B6E' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1A2B4A')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <AlertTriangleIcon size={15} /> Crisis Support
          </button>
        </div>

        <div className="pt-2 space-y-0.5">
          {[
            { icon: <HelpCircleIcon size={15} />, label: 'Help & Feedback' },
            { icon: <SettingsIcon size={15} />, label: 'Settings' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left"
              style={{ color: '#7A94B8' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1A2B4A')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: '#4D6799' }}>{icon}</span> {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Flag + tagline footer */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #243658' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🇺🇸</span>
          <div style={{ fontSize: '0.72rem', color: '#7A94B8', lineHeight: 1.3 }}>
            Veterans, Families.<br />Stronger Together.
          </div>
        </div>
        {/* User profile */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all"
          onMouseEnter={e => (e.currentTarget.style.background = '#1A2B4A')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: '#3A7A7A', color: '#fff' }}
          >
            JD
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: '#EEF2F8' }}>John D.</div>
            <div className="text-xs truncate" style={{ color: '#4D6799' }}>Veteran</div>
          </div>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAF8F4' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col h-full flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col h-full shadow-xl flex-shrink-0">
            <SidebarContent />
          </div>
          <div className="flex-1" style={{ background: 'rgba(15,27,48,0.6)' }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main conversation area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header
          className="flex items-center justify-between px-4 sm:px-6 h-14 flex-shrink-0"
          style={{ background: '#FAF8F4', borderBottom: '1px solid #E8E2D9' }}
        >
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded" onClick={() => setSidebarOpen(true)} style={{ color: '#1C2B45' }}>
              <MenuIcon size={20} />
            </button>
            <div>
              <div className="text-sm font-semibold" style={{ color: '#1C2B45' }}>
                Good morning, John.
              </div>
              <div className="text-xs" style={{ color: '#4D6799' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* "You're not alone." with mountain icon */}
            <div className="hidden sm:flex items-center gap-1.5">
              <MountainIcon size={16} />
              <span className="text-sm font-medium" style={{ color: '#3A7A7A', fontStyle: 'italic' }}>You're not alone.</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#1C2B45', color: '#fff' }}
              >
                JD
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-xs font-semibold" style={{ color: '#1C2B45' }}>John D.</div>
                <div className="text-xs" style={{ color: '#4D6799' }}>Veteran</div>
              </div>
            </div>
          </div>
        </header>

        {/* Crisis panel */}
        {showCrisisPanel && (
          <div className="mx-4 mt-3 p-4 rounded-xl flex items-start gap-3" style={{ background: '#FDF0EE', border: '1.5px solid #F5D5D0' }}>
            <AlertTriangleIcon size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#B04A3A' }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold mb-1" style={{ color: '#B04A3A' }}>Immediate support is available</div>
              <p className="text-sm mb-3" style={{ color: '#6B3A30' }}>
                If you're in crisis or thinking about hurting yourself, please reach out now.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="tel:988" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ background: '#D4685A', color: '#fff' }}>
                  <PhoneIcon size={13} /> Call 988, press 1
                </a>
                <a href="sms:838255" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ background: '#fff', color: '#B04A3A', border: '1px solid #F5D5D0' }}>
                  Text 838255
                </a>
                <button onClick={() => setShowCrisisPanel(false)} className="px-3 py-1.5 text-sm" style={{ color: '#4D6799' }}>Dismiss</button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
          {messages.map((msg, i) => (
            <div key={msg.id}>
              {msg.role === 'assistant' ? (
                <div className="flex items-start gap-3 max-w-3xl">
                  {/* Leaf avatar */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#3A7A7A' }}>
                    <LeafIcon size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: '#1C2B45' }}>VA Coach</span>
                      <span className="text-xs" style={{ color: '#4D6799' }}>{msg.timestamp}</span>
                    </div>
                    <div
                      className="p-4 rounded-xl rounded-tl-sm text-sm leading-relaxed"
                      style={{ background: '#fff', border: '1px solid #E8E2D9', color: '#1C2B45' }}
                    >
                      {msg.content}
                    </div>

                    {/* Resource cards (after 3rd message) */}
                    {i === 2 && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            type: 'VA Support',
                            typeBg: '#EEF2F8', typeText: '#2D4169',
                            name: 'VA Mental Health Services',
                            desc: 'Individual and group counseling, PTSD care, and evidence-based treatments.',
                            phone: '1-800-698-2411',
                            area: 'Nationwide',
                          },
                          {
                            type: 'Community Support',
                            typeBg: '#EBF3EC', typeText: '#4A6B50',
                            name: 'Give an Hour',
                            desc: 'Free mental-health care from volunteer clinicians for veterans and military families.',
                            phone: '1-866-617-4483',
                            area: 'Nationwide',
                          },
                        ].map(({ type, typeBg, typeText, name, desc, phone, area }) => (
                          <div key={name} className="p-4 rounded-xl" style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="text-xs font-semibold" style={{ color: typeText }}>{type}</span>
                              <CheckCircleIcon size={14} style={{ color: '#3A7A7A' }} />
                            </div>
                            <div className="font-semibold text-sm mb-1" style={{ color: '#1C2B45' }}>
                              {name}{' '}
                              <CheckCircleIcon size={13} style={{ display: 'inline', color: '#3A7A7A', verticalAlign: 'middle' }} />
                            </div>
                            <p className="text-xs leading-relaxed mb-3" style={{ color: '#4D6799' }}>{desc}</p>
                            <div className="flex items-center gap-1 text-xs mb-1" style={{ color: '#2D4169' }}>
                              <PhoneIcon size={11} /> {phone}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs" style={{ color: '#4D6799' }}>
                                <MapPinIcon size={11} /> {area}
                              </div>
                              <button className="flex items-center gap-1 text-xs font-medium" style={{ color: '#3A7A7A' }}>
                                <ExternalLinkIcon size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Recommended next steps */}
                    {i === 2 && (
                      <div className="mt-3 p-4 rounded-xl" style={{ background: '#EEF2F8', border: '1px solid #D8E2F0' }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-semibold" style={{ color: '#1C2B45' }}>☰ Recommended next steps</div>
                          <button style={{ color: '#4D6799' }}>›</button>
                        </div>
                        <ol className="space-y-1.5">
                          {[
                            'Consider reaching out to one of the resources above.',
                            'Explore additional resources for anxiety and sleep.',
                            "If you're in crisis, call 988 then press 1 (available 24/7).",
                          ].map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: '#2D4169' }}>
                              <span
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold"
                                style={{ background: '#3A7A7A', color: '#fff', fontSize: '0.6rem' }}
                              >
                                {idx + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="max-w-sm">
                    <div className="flex items-baseline justify-end gap-2 mb-1">
                      <span className="text-xs" style={{ color: '#4D6799' }}>{msg.timestamp}</span>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#1C2B45', color: '#fff' }}>JD</div>
                    </div>
                    <div className="p-4 rounded-xl rounded-tr-sm text-sm leading-relaxed" style={{ background: '#1C2B45', color: '#EEF2F8' }}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#3A7A7A' }}>
                <LeafIcon size={14} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-xl rounded-tl-sm" style={{ background: '#fff', border: '1px solid #E8E2D9' }}>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#3A7A7A', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chips */}
        <div className="px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto" style={{ borderTop: '1px solid #E8E2D9' }}>
          {CHIPS.map(chip => (
            <button
              key={chip}
              onClick={() => setInput(chip)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: '#EEF2F8', color: '#2D4169', border: '1px solid #D8E2F0' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#D8E2F0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#EEF2F8')}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 flex-shrink-0" style={{ background: '#FAF8F4', borderTop: '1px solid #E8E2D9' }}>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#fff', border: '1.5px solid #D8E2F0' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Type a message…"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: '#1C2B45' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: input.trim() ? '#1C2B45' : '#E8E2D9', color: input.trim() ? '#fff' : '#B8C6DD' }}
            >
              <SendIcon size={15} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <LockIcon size={11} style={{ color: '#4D6799' }} />
            <span className="text-xs" style={{ color: '#4D6799' }}>Please avoid sharing sensitive personal information.</span>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2"
        style={{ background: '#FAF8F4', borderTop: '1px solid #E8E2D9', height: 60 }}
      >
        {[
          { icon: <HomeIcon size={20} />, label: 'Home', action: () => onNavigate('landing') },
          { icon: <MessageIcon size={20} />, label: 'Chat', active: true, action: () => {} },
          { icon: <BookOpenIcon size={20} />, label: 'Resources', action: () => onNavigate('resources') },
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
