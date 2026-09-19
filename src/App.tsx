import React, { useState } from 'react';
import { Screen } from './types';
import LandingPage from './screens/LandingPage';
import ConversationScreen from './screens/ConversationScreen';
import ResourceDirectory from './screens/ResourceDirectory';
import CrisisSupport from './screens/CrisisSupport';
import UserDashboard from './screens/UserDashboard';
import AdminDashboard from './screens/AdminDashboard';

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');

  const navigate = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  switch (screen) {
    case 'conversation': return <ConversationScreen onNavigate={navigate} />;
    case 'resources': return <ResourceDirectory onNavigate={navigate} />;
    case 'crisis': return <CrisisSupport onNavigate={navigate} />;
    case 'dashboard': return <UserDashboard onNavigate={navigate} />;
    case 'admin': return <AdminDashboard onNavigate={navigate} />;
    default: return <LandingPage onNavigate={navigate} />;
  }
}
