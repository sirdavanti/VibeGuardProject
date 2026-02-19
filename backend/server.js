const express = require('express');
const cors = require('cors'); // Required to talk to React
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ethers } = require("ethers");
require('dotenv').config();

const app = express();
app.use(cors()); // This fix stops the "Port 3001" error
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY);

app.post('/audit', async (req, res) => {
  const { contractText, submission } = req.body;

  try {
    // Force temperature 0 so 'dwdwdw' always REJECTS
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0 } 
    });

    const prompt = `Review this contract: "${contractText}" 
    Against this work: "${submission}"
    
    CRITICAL: If the submission is gibberish or random letters (like 'dwdwdw'), you MUST REJECT.
    Return only JSON: {"score": 0-100, "decision": "RELEASE" or "REJECT", "reason": "why"}`;
  
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Fix: Remove markdown backticks if Gemini adds them
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    const verdict = JSON.parse(cleanJson);

    let signature = "0x";
    if (verdict.decision === "RELEASE") {
      // Create the cryptographic signature for the BNB Chain
      const messageHash = ethers.solidityPackedKeccak256(["uint256"], [ethers.parseEther("0.01")]);
      signature = await wallet.signMessage(ethers.toBeArray(messageHash));
    }

    // Match your UI expectations: 'vibe_score' and 'reasoning'
    res.json({ 
      vibe_score: verdict.score, 
      decision: verdict.decision, 
      reasoning: verdict.reason, 
      signature 
    });
    
  } catch (error) {
    console.error("Audit error:", error);
    res.status(500).json({ decision: "REJECT", reasoning: "AI Agent internal error." });
  }
});

app.listen(3001, () => console.log("🚀 VibeGuard Agent live on port 3001"));