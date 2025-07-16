import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { LoginPage } from '@/components/auth/LoginPage';
import { PasswordChangeModal } from '@/components/auth/PasswordChangeModal';
import { ProfileSetupModal } from '@/components/auth/ProfileSetupModal';
import { WelcomeAnimation } from '@/components/auth/WelcomeAnimation';
import { HomePage } from '@/components/HomePage';
import { DashboardPage } from '@/components/DashboardPage';
import { AdminDashboard } from '@/components/AdminDashboard';
import { ContributionsPage } from '@/components/ContributionsPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { VotingPage } from '@/components/VotingPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userType, setUserType] = useState<'member' | 'admin' | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<any>(null);
  const [pendingUserType, setPendingUserType] = useState<'member' | 'admin' | null>(null);

  const handleLogin = (type: 'member' | 'admin', data: any, isFirstLogin: boolean) => {
    setPendingUserData(data);
    setPendingUserType(type);
    
    if (isFirstLogin || !data.hasChangedPassword) {
      setShowPasswordChange(true);
    } else {
      completeLogin(type, data);
    }
  };

  const handlePasswordChanged = () => {
    setShowPasswordChange(false);
    if (!pendingUserData.profilePhoto) {
      setShowProfileSetup(true);
    } else {
      completeLogin(pendingUserType!, { ...pendingUserData, hasChangedPassword: true });
    }
  };

  const handleProfileSetup = (profilePhoto: string | null) => {
    setShowProfileSetup(false);
    const updatedUserData = { 
      ...pendingUserData, 
      profilePhoto, 
      hasChangedPassword: true 
    };
    completeLogin(pendingUserType!, updatedUserData);
  };

  const completeLogin = (type: 'member' | 'admin', data: any) => {
    setUserType(type);
    setUserData(data);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    if (userType === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
    setPendingUserData(null);
    setPendingUserType(null);
    setCurrentPage('home');
    setShowPasswordChange(false);
    setShowProfileSetup(false);
    setShowWelcome(false);
  };

  // Show login page if user is not authenticated
  if (!userType && !showPasswordChange && !showProfileSetup) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (!userType || !userData) return <HomePage onPageChange={setCurrentPage} currentPage={currentPage} />;
    
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onPageChange={setCurrentPage} memberData={userData} />;
      case 'admin-dashboard':
        return <AdminDashboard adminData={userData} onPageChange={setCurrentPage} />;
      case 'contributions':
        return <ContributionsPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'voting':
        return <VotingPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} currentPage={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {userType && userData && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          userType={userType}
          userData={userData}
          onLogout={handleLogout}
        />
      )}
      
      <main className={userType && userData ? '' : 'pt-0'}>
        {renderPage()}
      </main>

      {/* Modals */}
      <PasswordChangeModal
        isOpen={showPasswordChange}
        onPasswordChanged={handlePasswordChanged}
        userName={pendingUserData?.firstName || pendingUserData?.name || 'User'}
      />

      <ProfileSetupModal
        isOpen={showProfileSetup}
        onProfileSetup={handleProfileSetup}
        userName={pendingUserData?.firstName || pendingUserData?.name || 'User'}
      />

      <WelcomeAnimation
        isVisible={showWelcome}
        userName={userData?.firstName || userData?.name || 'User'}
        userType={userType || 'member'}
        onComplete={handleWelcomeComplete}
      />
    </div>
  );
};

export default Index;
