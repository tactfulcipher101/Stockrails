import React, { useState, useEffect } from 'react';
import './DepositFlow.css';
import { 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Copy,
  QrCode,
  X,
  ArrowLeft
} from 'lucide-react';

interface DepositFlowProps {
  onClose: () => void;
  onDepositComplete: (amount: number) => void;
}

type Step = 'select' | 'address' | 'processing' | 'success';

const DepositFlow: React.FC<DepositFlowProps> = ({ onClose, onDepositComplete }) => {
  const [step, setStep] = useState<Step>('select');
  const [selectedAsset, setSelectedAsset] = useState<'USDT' | 'USDC'>('USDT');
  const [amount, setAmount] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation of the institutional pipeline
  useEffect(() => {
    if (step === 'processing') {
      const sequence = [
        { msg: 'Initiating MPC custody sequence...', delay: 800 },
        { msg: 'Running Chainalysis wallet risk screen...', delay: 2000 },
        { msg: '✓ AML/Sanctions check passed (Score: 0.02)', delay: 3500 },
        { msg: 'Locking OTC rate with liquidity provider...', delay: 4500 },
        { msg: 'Executing atomic swap (' + selectedAsset + ' -> USD)...', delay: 6000 },
        { msg: 'Settling to brokerage sub-account...', delay: 7500 },
      ];

      let timeouts: any[] = [];

      sequence.forEach(({ msg, delay }) => {
        const timeout = setTimeout(() => {
          setLogs(prev => [...prev, msg]);
        }, delay);
        timeouts.push(timeout);
      });

      const finalTimeout = setTimeout(() => {
        setStep('success');
        onDepositComplete(Number(amount));
      }, 8500);
      timeouts.push(finalTimeout);

      return () => timeouts.forEach(clearTimeout);
    }
  }, [step, amount, onDepositComplete]);

  return (
    <div className="deposit-overlay">
      <div className="deposit-modal">
        <div className="deposit-header">
          <h3>Institutional Deposit</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {step === 'select' && (
          <div className="deposit-step">
            <button className="back-link" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.85rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <p className="step-label">Select Asset to Onboard</p>
            <div className="asset-grid">
              {['USDT', 'USDC'].map((asset) => (
                <div 
                  key={asset} 
                  className={`asset-option ${selectedAsset === asset ? 'selected' : ''}`}
                  onClick={() => setSelectedAsset(asset as any)}
                >
                  <div className={`coin-icon ${asset.toLowerCase()}`}>{asset[0]}</div>
                  <span>{asset}</span>
                </div>
              ))}
            </div>

            <div className="input-group">
              <label>Deposit Amount ({selectedAsset})</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
              />
            </div>

            <div className="info-box">
              <ShieldCheck size={16} className="text-primary" />
              <p>Funds travel through our VASP-regulated pipeline. Third-party deposits are automatically rejected.</p>
            </div>

            <button 
              className="btn-primary w-full" 
              disabled={!amount || Number(amount) <= 0}
              onClick={() => setStep('address')}
            >
              Generate Secure Address <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 'address' && (
          <div className="deposit-step">
            <button className="back-link" onClick={() => setStep('select')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.85rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back to Selection
            </button>
            <p className="step-label">Send {selectedAsset} to Custody</p>
            
            <div className="qr-container">
              <QrCode size={120} />
            </div>

            <div className="address-box">
              <label>ERC-20 Deposit Address</label>
              <div className="address-value">
                <code>0x71C...9A23</code>
                <button className="copy-btn"><Copy size={16} /></button>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-primary)', marginTop: '0.5rem', textAlign: 'center' }}>
                <ShieldCheck size={10} style={{ display: 'inline', marginRight: '4px' }}/>
                Unique address assigned to your profile.
              </p>
            </div>

            <div className="warning-box">
              <AlertCircle size={16} />
              <p>Only send {selectedAsset} on Ethereum Mainnet. Wrong network deposits cannot be recovered.</p>
            </div>

            <button 
              className="btn-primary w-full" 
              onClick={() => setStep('processing')}
            >
              I Have Sent The Funds
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="deposit-step">
            <div className="processing-visual">
              <div className="spinner-ring"></div>
              <RefreshCw size={32} className="spinner-icon" />
            </div>
            
            <h4>Processing Liquidity</h4>
            
            <div className="terminal-logs">
              {logs.map((log, i) => (
                <div key={i} className="log-line">
                  <span className="log-arrow">{'>'}</span> {log}
                </div>
              ))}
              <div className="log-cursor">_</div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="deposit-step text-center">
            <div className="success-icon-large">
              <CheckCircle2 size={64} />
            </div>
            <h3>Deposit Settled</h3>
            <p className="success-desc">
              Your <strong>${Number(amount).toLocaleString()} USD</strong> is now available in your brokerage sub-account.
            </p>
            <button className="btn-primary w-full" onClick={onClose}>
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositFlow;
