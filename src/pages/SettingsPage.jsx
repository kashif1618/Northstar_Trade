import { Bell, Check, Moon, ShieldCheck, SlidersHorizontal, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { isSupabaseConfigured } from '../lib/supabaseClient';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="page standard-page settings-page">
      <div className="page-heading"><div><p className="greeting">ACCOUNT PREFERENCES</p><h1>Settings</h1><p className="subcopy">Control your workspace appearance and simulation preferences.</p></div></div>
      <section className="settings-grid"><article className="card settings-card"><div className="setting-title"><span className="setting-icon"><Moon size={20} /></span><div><h2>Appearance</h2><p>Choose the interface that works best for you.</p></div></div><div className="setting-option"><div><strong>Color theme</strong><small>{theme === 'dark' ? 'Dark mode is active' : 'Light mode is active'}</small></div><button type="button" className="theme-switch" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button></div></article><article className="card settings-card"><div className="setting-title"><span className="setting-icon"><Bell size={20} /></span><div><h2>Notifications</h2><p>Decide when the platform should get your attention.</p></div></div><div className="setting-option"><div><strong>Order updates</strong><small>Get notified when a simulated order changes status.</small></div><span className="toggle-on"><i /></span></div></article><article className="card settings-card"><div className="setting-title"><span className="setting-icon"><ShieldCheck size={20} /></span><div><h2>Connection</h2><p>Supabase manages sign-in and data when configured.</p></div></div><div className="connection-status"><span className={isSupabaseConfigured ? 'connected' : 'pending'}><i />{isSupabaseConfigured ? 'Supabase connected' : 'Credentials required'}</span><p>{isSupabaseConfigured ? 'Your public project credentials are available in this environment.' : 'Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env to activate data services.'}</p></div></article></section>
    </div>
  );
}
