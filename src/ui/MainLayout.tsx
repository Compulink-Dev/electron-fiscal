import React from 'react';
import Header from './components/header';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>
      
      {/* Scrollable Content Area */}
      <main className="flex-1 pt-14 overflow-y-auto"> {/* pt-16 accounts for header height */}
        {children}
      </main>
    </div>
  );
}

export default MainLayout;