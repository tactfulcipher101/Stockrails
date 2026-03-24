import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import AuthFlow from './components/auth/AuthFlow';
import Whitepaper from './components/docs/Whitepaper';
import { 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  Layers, 
  Globe, 
  Wallet, 
  TrendingUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard' | 'whitepaper'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (view === 'dashboard') {
    return <Dashboard onBack={() => setView('landing')} />;
  }

  if (view === 'whitepaper') {
    return <Whitepaper onBack={() => setView('landing')} />;
  }

  return (
    <div className="app-container">
      {view === 'auth' && (
        <AuthFlow onComplete={() => setView('dashboard')} onBack={() => setView('landing')} />
      )}
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-text">STOCK<span className="text-primary">RAIL</span></span>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#the-problem" onClick={() => setMobileMenuOpen(false)}>The Problem</a>
            <a href="#solution" onClick={() => setMobileMenuOpen(false)}>Our Solution</a>
            <a href="#infrastructure" onClick={() => setMobileMenuOpen(false)}>Infrastructure</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)}>Compliance</a>
            <button className="btn-primary" onClick={() => { setView('auth'); setMobileMenuOpen(false); }}>Launch Dashboard</button>
          </div>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">Institutional-Grade Financial Bridge</div>
          <h1>Crypto Liquidity. Real Equity Ownership.</h1>
          <p className="subtitle-large">
            StockRail is the first professional-grade infrastructure layer that allows global crypto capital 
            to flow seamlessly into regulated public equities. We provide the rails that turn 
            blockchain assets into real-world brokerage positions without the friction of legacy banking.
          </p>
          <div className="hero-actions">
            <button className="btn-primary btn-large" onClick={() => setView('auth')}>
              Deploy Capital <ArrowRight size={18} />
            </button>
            <button className="btn-secondary btn-large" onClick={() => setView('whitepaper')}>
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Market Reach Section */}
      <section className="market-reach">
        <div className="section-header">
          <span className="text-primary">GLOBAL ACCESS</span>
          <h2>One Infrastructure. Every Asset Class.</h2>
          <p>Deploy capital across a unified bridge into the world's most liquid markets.</p>
        </div>
        <div className="market-ticker">
          <div className="ticker-track">
            {['AAPL +1.2%', 'TSLA -2.4%', 'NVDA +4.8%', 'MSFT +0.5%', 'AMZN +1.1%', 'META +2.1%', 'GOOGL +0.9%', 'AMD +2.3%'].map((tick, i) => (
              <div key={i} className="ticker-item">{tick}</div>
            ))}
            {/* Duplicate for seamless scroll */}
            {['AAPL +1.2%', 'TSLA -2.4%', 'NVDA +4.8%', 'MSFT +0.5%', 'AMZN +1.1%', 'META +2.1%', 'GOOGL +0.9%', 'AMD +2.3%'].map((tick, i) => (
              <div key={i + 'd'} className="ticker-item">{tick}</div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="the-problem" className="problem-section">
        <div className="section-header">
          <span className="text-primary">THE CHALLENGE</span>
          <h2>The Gap Between Two Trillion-Dollar Markets</h2>
        </div>
        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon"><AlertCircle color="#ff5f56" /></div>
            <h3>Fragmented Liquidity</h3>
            <p>
              Despite hundreds of billions in global crypto capital, there is no clean, direct path 
              to deploy these funds into public equities. Crypto platforms remain financially siloed 
              from traditional markets, creating massive capital inefficiency.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Lock color="#ff5f56" /></div>
            <h3>Compliance Friction</h3>
            <p>
              Traditional brokers are fiat-native and often reject funds originating from crypto sources. 
              Cross-border access is restricted by complex regulatory hurdles and slow, 
              expensive international wire transfers that take days to settle.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Globe color="#ff5f56" /></div>
            <h3>High Barrier to Entry</h3>
            <p>
              For global users, funding international brokerage accounts involves high conversion fees, 
              strict residency requirements, and opaque onboarding processes that deter 
              the next generation of digital-first investors.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section id="solution" className="solution-section">
        <div className="insight-grid">
          <div className="insight-text">
            <span className="text-primary">OUR SOLUTION</span>
            <h2>We Build Rails, Not Synthetic Assets</h2>
            <p className="description-text">
              StockRail does NOT issue tokenized stocks. We provide the infrastructure layer that 
              connects crypto liquidity to real, regulated brokerage access.
            </p>
            <div className="solution-features">
              <div className="sol-item">
                <CheckCircle2 className="text-primary" />
                <div>
                  <h4>Real Share Ownership</h4>
                  <p>Users purchase actual equities through licensed brokers, held in individual or segregated sub-accounts.</p>
                </div>
              </div>
              <div className="sol-item">
                <CheckCircle2 className="text-primary" />
                <div>
                  <h4>Instant Crypto-to-Fiat Pipeline</h4>
                  <p>Our conversion engine swaps crypto to fiat via institutional OTC and CEX partners with atomic settlement.</p>
                </div>
              </div>
              <div className="sol-item">
                <CheckCircle2 className="text-primary" />
                <div>
                  <h4>Broker API Execution</h4>
                  <p>Direct integration with major brokerage APIs for real-time order routing and position management.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="visual-container">
            <div className="architecture-diagram">
              <div className="arch-node crypto">Crypto Wallet</div>
              <div className="arch-arrow">→</div>
              <div className="arch-node core">StockRail Engine</div>
              <div className="arch-arrow">→</div>
              <div className="arch-node broker">Licensed Broker</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Pipeline */}
      <section id="infrastructure" className="infrastructure">
        <h2 className="section-title">Institutional-Grade Pipeline</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon"><Wallet /></div>
            <h3>01. Secure Deposit</h3>
            <p>
              Users deposit crypto into secure MPC (Multi-Party Computation) custody. 
              Every deposit undergoes rigorous wallet risk screening and AML monitoring 
              using industry-leading tools.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon"><RefreshCw /></div>
            <h3>02. Atomic Conversion</h3>
            <p>
              Our conversion engine routes orders through a network of liquidity providers 
              to ensure minimal slippage. Crypto is converted to the required fiat currency 
              instantly within our regulated liquidity layer.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon"><Layers /></div>
            <h3>03. Smart Routing</h3>
            <p>
              Funds are instantly routed to our broker partners. StockRail acts as the digital 
              bridge, managing the complex technical integration between blockchain ledgers 
              and traditional brokerage books.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon"><TrendingUp /></div>
            <h3>04. Equity Execution</h3>
            <p>
              The broker executes real share purchases on major exchanges (NYSE, NASDAQ). 
              Positions are tracked on StockRail’s real-time internal ledger, providing 
              users with a seamless unified view.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="compliance-section">
        <div className="compliance-content">
          <div className="compliance-text">
            <span className="text-primary">REGULATORY STRATEGY</span>
            <h2>Compliance-First by Design</h2>
            <p>
              StockRail is built to operate within existing market structures, not around them. 
              Our moat is built on regulatory alignment and institutional-grade security.
            </p>
            <div className="compliance-grid">
              <div className="c-item">
                <ShieldCheck className="text-primary" />
                <span>Licensed Broker Partners</span>
              </div>
              <div className="c-item">
                <ShieldCheck className="text-primary" />
                <span>VASP Registration Pathway</span>
              </div>
              <div className="c-item">
                <ShieldCheck className="text-primary" />
                <span>High-Assurance KYC/AML</span>
              </div>
              <div className="c-item">
                <ShieldCheck className="text-primary" />
                <span>Transaction Monitoring</span>
              </div>
            </div>
          </div>
          <div className="compliance-box">
            <h4>Principles of Operation</h4>
            <ul>
              <li><strong>Zero Synthetic Risk:</strong> No counterparty risk from synthetic tokens or derivatives.</li>
              <li><strong>Regulatory Sandbox:</strong> Actively participating in frameworks to ensure long-term stability.</li>
              <li><strong>Digital Sub-Broker:</strong> Structured to provide the maximum level of user protection and transparency.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="business-model">
        <div className="model-grid">
          <div className="model-header">
            <h2>Scalable Infrastructure Revenue</h2>
            <p>StockRail generates value through high-volume financial throughput and strategic partnerships.</p>
          </div>
          <div className="revenue-cards">
            <div className="rev-card">
              <h4>Transaction Fees</h4>
              <p>Transparent fee structure on every crypto-to-equity lifecycle.</p>
            </div>
            <div className="rev-card">
              <h4>Spread Optimization</h4>
              <p>Capturing value through institutional-grade liquidity routing.</p>
            </div>
            <div className="rev-card">
              <h4>API Licensing</h4>
              <p>Powering neobrokers and fintechs who want to offer crypto-to-stock access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-card">
          <h2>Ready to bridge the gap?</h2>
          <p>We are currently onboarding a select group of institutional partners and private beta users.</p>
          <div className="cta-form">
            <input type="email" placeholder="Enter your institutional email" className="email-input" />
            <button className="btn-primary">Request Invitation</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">STOCK<span className="text-primary">RAIL</span></span>
            <p className="footer-tagline">The default rail connecting crypto liquidity to global markets.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Infrastructure</h4>
              <a href="#">Execution Engine</a>
              <a href="#">Liquidity Routing</a>
              <a href="#">Broker APIs</a>
            </div>
            <div className="link-group">
              <h4>Regulatory</h4>
              <a href="#">Compliance Stack</a>
              <a href="#">Privacy Policy</a>
              <a href="#">VASP Status</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Twitter/X</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 StockRail Infrastructure Inc. Built for the future of global finance.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
