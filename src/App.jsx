import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import FundsPage from './pages/FundsPage';
import MarketWatchPage from './pages/MarketWatchPage';
import OrdersPage from './pages/OrdersPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';
import StockDetailPage from './pages/StockDetailPage';

function App() {
  return (
  <DashboardLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/market-watch" element={<MarketWatchPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/funds" element={<FundsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/stock/:symbol" element={<StockDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </DashboardLayout>
  )
}

export default App;
