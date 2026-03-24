import React from 'react';
import './Dashboard.css';
import { ArrowUpRight, ArrowDownLeft, ShieldCheck, Globe, ArrowLeft } from 'lucide-react';

interface WalletProps {
  cashBalance: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  onBack: () => void;
}

const Wallet: React.FC<WalletProps> = ({ cashBalance, onDeposit, onWithdraw, onBack }) => {
  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-link" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <ArrowLeft size={18} />
          </button>
          <h3>Institutional Wallet</h3>
        </div>
      </div>

      <div className="grid-layout">
        <div className="main-col">
          <section className="portfolio-chart-section" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' }}>
            <div className="chart-header">
              <div>
                <span className="label">Available Buying Power</span>
                <h2 className="total-value">${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                <p className="sub-label" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <ShieldCheck size={14} /> Fully Settled & Insured
                </p>
              </div>
              <div className="header-actions">
                <button className="btn-primary" onClick={onDeposit}>
                  <ArrowDownLeft size={18} /> Deposit
                </button>
                <button className="btn-secondary" onClick={onWithdraw}>
                  <ArrowUpRight size={18} /> Withdraw
                </button>
              </div>
            </div>
          </section>

          <div className="summary-stats-grid">
            <div className="summary-card">
              <span className="label">Asset Breakdown</span>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>USD (Cash)</span>
                    <span>100%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--color-primary)', borderRadius: '4px', width: '100%' }}></div>
              </div>
            </div>
            <div className="summary-card">
              <span className="label">Yield Earnings</span>
              <h3>$12.45</h3>
              <p className="sub-label">Accrued this month (4.2% APY)</p>
            </div>
          </div>

          <section className="dashboard-section">
             <div className="section-header">
                <h3>Connected Accounts</h3>
             </div>
             <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Account Type</th>
                      <th>Identifier</th>
                      <th>Status</th>
                      <th>Last Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Ethereum Wallet</td>
                        <td>0x71C...3921</td>
                        <td><span className="text-primary">Verified</span></td>
                        <td>2 hours ago</td>
                    </tr>
                    <tr>
                        <td>Brokerage Settlement</td>
                        <td>Apex Clearing - 9422</td>
                        <td><span className="text-primary">Active</span></td>
                        <td>Instant</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </section>
        </div>

        <div className="side-col">
            <div className="infra-status-card">
              <div className="infra-header">
                <Globe size={18} className="text-primary" />
                <span>Security Infrastructure</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                Your funds are held in a combination of segregated institutional brokerage accounts and MPC-secured digital vaults. 
                Assets are never rehypothecated.
              </p>
              <div className="node-list" style={{ marginTop: '1rem' }}>
                <div className="node-item"><ShieldCheck size={14} className="text-primary" /> SIPC Insured</div>
                <div className="node-item"><ShieldCheck size={14} className="text-primary" /> SOC2 Compliant</div>
                <div className="node-item"><ShieldCheck size={14} className="text-primary" /> ISO 27001</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
