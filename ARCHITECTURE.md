# Technical Architecture: StockRail

This document outlines the high-level architecture of the StockRail infrastructure.

## 1. System Overview
StockRail operates as a four-layer financial bridge:

### A. Wallet & Custody Layer (Inbound)
- **MPC Custody:** Multi-Party Computation wallets (e.g., Fireblocks, Qredo) to manage user deposits without single points of failure.
- **Risk Screening:** Real-time AML/KYC screening of inbound transactions (Chainalysis/Elliptic).
- **Supported Assets:** Initially USDC, USDT, BTC, and ETH.

### B. Execution & Liquidity Layer (Conversion)
- **Liquidity Router:** A smart routing engine that connects to OTC desks and CEXs (Binance, Coinbase, Kraken) to swap crypto for fiat.
- **Atomic Swap Logic:** Ensuring that fiat is only credited to the broker once crypto settlement is confirmed.
- **Slippage Control:** Institutional-grade execution to minimize the cost of conversion.

### C. Broker Integration Layer (Outbound)
- **API-Based Routing:** Connectivity to licensed brokers via REST/FIX protocols (e.g., Alpaca, DriveWealth, IBKR).
- **Sub-Account Management:** Managing user-level segregated accounts or master-sub account structures for real equity ownership.
- **Order Management System (OMS):** Handling market, limit, and fractional share orders.

### D. Ledger Layer (The Source of Truth)
- **Internal Ledger:** A double-entry accounting system that tracks:
  - User crypto balances
  - Fiat in-flight
  - Broker-side equity positions
  - Fee accumulation
- **Reconciliation Engine:** Real-time matching between the internal ledger and external broker/bank statements.

## 2. Regulatory Stack
- **VASP Compliance:** Virtual Asset Service Provider registration for crypto handling.
- **Introducing Broker Model:** Operating as a digital sub-broker under licensed partners.
- **KYC/AML Pipeline:** Integrated onboarding with "Travel Rule" compliance.

## 3. Tech Stack (Proposed)
- **Frontend:** React, TypeScript, Vite, CSS (Vanilla).
- **Backend:** 
  - **Go:** For high-concurrency ledger and execution logic.
  - **Node.js/TypeScript:** For API gateways and frontend-facing services.
- **Database:** 
  - **PostgreSQL:** For the primary ledger (ACID compliance).
  - **Redis:** For real-time price feeds and session management.
- **Infrastructure:** AWS (EKS, RDS, KMS).

## 4. Sequence Flow: Deposit to Purchase
1. **User** sends $1000 USDT to StockRail MPC address.
2. **Ledger** records "Pending Deposit".
3. **Liquidity Router** converts $1000 USDT to $1000 USD via OTC partner.
4. **Settlement Engine** transfers USD to **Broker Partner** API.
5. **Ledger** updates User Balance to "$1000 USD (at Broker)".
6. **User** places order for "AAPL".
7. **Execution Layer** routes order to Broker API.
8. **Broker** confirms trade; **Ledger** updates to "X shares of AAPL".
