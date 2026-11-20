import { indices, stocks } from '../data/marketData';

// This adapter keeps the presentation layer independent of a future licensed
// market-data provider. The initial dashboard intentionally returns simulated data.
export const marketService = {
  async getMarketOverview() {
    return { indices, stocks, source: 'simulated' };
  },
  async searchInstruments(query = '') {
    const normalized = query.trim().toLowerCase();
    return stocks.filter((stock) => !normalized || stock.symbol.toLowerCase().includes(normalized) || stock.name.toLowerCase().includes(normalized));
  },
};
