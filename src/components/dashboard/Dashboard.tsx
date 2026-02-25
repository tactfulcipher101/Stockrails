import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  History, 
  Settings, 
  ArrowUpRight, 
  Search,
  Bell,
  User,
  LogOut,
  X,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

interface Position {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [positions, setPositions] = useState<Position[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 12.5, price: 185.92, change: 1.2, value: 2324.00 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 5.0, price: 175.34, change: -2.4, value: 876.70 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 8.2, price: 822.79, change: 4.8, value: 6746.88 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 10.0, price: 415.50, change: 0.5, value: 4155.00 },
  ]);

  const [totalValue, setTotalValue] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState<Position | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');

  // Mock Real-Time Feed Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(currentPositions => 
        currentPositions.map(pos => {
          const fluctuation = 1 + (Math.random() * 0.002 - 0.001);
          const newPrice = pos.price * fluctuation;
          return {
            ...pos,
            price: newPrice,
            value: newPrice * pos.shares
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newTotal = positions.reduce((acc, pos) => acc + pos.value, 1450.00);
    setTotalValue(newTotal);
  }, [positions]);

  const handleTrade = () => {
    alert(`${tradeType.toUpperCase()} order placed for ${amount} shares of ${selectedAsset?.symbol}`);
    setSelectedAsset(null);
    setAmount('');
  };

  const transactions = [
    { date: '2026-02-24', type: 'Buy', asset: 'AAPL', amount: '$500.00', status: 'Completed' },
    { date: '2026-02-23', type: 'Deposit', asset: 'USDT', amount: '2,000.00', status: 'Completed' },
    { date: '2026-02-22', type: 'Sell', asset: 'TSLA', amount: '$1,200.00', status: 'Completed' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar and Header omitted for brevity in this replace call, will include in actual file */}
      
      {/* Trade Modal Overlay */}
      {selectedAsset && (
        <div className="modal-overlay">
          <div className="trade-modal">
            <div className="modal-header">
              <h3>Trade {selectedAsset.symbol}</h3>
              <button className="close-btn" onClick={() => setSelectedAsset(null)}><X size={20} /></button>
            </div>
            
            <div className="trade-tabs">
              <button className={`tab ${tradeType === 'buy' ? 'active' : ''}`} onClick={() => setTradeType('buy')}>Buy</button>
              <button className={`tab ${tradeType === 'sell' ? 'active' : ''}`} onClick={() => setTradeType('sell')}>Sell</button>
            </div>

            <div className="trade-info">
              <div className="info-row">
                <span>Current Price</span>
                <span className="text-primary">${selectedAsset.price.toFixed(2)}</span>
              </div>
              <div className="info-row">
                <span>Available</span>
                <span>{tradeType === 'buy' ? '$1,450.00' : `${selectedAsset.shares} Shares`}</span>
              </div>
            </div>

            <div className="input-group">
              <label>Amount (Shares)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="trade-total">
              <span>Estimated Total</span>
              <span>${(Number(amount) * selectedAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <button className={`btn-primary w-full ${tradeType === 'sell' ? 'btn-sell' : ''}`} onClick={handleTrade}>
              Confirm {tradeType.charAt(0).toUpperCase() + tradeType.slice(1)} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          STOCK<span className="text-primary">RAIL</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> <span>Portfolio</span></a>
          <a href="#" className="nav-item"><TrendingUp size={20} /> <span>Trade</span></a>
          <a href="#" className="nav-item"><Wallet size={20} /> <span>Wallet</span></a>
          <a href="#" className="nav-item"><History size={20} /> <span>Activity</span></a>
          <div className="nav-divider"></div>
          <a href="#" className="nav-item"><Settings size={20} /> <span>Settings</span></a>
          <button className="nav-item logout-btn" onClick={onBack}><LogOut size={20} /> <span>Log Out</span></button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar"><User size={20} /></div>
            <div className="user-info">
              <span className="user-name">Ibrahim Adebisi</span>
              <span className="user-status">Verified Beta</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search stocks or crypto..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <button className="btn-primary">Deposit Crypto</button>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Portfolio Summary */}
          <section className="portfolio-summary">
            <div className="summary-card main-balance">
              <span className="label">Total Portfolio Value</span>
              <div className="value-group">
                <h2 className="total-value">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <span className="change positive"><ArrowUpRight size={16} /> +5.2%</span>
              </div>
              <p className="sub-label">Includes $1,450.00 in cash liquidity</p>
            </div>
            <div className="summary-card">
              <span className="label">Buying Power</span>
              <h3>$1,450.00</h3>
              <p className="sub-label">Settled USD</p>
            </div>
            <div className="summary-card">
              <span className="label">Pending Deposits</span>
              <h3>$0.00</h3>
              <p className="sub-label">0 BTC / 0 USDT</p>
            </div>
          </section>

          {/* Positions Table */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3>Equity Positions</h3>
              <button className="text-btn">View All</button>
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
                        {pos.change >= 0 ? '+' : ''}{pos.change}%
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="small-btn btn-primary" onClick={() => { setSelectedAsset(pos); setTradeType('buy'); }}>Buy</button>
                          <button className="small-btn btn-secondary" onClick={() => { setSelectedAsset(pos); setTradeType('sell'); }}>Sell</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <button className="text-btn">View History</button>
            </div>
            <div className="activity-list">
              {transactions.map((tx, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-info">
                    <span className="tx-type">{tx.type}</span>
                    <span className="tx-asset">{tx.asset}</span>
                  </div>
                  <div className="activity-meta">
                    <span className="tx-date">{tx.date}</span>
                    <span className="tx-amount">{tx.amount}</span>
                    <span className="tx-status status-completed">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
