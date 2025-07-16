import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { LoginPage } from '@/components/LoginPage';
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

  const handleLogin = (type: 'member' | 'admin', data: any) => {
    setUserType(type);
    setUserData(data);
    if (type === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
    setCurrentPage('home');
  };

  // Show login page if user is not authenticated
  if (!userType) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
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
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        userType={userType}
        userData={userData}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
};

export default Index;
