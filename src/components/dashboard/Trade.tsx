import React, { useState, useMemo } from 'react';
import './Dashboard.css';
import { ArrowRight, Search, X, ArrowLeft } from 'lucide-react';

interface Position {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

const ALL_ASSETS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 1.2 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.34, change: -2.4 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 822.79, change: 4.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, change: 0.5 },
  { symbol: 'META', name: 'Meta Platforms', price: 485.58, change: 2.1 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 174.42, change: 1.1 }
];

interface TradeProps {
  cashBalance: number;
  positions: Position[];
  onTrade: (type: 'buy' | 'sell', asset: string, amount: number, price: number, inDollars: boolean) => void;
  onBack: () => void;
}

const Trade: React.FC<TradeProps> = ({ cashBalance, positions, onTrade, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<typeof ALL_ASSETS[0] | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeInDollars, setTradeInDollars] = useState(false);
  const [amount, setAmount] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery) return ALL_ASSETS;
    return ALL_ASSETS.filter(a => 
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleTrade = () => {
    if (!selectedAsset || !amount) return;
    onTrade(tradeType, selectedAsset.symbol, Number(amount), selectedAsset.price, tradeInDollars);
    setAmount('');
    // Optional: Keep selected asset or clear it
  };

  // Calculate max sell
  const currentPosition = positions.find(p => p.symbol === selectedAsset?.symbol);
  const maxSell = currentPosition ? currentPosition.shares : 0;

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-link" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <ArrowLeft size={18} />
          </button>
          <h3>Trade Execution</h3>
        </div>
      </div>

      <div className="grid-layout">
        <div className="main-col">
          {/* Asset Selection */}
          <section className="dashboard-section">
            <div className="search-bar" style={{ marginBottom: '1rem' }}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search ticker to trade..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <X size={16} className="clear-search" onClick={() => setSearchQuery('')} />}
            </div>

            <div className="table-container">
               <table className="data-table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Price</th>
                      <th>24h Change</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map(asset => (
                      <tr key={asset.symbol} 
                          onClick={() => setSelectedAsset(asset)}
                          style={{ cursor: 'pointer', backgroundColor: selectedAsset?.symbol === asset.symbol ? 'rgba(0, 220, 130, 0.05)' : 'transparent' }}
                      >
                        <td>
                          <div className="asset-cell">
                            <span className="symbol">{asset.symbol}</span>
                            <span className="name">{asset.name}</span>
                          </div>
                        </td>
                        <td>${asset.price.toLocaleString()}</td>
                        <td className={asset.change >= 0 ? 'text-primary' : 'text-danger'}>
                           {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </td>
                        <td>
                            <button 
                              className="small-btn btn-secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAsset(asset);
                              }}
                            >
                              Select
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </section>
        </div>

        <div className="side-col">
          {selectedAsset ? (
            <div className="side-section" style={{ border: '1px solid var(--color-primary)' }}>
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
                    <span>
                        {tradeType === 'buy' 
                            ? `$${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` 
                            : `${maxSell.toFixed(4)} Shares`
                        }
                    </span>
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
                          setAmount(tradeInDollars ? (maxSell * selectedAsset.price).toString() : maxSell.toString());
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
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                    ≈ {tradeInDollars 
                        ? `${(Number(amount) / selectedAsset.price).toFixed(4)} Shares` 
                        : `$${(Number(amount) * selectedAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    }
                  </div>
                </div>

                <div className="trade-total">
                  <span>Estimated Total</span>
                  <span>${tradeInDollars ? Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : (Number(amount) * selectedAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <button 
                    className={`btn-primary w-full ${tradeType === 'sell' ? 'btn-sell' : ''}`} 
                    onClick={handleTrade}
                    disabled={!amount || Number(amount) <= 0}
                >
                  Confirm {tradeType.charAt(0).toUpperCase() + tradeType.slice(1)} <ArrowRight size={18} />
                </button>
            </div>
          ) : (
             <div className="side-section">
                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Select an asset to begin trading.</p>
             </div> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade;
