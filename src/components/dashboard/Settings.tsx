import React from 'react';
import './Dashboard.css';
import { User, Shield, Bell, ArrowLeft } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-link" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <ArrowLeft size={18} />
          </button>
          <h3>User Settings</h3>
        </div>
      </div>

      <div className="grid-layout">
        <div className="main-col">
          <section className="dashboard-section" style={{ padding: '2rem' }}>
             <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><User /> Account Profile</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Manage your institutional profile and personal details.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" value="Tactful Cipher" readOnly />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" value="tactfulcipher101@gmail.com" readOnly />
                        </div>
                    </div>
                </div>

                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><Shield /> Identity Verification (KYC)</h4>
                    <div style={{ background: 'rgba(0, 220, 130, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-primary)' }}>
                        <p style={{ fontWeight: '700', color: 'var(--color-primary)' }}>Level 2: Unlimited Access</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Verified on Feb 24, 2026. All withdrawal and deposit limits removed.</p>
                    </div>
                </div>

                <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><Bell /> Notifications</h4>
                    <div className="input-group" style={{ flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                         <input type="checkbox" checked readOnly style={{ width: '20px' }} />
                         <span>Enable real-time trade execution alerts</span>
                    </div>
                </div>
             </div>
          </section>
        </div>

        <div className="side-col">
             <section className="side-section">
                <h3>System Status</h3>
                <div className="node-item"><span className="dot online"></span> API Core: Online</div>
                <div className="node-item"><span className="dot online"></span> Order Engine: Online</div>
                <div className="node-item"><span className="dot online"></span> Liquidity Bridge: Online</div>
             </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
