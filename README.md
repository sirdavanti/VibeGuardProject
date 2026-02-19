# 🛡️ VibeGuard | Autonomous AI-First Escrow

**The Neutral AI Mind for Secure BNB Chain Settlements.** Built for the **DoraHacks OpenClaw Edition (Feb 2026)**.

---

## 🚀 Overview
VibeGuard is an autonomous escrow protocol that uses **Gemini 1.5 Flash** to audit qualitative work submissions against natural language contract terms. Unlike traditional escrows, VibeGuard removes the middleman by using a cryptographic "Handshake" between an AI Agent and a BNB Smart Contract.

### ✨ Key Features
* **Natural Language Contracts:** State terms in plain English.
* **Autonomous Audit:** Multi-pass AI evaluation (Quality & Security).
* **On-Chain Settlement:** Automated BNB release via ECDSA signature verification.
* **Anti-Bot Protocol:** Designed for the BNB Chain ecosystem with low-fee execution.

---

## 🔗 On-Chain Proof
* **Contract Address:** `0x160b4de96dbF6DbfD00e93696a530709511bBba3`
* **Network:** BNB Smart Chain (Testnet)
* **Contract Source:** `/vibeguard/contracts/Escrow.sol`
* **Explorer:** [View on BscScan](https://testnet.bscscan.com/address/0x160b4de96dbF6DbfD00e93696a530709511bBba3)

---

## 🏗️ Tech Stack
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide
* **Blockchain:** Solidity, Ethers.js v6, OpenZeppelin (ECDSA)
* **AI Agent:** Node.js, Gemini 3 Flash (Google Generative AI SDK)

---

## 🛠️ Quick Start

### 1. Prerequisites
* Node.js 18+
* MetaMask (BNB Testnet configured)

### 2. Backend Setup (The AI Agent)
bash
cd backend
npm install
# Create a .env file based on .env.example
npm start
3. Frontend Setup
Bash
cd vibeguard
npm install
npm run dev
🤖 AI Build Log
This project was developed using an AI-First Workflow. I utilized Gemini 3 Flash as a pair-programmer to:

Bridge the Gap: Connected off-chain AI reasoning with on-chain signature recovery.

Logic Refactoring: Streamlined complex escrow logic into a high-performance BNB Smart Chain implementation.

UI/UX Design: Crafted a professional visual language using a muted off-white base, royal blue accents, and coral highlights for action feedback.

🤝 License
Distributed under the MIT License. See LICENSE for more information.

