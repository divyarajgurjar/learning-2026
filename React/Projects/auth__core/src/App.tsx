import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { DashboardScreen } from './screens/DashboardScreen';

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<'welcome' | 'login' | 'register'>('welcome');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffe800] flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-12 h-12 hazard-stripe border-4 border-black animate-spin" />
        <div className="text-xl font-black italic uppercase tracking-tighter">
          LOADING_CORE_SYSTEMS...
        </div>
      </div>
    );
  }

  if (user) {
    return <DashboardScreen />;
  }

  if (view === 'login') {
    return <LoginScreen onBack={() => setView('welcome')} />;
  }

  if (view === 'register') {
    return (
      <RegisterScreen 
        onBack={() => setView('welcome')} 
        onSuccess={() => setView('login')} 
      />
    );
  }

  return (
    <WelcomeScreen 
      onLogin={() => setView('login')} 
      onRegister={() => setView('register')} 
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
