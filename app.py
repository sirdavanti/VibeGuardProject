import streamlit as st
import google.generativeai as genai
import os
import json

# --- PHASE 2: AI STUDIO SETUP ---
# Replace 'YOUR_KEY_HERE' with the key you got from Google AI Studio
genai.configure(api_key="YAIzaSyARX1hw8oId-S5aw4HI8arFVivrO5HsgSQ")
model = genai.GenerativeModel('gemini-1.5-flash')

# --- 1. VISUAL BRANDING (The "Wow" Factor) ---
st.set_page_config(page_title="VibeGuard", page_icon="🛡️", layout="centered")

st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
    
    .stApp { background-color: #F8F9FA; font-family: 'Space Grotesk', sans-serif; }
    h1, h2, h3 { color: #002366 !important; font-weight: 700; }
    
    div.stButton > button:first-child {
        background-color: #FF7F50;
        color: white;
        border-radius: 8px;
        border: none;
        padding: 0.6rem 2rem;
        font-weight: 500;
        width: 100%;
        transition: all 0.3s ease;
    }
    
    div.stButton > button:hover { background-color: #FF6347; transform: translateY(-2px); }
    .stTextArea textarea { border-radius: 10px; border: 1px solid #E0E0E0; }
    
    .icon-box {
        border: 1px solid #002366;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        margin-bottom: 20px;
        background: white;
    }
    </style>
    """, unsafe_allow_html=True)

# --- 2. THE CONTENT ---
st.markdown("<div class='icon-box'><h3>🛡️ VibeGuard</h3><p>Autonomous AI Escrow Protocol</p></div>", unsafe_allow_html=True)

col1, col2 = st.columns(2)
with col1:
    job_desc = st.text_area("CONTRACT TERMS", placeholder="e.g. Write a 3-sentence poem about BNB Chain.")
with col2:
    work_done = st.text_area("SUBMITTED WORK", placeholder="Paste the completed work here...")

# --- PHASE 2: INTEGRATED LOGIC ---
if st.button("EXECUTE AUTONOMOUS AUDIT"):
    if job_desc and work_done:
        with st.spinner('VibeGuard is auditing the work on-chain...'):
            # This matches the prompt you tested in AI Studio
            prompt = f"Job: {job_desc}\nSubmission: {work_done}\nAudit the work and provide JSON."
            
            try:
                response = model.generate_content(prompt)
                
                # Check if AI said RELEASE
                if "RELEASE" in response.text.upper():
                    st.balloons()
                    st.success("✨ STUNNING VIBE DETECTED. ON-CHAIN RELEASE AUTHORISED.")
                    st.info("🔗 Proof of Tx: [View on BscScan](https://testnet.bscscan.com/tx/PASTE_YOUR_TX_HASH_HERE)")
                else:
                    st.error("🚫 VIBE REJECTED: Work does not meet the specified contract quality.")
                
                # Show the AI reasoning in a clean way
                with st.expander("View AI Audit Report"):
                    st.write(response.text)
                    
            except Exception as e:
                st.error(f"Connection Error: {e}")
    else:
        st.error("Please provide both contract terms and the work.")