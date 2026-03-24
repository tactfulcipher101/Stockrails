import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DepositFlow from './DepositFlow';
import WithdrawFlow from './WithdrawFlow';
import Portfolio from './Portfolio';
import Trade from './Trade';
import Wallet from './Wallet';
import Activity from './Activity';
import Settings from './Settings';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet as WalletIcon, 
  History, 
  Settings as SettingsIcon, 
  Search,
  Bell,
  User,
  LogOut,
  X,
  ArrowRight,
  Info,
  ShieldCheck
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

interface Transaction {
  date: string;
  time: string;
  type: string;
  asset: string;
  amount: string;
  status: string;
}

const ALL_ASSETS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 1.2 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.34, change: -2.4 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 822.79, change: 4.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, change: 0.5 },
  { symbol: 'META', name: 'Meta Platforms', price: 485.58, change: 2.1 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 174.42, change: 1.1 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.65, change: 0.9 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 191.12, change: 2.3 }
];

type Tab = 'portfolio' | 'trade' | 'wallet' | 'activity' | 'settings';

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [positions, setPositions] = useState<Position[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 12.5, price: 185.92, change: 1.2, value: 2324.00 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 5.0, price: 175.34, change: -2.4, value: 876.70 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 8.2, price: 822.79, change: 4.8, value: 6746.88 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 10.0, price: 415.50, change: 0.5, value: 4155.00 },
  ]);

  const [cashBalance, setCashBalance] = useState(1450.00);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState<Position | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeInDollars, setTradeInDollars] = useState(false);
  const [amount, setAmount] = useState('');
  
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { date: '2026-02-24', time: '14:22:15', type: 'Buy', asset: 'AAPL', amount: '$500.00', status: 'Completed' },
    { date: '2026-02-23', time: '09:45:30', type: 'Deposit', asset: 'USDT', amount: '2,000.00', status: 'Completed' },
    { date: '2026-02-22', time: '11:10:05', type: 'Sell', asset: 'TSLA', amount: '$1,200.00', status: 'Completed' },
  ]);

  const [notifications, setNotifications] = useState<string[]>([]);

  // Filtered assets for search
  const filteredAssets = searchQuery ? ALL_ASSETS.filter(a => 
    a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

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
    const newTotal = positions.reduce((acc, pos) => acc + pos.value, cashBalance);
    setTotalValue(newTotal);
  }, [positions, cashBalance]);

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== msg));
    }, 4000);
  };

  const handleTradeSubmit = (type: 'buy' | 'sell', symbol: string, value: number, price: number, inDollars: boolean = false) => {
    let shares = inDollars ? value / price : value;
    let totalCost = inDollars ? value : shares * price;
    
    if (type === 'buy') {
      if (totalCost > cashBalance) {
        addNotification("Error: Insufficient buying power.");
        return;
      }
      setCashBalance(prev => prev - totalCost);
      setPositions(prev => {
        const existing = prev.find(p => p.symbol === symbol);
        if (existing) {
          return prev.map(p => p.symbol === symbol ? { ...p, shares: p.shares + shares, value: (p.shares + shares) * price } : p);
        } else {
          const assetInfo = ALL_ASSETS.find(a => a.symbol === symbol)!;
          return [...prev, { ...assetInfo, shares, value: shares * price }];
        }
      });
    } else {
      const existing = positions.find(p => p.symbol === symbol);
      if (!existing || existing.shares < shares) {
        addNotification("Error: Insufficient shares to sell.");
        return;
      }
      setCashBalance(prev => prev + totalCost);
      setPositions(prev => {
        return prev.map(p => p.symbol === symbol ? { ...p, shares: p.shares - shares, value: (p.shares - shares) * price } : p).filter(p => p.shares > 0);
      });
    }

    const now = new Date();
    const newTx: Transaction = {
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      type: type.charAt(0).toUpperCase() + type.slice(1),
      asset: symbol,
      amount: `${type === 'buy' ? '-' : '+'}$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      status: 'Completed'
    };
    setTransactions(prev => [newTx, ...prev]);
    addNotification(`Success: ${type.toUpperCase()} order for ${shares.toFixed(4)} shares of ${symbol} confirmed.`);
    setSelectedAsset(null);
    setAmount('');
  };

  const handleDepositComplete = React.useCallback((depositAmount: number) => {
    setCashBalance(prev => prev + depositAmount);
    addNotification(`Deposit Settled: $${depositAmount.toLocaleString()} USD added to buying power.`);
    
    const now = new Date();
    const newTx: Transaction = {
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      type: 'Deposit',
      asset: 'USDT',
      amount: depositAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      status: 'Completed'
    };
    setTransactions(prev => [newTx, ...prev]);
    setIsDepositOpen(false);
  }, []);

  const handleWithdrawComplete = React.useCallback((withdrawAmount: number) => {
    setCashBalance(prev => prev - withdrawAmount);
    addNotification(`Withdrawal Initiated: $${withdrawAmount.toLocaleString()} USD offboarding to crypto.`);
    
    const now = new Date();
    const newTx: Transaction = {
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      type: 'Withdraw',
      asset: 'USDT',
      amount: `-$${withdrawAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      status: 'Completed'
    };
    setTransactions(prev => [newTx, ...prev]);
    setIsWithdrawOpen(false);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <Portfolio 
            totalValue={totalValue} 
            cashBalance={cashBalance} 
            positions={positions} 
            transactions={transactions}
            onTradeAction={(pos, type) => {
                setSelectedAsset(pos);
                setTradeType(type);
            }}
            onBack={onBack}
          />
        );
      case 'trade':
        return (
          <Trade 
            cashBalance={cashBalance} 
            positions={positions}
            onTrade={handleTradeSubmit}
            onBack={() => setActiveTab('portfolio')}
          />
        );
      case 'wallet':
        return (
          <Wallet 
            cashBalance={cashBalance}
            onDeposit={() => setIsDepositOpen(true)}
            onWithdraw={() => setIsWithdrawOpen(true)}
            onBack={() => setActiveTab('portfolio')}
          />
        );
      case 'activity':
        return (
          <Activity 
            transactions={transactions} 
            onBack={() => setActiveTab('portfolio')}
          />
        );
      case 'settings':
        return <Settings onBack={() => setActiveTab('portfolio')} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {notifications.map((n, i) => (
          <div key={i} className="toast">
            <Info size={16} /> {n}
          </div>
        ))}
      </div>

      {/* Modals */}
      {isDepositOpen && (
        <DepositFlow 
          onClose={() => setIsDepositOpen(false)} 
          onDepositComplete={handleDepositComplete} 
        />
      )}

      {isWithdrawOpen && (
        <WithdrawFlow 
          onClose={() => setIsWithdrawOpen(false)} 
          onWithdrawComplete={handleWithdrawComplete}
          availableBalance={cashBalance}
        />
      )}

      {/* Trade Modal Overlay (Global Shortcut) */}
      {selectedAsset && (
        <div className="modal-overlay">
          <div className="trade-modal">
            <button className="back-link" onClick={() => setSelectedAsset(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.85rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
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
                <span>{tradeType === 'buy' ? `$${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : `${selectedAsset.shares.toFixed(4)} Shares`}</span>
              </div>
            </div>

            <div className="trade-mode-tabs">
              <button 
                className={`tab ${!tradeInDollars ? 'active' : ''}`} 
                onClick={() => setTradeInDollars(false)}
              >
                Shares
              </button>
              <button 
                className={`tab ${tradeInDollars ? 'active' : ''}`} 
                onClick={() => setTradeInDollars(true)}
              >
                Dollars
              </button>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ margin: 0 }}>Amount ({tradeInDollars ? 'USD' : 'Shares'})</label>
                <button 
                  className="small-btn btn-secondary" 
                  onClick={() => {
                    if (tradeType === 'buy') {
                      setAmount(tradeInDollars ? cashBalance.toString() : (cashBalance / selectedAsset.price).toString());
                    } else {
                      setAmount(tradeInDollars ? (selectedAsset.shares * selectedAsset.price).toString() : selectedAsset.shares.toString());
                    }
                  }}
                  style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}
                >
                  MAX
                </button>
              </div>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  ≈ {tradeInDollars 
                    ? `${(Number(amount) / selectedAsset.price).toFixed(4)} Shares` 
                    : `$${(Number(amount) * selectedAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  }
                </span>
              </div>
            </div>

            <div className="trade-total">
              <span>Estimated Total</span>
              <span>${tradeInDollars ? Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : (Number(amount) * selectedAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <button className={`btn-primary w-full ${tradeType === 'sell' ? 'btn-sell' : ''}`} onClick={() => handleTradeSubmit(tradeType, selectedAsset.symbol, Number(amount), selectedAsset.price, tradeInDollars)}>
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
          <button onClick={() => setActiveTab('portfolio')} className={`nav-item w-full ${activeTab === 'portfolio' ? 'active' : ''}`}><LayoutDashboard size={20} /> <span>Portfolio</span></button>
          <button onClick={() => setActiveTab('trade')} className={`nav-item w-full ${activeTab === 'trade' ? 'active' : ''}`}><TrendingUp size={20} /> <span>Trade</span></button>
          <button onClick={() => setActiveTab('wallet')} className={`nav-item w-full ${activeTab === 'wallet' ? 'active' : ''}`}><WalletIcon size={20} /> <span>Wallet</span></button>
          <button onClick={() => setActiveTab('activity')} className={`nav-item w-full ${activeTab === 'activity' ? 'active' : ''}`}><History size={20} /> <span>Activity</span></button>
          <div className="nav-divider"></div>
          <button onClick={() => setActiveTab('settings')} className={`nav-item w-full ${activeTab === 'settings' ? 'active' : ''}`}><SettingsIcon size={20} /> <span>Settings</span></button>
          <button className="nav-item logout-btn" onClick={onBack}><LogOut size={20} /> <span>Log Out</span></button>
        </nav>
        <div className="sidebar-footer">
          <div className="kyc-badge-footer">
            <ShieldCheck size={14} className="text-primary" />
            <span>KYC LEVEL 2: UNLIMITED</span>
          </div>
          <div className="user-profile">
            <div className="avatar"><User size={20} /></div>
            <div className="user-info">
              <span className="user-name">Tactful Cipher</span>
              <span className="user-status">tactfulcipher101@gmail.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="search-container">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search ticker (e.g. AAPL, AMZN)..." 
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <X size={16} className="clear-search" onClick={() => setSearchQuery('')} />}
            </div>
            {isSearchOpen && searchQuery && (
              <div className="search-results-dropdown">
                {filteredAssets.length > 0 ? (
                  filteredAssets.map(asset => (
                    <div 
                      key={asset.symbol} 
                      className="search-item"
                      onClick={() => {
                        setSelectedAsset(asset as any);
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                    >
                      <div>
                        <span className="search-symbol">{asset.symbol}</span>
                        <span className="search-name">{asset.name}</span>
                      </div>
                      <div className="search-item-price">
                        <span>${asset.price.toFixed(2)}</span>
                        <span className={asset.change >= 0 ? 'text-primary' : 'text-danger'}>
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No assets found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>
          
          <div className="header-market-status">
            <div className="status-dot online"></div>
            <span>NYSE: OPEN</span>
          </div>

          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <button className="btn-secondary" onClick={() => setIsWithdrawOpen(true)}>Withdraw</button>
            <button className="btn-primary" onClick={() => setIsDepositOpen(true)}>Deposit Crypto</button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
