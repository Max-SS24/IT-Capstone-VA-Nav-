import React from 'react';
import { Screen } from '../types';
import { ShieldIcon, PhoneIcon, AlertTriangleIcon, MapPinIcon, CheckCircleIcon, ChevronRightIcon, HomeIcon, MessageIcon, BookOpenIcon, UserIcon } from '../components/Icons';

interface Props {
  onNavigate: (s: Screen) => void;
}

export default function CrisisSupport({ onNavigate }: Props) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF8F4', color: '#1C2B45' }}>

      {/* Header */}
      <header style={{ background: '#FAF8F4', borderBottom: '1px solid #E8E2D9' }} className="sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#1C2B45' }}>
              <ShieldIcon size={13} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, fontSize: '0.95rem', color: '#1C2B45' }}>
              VA Coach
            </span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('conversation')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg"
              style={{ color: '#2D4169', background: '#EEF2F8' }}
            >
              <MessageIcon size={15} /> Go to chat
            </button>
          </div>
        </div>
      </header>

      {/* Crisis hero */}
      <div
        className="py-12 px-4"
        style={{ background: '#FDF0EE', borderBottom: '2px solid #F5D5D0' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#FFEBE8', border: '2px solid #F5D5D0' }}
          >
            <AlertTriangleIcon size={24} style={{ color: '#C85A48' } as React.CSSProperties} />
          </div>
          <h1
            className="text-3xl sm:text-4xl mb-3"
            style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#7A2518' }}
          >
            Immediate support is available.
          </h1>
          <p className="text-base leading-relaxed mb-2" style={{ color: '#5A2015', maxWidth: 480, margin: '0 auto 8px' }}>
            If you or someone you know may be in danger of hurting themselves or someone else,{' '}
            <strong>call 911 or go to the nearest emergency department now.</strong>
          </p>
          <p className="text-sm" style={{ color: '#7A3A2C' }}>
            For veterans in emotional distress, the Veterans Crisis Line offers free, confidential support—any time of day.
          </p>
        </div>
      </div>

      {/* Primary actions */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            {
              label: 'Call 988, press 1',
              sub: 'Veterans Crisis Line',
              href: 'tel:988',
              bg: '#D4685A',
              hoverBg: '#C85A48',
              icon: <PhoneIcon size={20} />,
              primary: true,
            },
            {
              label: 'Text 838255',
              sub: 'Text-based crisis support',
              href: 'sms:838255',
              bg: '#B04A3A',
              hoverBg: '#953C2E',
              icon: <MessageIcon size={20} />,
              primary: true,
            },
            {
              label: 'Call 911',
              sub: 'Emergency services',
              href: 'tel:911',
              bg: '#fff',
              hoverBg: '#FDF0EE',
              icon: <PhoneIcon size={20} />,
              textColor: '#7A2518',
              border: '2px solid #F5D5D0',
            },
            {
              label: 'Find Emergency Care',
              sub: 'Nearest VA emergency',
              href: 'https://www.va.gov/find-locations/?facilityType=emergency_care',
              bg: '#fff',
              hoverBg: '#EDF6F6',
              icon: <MapPinIcon size={20} />,
              textColor: '#2A5F5F',
              border: '1.5px solid #D4EDED',
            },
          ].map(({ label, sub, href, bg, hoverBg, icon, primary, textColor, border }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all font-semibold"
              style={{ background: bg, color: textColor || '#fff', border: border || 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = bg)}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: primary ? 'rgba(255,255,255,0.2)' : (textColor === '#2A5F5F' ? '#EDF6F6' : '#FFEBE8') }}
              >
                {icon}
              </div>
              <div>
                <div className="text-base font-semibold">{label}</div>
                <div className="text-xs font-normal mt-0.5" style={{ opacity: 0.8 }}>{sub}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Call-to-action note */}
        <div
          className="p-4 rounded-xl text-center mb-8"
          style={{ background: '#EEF2F8', border: '1px solid #D8E2F0' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#2D4169' }}>
            Call or text <strong>988</strong>, then press <strong>1</strong> to reach the Veterans Crisis Line.
            Chat online at <a href="https://www.veteranscrisisline.net" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#3A7A7A' }}>veteranscrisisline.net</a>.
          </p>
        </div>

        {/* Additional resources */}
        <h2
          className="text-xl mb-4"
          style={{ fontFamily: 'Source Serif 4, serif', fontWeight: 600, color: '#1C2B45' }}
        >
          Additional crisis resources
        </h2>
        <div className="space-y-3">
          {[
            {
              name: 'Veterans Crisis Line',
              detail: 'Call 988, press 1 · Text 838255 · Chat online',
              hours: '24/7 — Confidential',
              type: 'VA',
              verified: true,
            },
            {
              name: 'National Suicide Prevention Lifeline',
              detail: 'Call or text 988',
              hours: '24/7',
              type: 'Community',
              verified: true,
            },
            {
              name: 'Crisis Text Line',
              detail: 'Text HOME to 741741',
              hours: '24/7',
              type: 'Community',
              verified: true,
            },
            {
              name: 'VA Caregiver Support Line',
              detail: '1-855-260-3274',
              hours: 'Mon–Fri 8 AM–8 PM ET',
              type: 'VA',
              verified: true,
            },
          ].map(({ name, detail, hours, type, verified }) => (
            <div
              key={name}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: '#fff', border: '1px solid #E8E2D9' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm" style={{ color: '#1C2B45' }}>{name}</span>
                  {verified && <CheckCircleIcon size={13} style={{ color: '#3A7A7A' } as React.CSSProperties} />}
                </div>
                <div className="text-sm" style={{ color: '#2D4169' }}>{detail}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4D6799' }}>{hours}</div>
              </div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded ml-4 flex-shrink-0"
                style={{
                  background: type === 'VA' ? '#EEF2F8' : '#EBF3EC',
                  color: type === 'VA' ? '#2D4169' : '#4A6B50',
                }}
              >
                {type}
              </span>
            </div>
          ))}
        </div>

        {/* Safety notice */}
        <div
          className="mt-8 p-5 rounded-xl"
          style={{ background: '#FAF8F4', border: '1px solid #E8E2D9' }}
        >
          <div className="flex items-start gap-3">
            <ShieldIcon size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#3A7A7A' } as React.CSSProperties} />
            <div>
              <div className="text-sm font-semibold mb-1" style={{ color: '#1C2B45' }}>
                VA Coach is not a crisis service
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#4D6799' }}>
                This tool helps you find resources and information, but it is not a substitute for emergency services
                or professional crisis support. If you're in immediate danger, call 911 or go to the nearest emergency room.
              </p>
              <button
                onClick={() => onNavigate('conversation')}
                className="flex items-center gap-1 mt-3 text-sm font-medium"
                style={{ color: '#3A7A7A' }}
              >
                Return to conversation <ChevronRightIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2"
        style={{ background: '#FAF8F4', borderTop: '1px solid #E8E2D9', height: 60 }}
      >
        {[
          { icon: <HomeIcon size={20} />, label: 'Home', action: () => onNavigate('landing') },
          { icon: <MessageIcon size={20} />, label: 'Chat', action: () => onNavigate('conversation') },
          { icon: <BookOpenIcon size={20} />, label: 'Resources', action: () => onNavigate('resources') },
          { icon: <AlertTriangleIcon size={20} />, label: 'Crisis', active: true, action: () => {}, crisis: true },
          { icon: <UserIcon size={20} />, label: 'Profile', action: () => onNavigate('dashboard') },
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
