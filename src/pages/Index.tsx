import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HomePage } from '@/components/HomePage';
import { DashboardPage } from '@/components/DashboardPage';
import { ContributionsPage } from '@/components/ContributionsPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { VotingPage } from '@/components/VotingPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onPageChange={setCurrentPage} />;
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
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Index;
