import React from 'react';
import './Whitepaper.css';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Database,
  Lock,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface WhitepaperProps {
  onBack: () => void;
}

const Whitepaper: React.FC<WhitepaperProps> = ({ onBack }) => {
  return (
    <div className="whitepaper-container">
      {/* Navigation */}
      <nav className="whitepaper-nav">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} /> <span>Back to Main</span>
        </button>
        <div className="whitepaper-logo">
          STOCK<span className="text-primary">RAIL</span> <span className="doc-type">/ Whitepaper v1.0</span>
        </div>
        <div className="nav-actions">
          <button className="btn-secondary">Download PDF</button>
        </div>
      </nav>

      {/* Content */}
      <main className="whitepaper-content">
        <aside className="whitepaper-toc">
          <h4>Table of Contents</h4>
          <ul>
            <li><a href="#abstract">Abstract</a></li>
            <li><a href="#problem">The Problem</a></li>
            <li><a href="#architecture">Technical Architecture</a></li>
            <li><a href="#compliance">Regulatory Strategy</a></li>
            <li><a href="#roadmap">Economic Model & Roadmap</a></li>
          </ul>
        </aside>

        <article className="whitepaper-article">
          <header className="article-header">
            <div className="badge-small">Technical Specification</div>
            <h1>StockRail: The Infrastructure for Global Crypto-Equity Settlement</h1>
            <p className="lead-text">
              Bridging two trillion-dollar ecosystems through institutional-grade funding and access rails.
            </p>
          </header>

          <section id="abstract">
            <h2>1. Abstract</h2>
            <p>
              StockRail is a high-assurance financial infrastructure layer designed to connect global crypto liquidity 
              to regulated public equity markets. Unlike synthetic asset protocols, StockRail facilitates the 
              purchase of real, underlying securities through licensed broker-dealers, providing 
              atomic settlement and a compliant bridge for international crypto-native capital.
            </p>
          </section>

          <section id="problem">
            <h2>2. The Problem Landscape</h2>
            <div className="problem-grid-doc">
              <div className="p-item-doc">
                <div className="p-icon"><Lock size={20} /></div>
                <h4>Capital Silos</h4>
                <p>Hundreds of billions in global crypto capital remain disconnected from the $100T+ global equities market due to legacy banking friction.</p>
              </div>
              <div className="p-item-doc">
                <div className="p-icon"><Zap size={20} /></div>
                <h4>Settlement Latency</h4>
                <p>Cross-border funding for international brokerage accounts is slow, expensive, and often rejected by fiat-native institutions.</p>
              </div>
            </div>
          </section>

          <section id="architecture">
            <h2>3. Technical Architecture</h2>
            <p>StockRail is built on a four-layer institutional-grade infrastructure stack:</p>
            
            <div className="arch-layer">
              <div className="layer-header"><ShieldCheck size={20} /> Layer 1: Wallet & Custody</div>
              <p>Utilizing Multi-Party Computation (MPC) to secure user deposits with institutional-grade risk screening and AML monitoring (Chainalysis/Elliptic).</p>
            </div>

            <div className="arch-layer">
              <div className="layer-header"><Cpu size={20} /> Layer 2: Execution & Liquidity</div>
              <p>A smart liquidity router connecting to OTC desks and CEXs to perform instant, low-slippage crypto-to-fiat conversion.</p>
            </div>

            <div className="arch-layer">
              <div className="layer-header"><Globe size={20} /> Layer 3: Broker Integration</div>
              <p>Direct REST/FIX API connectivity to licensed brokers (e.g., Alpaca, DriveWealth) for real-market execution and ownership.</p>
            </div>

            <div className="arch-layer">
              <div className="layer-header"><Database size={20} /> Layer 4: Internal Ledger</div>
              <p>A high-integrity double-entry accounting engine providing real-time reconciliation between blockchain ledgers and brokerage books.</p>
            </div>
          </section>

          <section id="compliance">
            <h2>4. Regulatory Strategy</h2>
            <p>StockRail is built to operate within established market structures:</p>
            <ul className="compliance-list-doc">
              <li><CheckCircle2 size={18} className="text-primary" /> <strong>Introducing Broker Model:</strong> Digital sub-broker structure under licensed partners.</li>
              <li><CheckCircle2 size={18} className="text-primary" /> <strong>VASP Registration:</strong> Pursuing Virtual Asset Service Provider status for compliant crypto handling.</li>
              <li><CheckCircle2 size={18} className="text-primary" /> <strong>Atomic flow:</strong> Capital only moves when compliance and settlement checks are passed.</li>
            </ul>
          </section>

          <footer className="article-footer">
            <div className="footer-cta">
              <h3>Interested in deploying StockRail?</h3>
              <p>Connect with our engineering and compliance teams for early integration.</p>
              <button className="btn-primary" onClick={onBack}>Get Early Access</button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default Whitepaper;
