import React, { useState, useEffect } from 'react';
import './DepositFlow.css'; // Reusing some shared modal styles
import { 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

interface WithdrawFlowProps {
  onClose: () => void;
  onWithdrawComplete: (amount: number) => void;
  availableBalance: number;
}

type Step = 'amount' | 'address' | 'processing' | 'success';

const WithdrawFlow: React.FC<WithdrawFlowProps> = ({ onClose, onWithdrawComplete, availableBalance }) => {
  const [step, setStep] = useState<Step>('amount');
  const [selectedAsset, setSelectedAsset] = useState<'USDT' | 'USDC'>('USDT');
  const [amount, setAmount] = useState('');
  const [targetAddress, setTargetAddress] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (step === 'processing') {
      const sequence = [
        { msg: 'Checking available brokerage settlement...', delay: 400 },
        { msg: 'Locking exit rate with liquidity provider...', delay: 1000 },
        { msg: 'Executing atomic swap (USD -> ' + selectedAsset + ')...', delay: 1600 },
        { msg: 'Running destination address sanctions screen...', delay: 2200 },
        { msg: 'Initiating MPC wallet release...', delay: 2800 },
        { msg: '✓ Funds broadcast to Ethereum network (Tx: 0x8a2...3f1)', delay: 3400 },
      ];

      const timeouts: any[] = [];

      sequence.forEach(({ msg, delay }) => {
        const timeout = setTimeout(() => {
          setLogs(prev => [...prev, msg]);
        }, delay);
        timeouts.push(timeout);
      });

      const finalTimeout = setTimeout(() => {
        setStep('success');
        onWithdrawComplete(Number(amount));
      }, 4000);
      timeouts.push(finalTimeout);

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [step, selectedAsset, onWithdrawComplete, amount]);

  const isValidAmount = Number(amount) > 0 && Number(amount) <= availableBalance;

  return (
    <div className="deposit-overlay">
      <div className="deposit-modal">
        <div className="deposit-header">
          <h3>Institutional Withdrawal</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {step === 'amount' && (
          <div className="deposit-step">
            <button className="back-link" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.85rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <div className="balance-info">
              <span>Available to Withdraw</span>
              <strong>${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </div>

            <div className="input-group">
              <label>Amount to Withdraw (USD)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
              />
              {Number(amount) > availableBalance && (
                <span className="error-text">Insufficient balance</span>
              )}
            </div>

            <p className="step-label">Select Target Stablecoin</p>
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

            <button 
              className="btn-primary w-full" 
              disabled={!isValidAmount}
              onClick={() => setStep('address')}
            >
              Configure Destination <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 'address' && (
          <div className="deposit-step">
            <button className="back-link" onClick={() => setStep('amount')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.85rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back to Amount
            </button>
            <p className="step-label">Destination Wallet</p>
            <div className="input-group">
              <label>Recipient {selectedAsset} Address (Ethereum)</label>
              <input 
                type="text" 
                placeholder="0x..." 
                value={targetAddress}
                onChange={e => setTargetAddress(e.target.value)}
              />
            </div>

            <div className="info-box">
              <ShieldCheck size={16} className="text-primary" />
              <p>Off-ramps are subject to rigorous destination risk screening. Institutional wallets only.</p>
            </div>

            <div className="warning-box">
              <AlertCircle size={16} />
              <p>Ensure this is an ERC-20 {selectedAsset} address. Funds sent to wrong addresses or chains cannot be recovered.</p>
            </div>

            <button 
              className="btn-primary w-full" 
              disabled={!targetAddress.startsWith('0x') || targetAddress.length < 40}
              onClick={() => setStep('processing')}
            >
              Authorize Offboard Sequence
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="deposit-step">
            <div className="processing-visual">
              <div className="spinner-ring"></div>
              <RefreshCw size={32} className="spinner-icon" />
            </div>
            
            <h4>Reversing Liquidity</h4>
            
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
            <h3>Withdrawal Broadcast</h3>
            <p className="success-desc">
              Your <strong>{selectedAsset}</strong> is being broadcast to the Ethereum network. It should arrive in your wallet shortly.
            </p>
            <a 
              href="https://etherscan.io/tx/0x8a24...3f1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tx-link"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', marginTop: '1rem', fontSize: '0.85rem' }}
            >
              <ExternalLink size={14} /> View on Etherscan
            </a>
            <button className="btn-primary w-full" onClick={onClose} style={{ marginTop: '2rem' }}>
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawFlow;
