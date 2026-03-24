import React from 'react';
import './Dashboard.css';
import { FileText, Download, Calendar } from 'lucide-react';

interface MonthlyReportProps {
  onExport: (month: string) => void;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ onExport }) => {
  const reports = [
    { month: 'February 2026', status: 'Ready', transactions: 45, volume: '$124,500.00' },
    { month: 'January 2026', status: 'Ready', transactions: 32, volume: '$89,200.00' },
    { month: 'December 2025', status: 'Archived', transactions: 28, volume: '$76,400.00' },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h4>Monthly Statements</h4>
        <button className="small-btn btn-secondary" onClick={() => onExport('all')}>
          <Download size={14} /> Export All
        </button>
      </div>
      
      <div className="report-list">
        {reports.map((report, i) => (
          <div key={i} className="report-item">
            <div className="report-icon">
              <FileText size={20} className="text-primary" />
            </div>
            <div className="report-details">
              <span className="report-month">{report.month}</span>
              <div className="report-meta">
                <span>{report.transactions} txns</span>
                <span className="separator">•</span>
                <span>{report.volume}</span>
              </div>
            </div>
            <button className="download-btn" onClick={() => onExport(report.month)}>
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="tax-preview">
        <div className="tax-header">
          <Calendar size={16} />
          <span>YTD Tax Estimation</span>
        </div>
        <div className="tax-row">
            <span>Short-term Gains</span>
            <span className="text-white">$12,450.00</span>
        </div>
        <div className="tax-row">
            <span>Est. Tax Liability</span>
            <span className="text-danger">$3,735.00</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
