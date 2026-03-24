import React from 'react';
import './Dashboard.css';
import { ExternalLink, Search, Filter, ArrowLeft } from 'lucide-react';
import MonthlyReport from './MonthlyReport';

interface Transaction {
  date: string;
  time: string;
  type: string;
  asset: string;
  amount: string;
  status: string;
}

interface ActivityProps {
  transactions: Transaction[];
  onBack: () => void;
}

const Activity: React.FC<ActivityProps> = ({ transactions, onBack }) => {
  const handleExport = (month: string) => {
    alert(`Exporting report for: ${month}`);
  };

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-link" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <ArrowLeft size={18} />
          </button>
          <h3>Activity Ledger</h3>
        </div>
        <div className="header-actions">
           <div className="search-bar" style={{ width: '250px' }}>
              <Search size={16} />
              <input type="text" placeholder="Filter transactions..." />
           </div>
           <button className="icon-btn"><Filter size={20} /></button>
        </div>
      </div>

      <div className="grid-layout">
        <div className="main-col">
          <section className="dashboard-section">
            <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Asset</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, i) => (
                      <tr key={i}>
                        <td>{tx.date}</td>
                        <td>{tx.time}</td>
                        <td>
                            <span className={`tx-type ${tx.type.toLowerCase() === 'deposit' ? 'text-primary' : tx.type.toLowerCase() === 'withdraw' ? 'text-danger' : ''}`}>
                                {tx.type}
                            </span>
                        </td>
                        <td>{tx.asset}</td>
                        <td>{tx.amount}</td>
                        <td>
                            <span className="status-badge completed">Completed</span>
                        </td>
                        <td>
                            <button className="small-btn btn-secondary">
                                <ExternalLink size={14} /> View
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
            <section className="side-section">
                <h3>Financial Reporting</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Generate institutional-grade reports for tax and compliance.
                </p>
                <MonthlyReport onExport={handleExport} />
            </section>
        </div>
      </div>
    </div>
  );
};

export default Activity;
