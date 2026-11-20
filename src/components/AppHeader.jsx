import { Bell, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Avatar from './Avatar';

export default function AppHeader({ onOpenMenu }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const goToSearch = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      navigate(`/market-watch?search=${encodeURIComponent(query.trim())}`);
      event.currentTarget.blur();
    }
  };
  return (
    <header className="topbar">
      <button type="button" className="mobile-menu" aria-label="Open navigation" onClick={onOpenMenu}>
        <Menu size={21} />
      </button>
      <div className="header-search">
        <Search size={18} />
        <input aria-label="Search instruments" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={goToSearch} placeholder="Search instruments, e.g. RELIANCE" />
        <kbd>⌘ K</kbd>
      </div>
      <div className="topbar-actions">
        <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="notification-wrap">
          <button type="button" className="icon-button notification" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Notifications"><Bell size={18} /><i /></button>
          {notificationsOpen && <div className="notification-popover"><button type="button" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications"><X size={14} /></button><strong>All caught up</strong><span>Your simulated order activity will appear here.</span></div>}
        </div>
        <div className="profile-summary"><Avatar /><div><strong>Kashif Ibrahim</strong><span>Individual account</span></div></div>
      </div>
    </header>
  );
}
