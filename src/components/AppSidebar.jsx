import { BarChart3, CircleHelp, FileText, Landmark, LayoutDashboard, Settings, WalletCards } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import BrandMark from './BrandMark';

const navigation = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
  { label: 'Market watch', to: '/market-watch', icon: BarChart3 },
  { label: 'Portfolio', to: '/portfolio', icon: WalletCards },
  { label: 'Orders', to: '/orders', icon: FileText },
  { label: 'Funds', to: '/funds', icon: Landmark },
];

export default function AppSidebar({ isOpen, close }) {
  return (
    <>
      <button type="button" className={`mobile-overlay ${isOpen ? 'show' : ''}`} onClick={close} aria-label="Close navigation" />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <BrandMark />
        </div>
        <div className="workspace-label">TRADING SPACE</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={close}>
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={close}>
            <Settings size={18} /><span>Settings</span>
          </NavLink>
          <a className="nav-item nav-button" href="mailto:support@northstar.demo"><CircleHelp size={18} /><span>Help & support</span></a>
          <div className="sidebar-notice">
            <span className="notice-icon">✦</span>
            <div><strong>Simulation mode</strong><small>Virtual funds only</small></div>
          </div>
        </div>
      </aside>
    </>
  );
}
