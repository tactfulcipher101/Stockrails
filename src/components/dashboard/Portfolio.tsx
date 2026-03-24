import React, { useMemo } from 'react';
import './Dashboard.css';
import { 
  ArrowUpRight, 
  TrendingDown,
  Activity,
  Globe,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

interface Position {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

interface Transaction {
  date: string;
  type: string;
  asset: string;
  amount: string;
  status: string;
}

interface PortfolioProps {
  totalValue: number;
  cashBalance: number;
  positions: Position[];
  transactions: Transaction[];
  onTradeAction: (pos: Position, type: 'buy' | 'sell') => void;
  onBack: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
  totalValue, 
  cashBalance, 
  positions, 
  transactions,
  onTradeAction,
  onBack
}) => {
  const [timeframe, setTimeframe] = React.useState('1M');

  // Portfolio Chart Data (Mock)
  const chartPoints = useMemo(() => {
    const pointsCount = timeframe === '1D' ? 12 : timeframe === '1W' ? 20 : 30;
    return Array.from({ length: pointsCount }, (_, i) => ({
      x: i * (950 / (pointsCount - 1)),
      y: 100 - (Math.sin(i * 0.5) * 20 + Math.random() * 30 + 30)
    }));
  }, [timeframe]);

  const chartPath = useMemo(() => {
    if (chartPoints.length === 0) return '';
    return `M 0 100 ${chartPoints.map(p => `L ${p.x} ${p.y}`).join(' ')} L 950 100 Z`;
  }, [chartPoints]);

  const chartLine = useMemo(() => {
    if (chartPoints.length === 0) return '';
    return `M 0 ${chartPoints[0].y} ${chartPoints.map(p => `L ${p.x} ${p.y}`).join(' ')}`;
  }, [chartPoints]);

  const handleViewLedger = () => {
    alert("Viewing full institutional ledger (Mock)");
  };

  return (
    <div className="dashboard-content grid-layout">
      <div className="main-col">
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="back-link" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
              <ArrowLeft size={18} />
            </button>
            <h3>Portfolio Overview</h3>
          </div>
        </div>
        {/* Portfolio Performance Chart */}
        <section className="portfolio-chart-section">
          <div className="chart-header">
            <div>
              <span className="label">Total Portfolio Value</span>
              <div className="value-group">
                <h2 className="total-value">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <span className="change positive"><ArrowUpRight size={16} /> +5.2% ($234.12)</span>
              </div>
            </div>
            <div className="chart-period-tabs">
              {['1D', '1W', '1M', '1Y', 'ALL'].map(p => (
                <button 
                  key={p} 
                  className={p === timeframe ? 'active' : ''}
                  onClick={() => setTimeframe(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="chart-visual-container">
            <svg width="100%" height="200" preserveAspectRatio="none" viewBox="0 0 950 100">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0, 220, 130, 0.3)" />
                  <stop offset="100%" stopColor="rgba(0, 220, 130, 0)" />
                </linearGradient>
              </defs>
              <path d={chartPath} fill="url(#chartGradient)" />
              <path d={chartLine} fill="none" stroke="var(--color-primary)" strokeWidth="3" />
            </svg>
          </div>
        </section>

        <div className="summary-stats-grid">
          <div className="summary-card">
            <span className="label">Buying Power</span>
            <h3>${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
            <p className="sub-label">Settled USD</p>
          </div>
          <div className="summary-card">
            <span className="label">Institutional Yield</span>
            <h3>4.2% APY</h3>
            <p className="sub-label">On idle cash</p>
          </div>
        </div>

        {/* Positions Table */}
        <section className="dashboard-section">
          <div className="section-header">
            <h3>Institutional Equity Positions</h3>
            <div className="header-filters">
              <Activity size={16} /> <span>Real-time</span>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Value</th>
                  <th>Day Change</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => (
                  <tr key={pos.symbol}>
                    <td>
                      <div className="asset-cell">
                        <span className="symbol">{pos.symbol}</span>
                        <span className="name">{pos.name}</span>
                      </div>
                    </td>
                    <td>{pos.shares}</td>
                    <td>${pos.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${pos.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={pos.change >= 0 ? 'text-primary' : 'text-danger'}>
                      <div className="change-cell">
                        {pos.change >= 0 ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                        {pos.change >= 0 ? '+' : ''}{pos.change}%
                      </div>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="small-btn btn-primary" onClick={() => onTradeAction(pos, 'buy')}>Buy</button>
                        <button className="small-btn btn-secondary" onClick={() => onTradeAction(pos, 'sell')}>Sell</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Side Column */}
      <div className="side-col">
        <section className="side-section">
          <h3>Institutional Feed</h3>
          <div className="news-list">
            <div className="news-item">
              <div className="news-tag">MARKET</div>
              <h4>Fed signals potential rate freeze for Q3 2026.</h4>
              <span className="news-time">12m ago</span>
            </div>
            <div className="news-item">
              <div className="news-tag">STABLES</div>
              <h4>USDT/USDC liquidity pools hit record depth on mainnet.</h4>
              <span className="news-time">1h ago</span>
            </div>
            <div className="news-item">
              <div className="news-tag">EQUITY</div>
              <h4>NVIDIA announces institutional custody partnership.</h4>
              <span className="news-time">3h ago</span>
            </div>
          </div>
        </section>

        <section className="side-section">
          <h3>Recent Activity</h3>
          <div className="activity-list compact">
            {transactions.slice(0, 3).map((tx, i) => (
              <div key={i} className="activity-item">
                <div className="activity-info">
                  <span className="tx-type">{tx.type}</span>
                  <span className="tx-asset">{tx.asset}</span>
                </div>
                <div className="activity-meta">
                  <span className="tx-amount">{tx.amount}</span>
                  <span className="tx-status status-completed">OK</span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn" onClick={handleViewLedger}>View Full Ledger <ExternalLink size={14} /></button>
        </section>

        <div className="infra-status-card">
          <div className="infra-header">
            <Globe size={18} className="text-primary" />
            <span>Global Nodes</span>
          </div>
          <div className="node-list">
            <div className="node-item"><span className="dot online"></span> NY-01 Active</div>
            <div className="node-item"><span className="dot online"></span> LDN-04 Active</div>
            <div className="node-item"><span className="dot online"></span> HKG-02 Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
