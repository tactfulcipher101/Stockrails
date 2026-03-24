import React, { useState } from 'react';
import './AuthFlow.css';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
    Globe,
    Wallet,
    ArrowRight,
  
  CheckCircle2,
  ArrowLeft,
  Upload,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

interface AuthFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type Step = 'account' | 'kyc' | 'upload' | 'wallet' | 'success';

const AuthFlow: React.FC<AuthFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<Step>('account');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleNext = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      if (step === 'account') setStep('kyc');
      else if (step === 'kyc') setStep('upload');
      else if (step === 'upload') setStep('wallet');
      else if (step === 'wallet') setStep('success');
    }, 800);
  };

  const simulateUpload = () => {
    setLoading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setLoading(false);
        setStep('wallet');
        setUploadProgress(0);
      }
    }, 200);
  };

  const handleStepBack = () => {
    if (step === 'kyc') setStep('account');
    else if (step === 'upload') setStep('kyc');
    else if (step === 'wallet') setStep('upload');
    else onBack();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-header">
          <button className="back-link" onClick={handleStepBack}>
            <ArrowLeft size={16} /> <span>Back</span>
          </button>
          <div className="auth-logo">STOCK<span className="text-primary">RAIL</span></div>
          <div className="step-indicator">
            <div className={`dot ${step === 'account' ? 'active' : ''} ${['kyc', 'upload', 'wallet', 'success'].includes(step) ? 'done' : ''}`}></div>
            <div className={`dot ${['kyc', 'upload'].includes(step) ? 'active' : ''} ${['wallet', 'success'].includes(step) ? 'done' : ''}`}></div>
            <div className={`dot ${step === 'wallet' ? 'active' : ''} ${step === 'success' ? 'done' : ''}`}></div>
          </div>
        </div>

        {step === 'account' && (
          <div className="auth-step">
            <h2>Create Your Institutional Account</h2>
            <p className="step-desc">Start your journey into global equity markets.</p>
            <div className="input-group">
              <label><Mail size={16} /> Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label><Lock size={16} /> Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              className="btn-primary w-full" 
              onClick={handleNext} 
              disabled={loading || !email || !password}
            >
              {loading ? 'Creating Account...' : 'Continue'} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 'kyc' && (
          <div className="auth-step">
            <div className="badge-small"><ShieldCheck size={14} /> VASP Compliant</div>
            <h2>Identity Verification</h2>
            <p className="step-desc">As a regulated infrastructure provider, we require basic identity details.</p>
            <div className="input-row">
              <div className="input-group">
                <label><User size={16} /> Full Name</label>
                <input 
                  type="text" 
                  placeholder="Tactful Cipher" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label><Globe size={16} /> Country of Residence</label>
              <select>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Nigeria</option>
                <option>United Arab Emirates</option>
              </select>
            </div>
            <button 
              className="btn-primary w-full" 
              onClick={handleNext} 
              disabled={loading || !fullName}
            >
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 'upload' && (
          <div className="auth-step">
            <div className="badge-small"><ShieldCheck size={14} /> Encrypted Upload</div>
            <h2>Document Upload</h2>
            <p className="step-desc">Please upload a clear photo of your government-issued ID.</p>
            
            <div className="upload-zone" onClick={!loading ? simulateUpload : undefined}>
              {loading ? (
                <div className="upload-progress-container">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p>Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <>
                  <Upload size={32} className="text-primary" />
                  <p>Click to upload or drag and drop</p>
                  <span>PNG, JPG or PDF (max. 10MB)</span>
                </>
              )}
            </div>

            <div className="doc-types-grid">
              <div className="doc-type-item active"><FileText size={18} /> <span>Passport</span></div>
              <div className="doc-type-item"><ImageIcon size={18} /> <span>National ID</span></div>
            </div>

            <p className="footer-note">StockRail uses bank-grade encryption for all documents.</p>
          </div>
        )}

        {step === 'wallet' && (
          <div className="auth-step">
            <h2>Connect Liquidity Source</h2>
            <p className="step-desc">Connect your wallet to fund your brokerage sub-account.</p>
            <div className="wallet-options">
              <div className="wallet-option" onClick={handleNext}>
                <Wallet size={24} />
                <span>MetaMask / Web3 Wallet</span>
              </div>
              <div className="wallet-option" onClick={handleNext}>
                <div className="custom-icon">C</div>
                <span>Coinbase Wallet</span>
              </div>
              <div className="wallet-option" onClick={handleNext}>
                <ShieldCheck size={24} />
                <span>WalletConnect</span>
              </div>
            </div>
            <p className="footer-note">StockRail uses MPC custody to secure all assets.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="auth-step text-center">
            <div className="success-icon"><CheckCircle2 size={64} /></div>
            <h2>Account Ready</h2>
            <p className="step-desc">Your identity has been verified and your wallet is linked. You can now deploy capital into equities.</p>
            <button className="btn-primary w-full" onClick={onComplete}>
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;
