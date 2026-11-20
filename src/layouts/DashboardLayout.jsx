import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-shell">
      <AppSidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />
      <main className="main-content">
        <AppHeader onOpenMenu={() => setSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
