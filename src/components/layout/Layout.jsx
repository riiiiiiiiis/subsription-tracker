import React from 'react';
import { shallow } from 'zustand/shallow';
import useUnifiedStore from '@/store/unified-store';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

const Layout = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useUnifiedStore(
    (state) => ({
      sidebarOpen: state.ui.sidebarOpen,
      setSidebarOpen: state.setSidebarOpen,
    }),
    shallow
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <main className="py-6 px-4 lg:px-6">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;