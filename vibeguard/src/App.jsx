import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { ShieldCheck, Cpu, ArrowRight, CheckCircle, XCircle, ExternalLink, Zap, Lock } from 'lucide-react';

import { ethers } from "ethers";

// 1. Paste your copied ABI and Contract Address here
const contractAddress = "0x160b4de96dbF6DbfD00e93696a530709511bBba3";
const contractABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "bytes", "name": "signature", "type": "bytes" }
    ],
    "name": "releaseFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... rest of your ABI
];

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // 2. Request account access from MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // 3. Initialize the contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      console.log("Wallet Connected:", await signer.getAddress());
      return contract;
    } catch (error) {
      console.error("Connection failed:", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
};

// --- CONFIGURATION & MOCK DATA ---
const DESIGN_SYSTEM = {
  bg: '#F8F9FA',
  primary: '#002366',
  accent: '#FF7F50',
  font: "'Space Grotesk', sans-serif"
};

const VibeGuard = () => {
  const [contract, setContract] = useState("");
  const [submission, setSubmission] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0); 
  const [result, setResult] = useState(null);

  const executeAutonomousAudit = async () => {
    if (!contract || !submission) return alert("Please provide both contract terms and work submission.");
    
    setIsAuditing(true);
    setResult(null);
    
    setAuditStep(1); 
    await new Promise(r => setTimeout(r, 1500));
    
    setAuditStep(2); 
    await new Promise(r => setTimeout(r, 1500));
    
    setAuditStep(3); 
    await new Promise(r => setTimeout(r, 1000));

    const score = Math.floor(Math.random() * 40) + 60; 
    const mockVerdict = {
      vibe_score: score,
      decision: score > 75 ? "RELEASE" : "REJECT",
      reasoning: score > 75 
        ? "The submission matches 98% of technical requirements. Logic implementation is sound and UI components align with the Cyberpunk React specification."
        : "The submission lacks the requested React hooks implementation. Quality threshold not met."
    };

    const executeAutonomousAudit = async () => {
  // ... existing validation ...
  
  // Call the AI Agent Backend
  const response = await fetch('http://localhost:3001/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contractText, submission })
  });
  
  const data = await response.json();
  setResult(data);

  if (data.decision === "RELEASE") {
    // Trigger MetaMask using data.signature from the backend
    const tx = await contractInstance.releaseFunds(ethers.parseEther("0.01"), data.signature);
    await tx.wait();
    setTxHash(tx.hash);
  }
};

    setResult(mockVerdict);
    // --- NEW BLOCKCHAIN TRIGGER ---
if (mockVerdict.decision === "RELEASE") {
  try {
    const contractInstance = await connectWallet(); // Uses your existing function
    
    // We'll use a dummy signature for now since the AI Agent isn't fully live
    const dummySignature = "0x00"; 
    const amountInWei = ethers.parseEther("0.1"); // Amount to release

    console.log("Triggering on-chain release...");
    const tx = await contractInstance.releaseFunds(amountInWei, dummySignature);
    
    await tx.wait(); // Wait for the BNB Chain to confirm the transaction
    console.log("Transaction Successful!", tx.hash);
  } catch (err) {
    console.error("Blockchain transaction failed:", err);
  }
}


    setIsAuditing(false);
    setAuditStep(0);
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: DESIGN_SYSTEM.bg, fontFamily: DESIGN_SYSTEM.font }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`}
      </style>

      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: DESIGN_SYSTEM.primary }}>
            <ShieldCheck size={28} color="#FFFFFF" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: DESIGN_SYSTEM.primary }}>
            VibeGuard <span className="font-light opacity-50">| Autonomous Escrow</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <div className="px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 bg-white shadow-sm">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            BNB Testnet
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <section className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4" style={{ color: DESIGN_SYSTEM.primary }}>
            Natural Language Escrow
          </h2>
          <p className="text-gray-500 max-w-2xl">
            State your terms in plain English. Our AI-First protocol audits the work and releases 
            funds autonomously on the BNB Chain. No middleman, just code.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Zap size={14} /> Contract Terms
            </label>
            <textarea 
              placeholder="e.g., Build a Cyberpunk themed logo component in React..."
              className="w-full h-64 p-6 rounded-2xl border-2 border-gray-100 focus:border-blue-900 outline-none transition-all resize-none shadow-inner bg-white"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Cpu size={14} /> Work Submission
            </label>
            <textarea 
              placeholder="Paste the final work or code here..."
              className="w-full h-64 p-6 rounded-2xl border-2 border-gray-100 focus:border-blue-900 outline-none transition-all resize-none shadow-inner bg-white"
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {!isAuditing && !result && (
            <button 
              onClick={executeAutonomousAudit}
              className="px-12 py-5 rounded-full font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              style={{ backgroundColor: DESIGN_SYSTEM.accent }}
            >
              EXECUTE AUTONOMOUS AUDIT <ArrowRight size={20} />
            </button>
          )}

          {isAuditing && (
            <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-bold" style={{ color: DESIGN_SYSTEM.primary }}>
                  {auditStep === 1 && "PASS 1: AI QUALITY AUDITOR..."}
                  {auditStep === 2 && "PASS 2: SECURITY SUPERVISOR..."}
                  {auditStep === 3 && "FINALIZING VERDICT..."}
                </span>
                <span className="text-sm font-bold" style={{ color: DESIGN_SYSTEM.accent }}>
                  {Math.round(auditStep * 33.3)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${auditStep * 33.3}%`, 
                    backgroundColor: auditStep > 1 ? DESIGN_SYSTEM.accent : DESIGN_SYSTEM.primary 
                  }}
                ></div>
              </div>
            </div>
          )}

          {result && (
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-1" style={{ backgroundColor: result.decision === "RELEASE" ? '#10B981' : DESIGN_SYSTEM.accent }}></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl font-bold" style={{ color: DESIGN_SYSTEM.primary }}>
                      Audit Verdict: {result.decision}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black italic" style={{ color: DESIGN_SYSTEM.primary }}>
                      {result.vibe_score}%
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vibe Score</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                  <p className="text-gray-600 leading-relaxed italic">"{result.reasoning}"</p>
                </div>
                {result.decision === "RELEASE" && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-blue-900" />
                      <div>
                        <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest opacity-60">BNB Testnet Tx Hash</p>
                        <p className="text-sm font-mono font-medium text-blue-900">0x747...abc442f</p>
                      </div>
                    </div>
                    <a href="https://testnet.bscscan.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-white px-4 py-2 rounded-lg bg-blue-900">
                      VIEW ON BSCSCAN
                    </a>
                  </div>
                )}
                <button 
                  onClick={() => {setResult(null); setContract(""); setSubmission("");}}
                  className="mt-8 text-sm font-bold text-gray-400 hover:text-black transition-colors underline decoration-dotted"
                >
                  START NEW AUDIT SESSION
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-5xl mx-auto mt-20 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
        <div>
          <p className="text-2xl font-bold" style={{ color: DESIGN_SYSTEM.primary }}>1.2s</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg Audit Time</p>
        </div>
        <div>
          <p className="text-2xl font-bold" style={{ color: DESIGN_SYSTEM.primary }}>$0.02</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Protocol Fee</p>
        </div>
        <div>
          <p className="text-2xl font-bold" style={{ color: DESIGN_SYSTEM.primary }}>Gemini 3</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">LLM Engine</p>
        </div>
        <div>
          <p className="text-2xl font-bold" style={{ color: DESIGN_SYSTEM.primary }}>99.9%</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Uptime Score</p>
        </div>
      </footer>
    </div>
  );
};

// --- LAUNCHER ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<VibeGuard />);
}

export default VibeGuard;