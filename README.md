🚀 ObserveX – Making Your Face the New ID

ObserveX eliminates ID cards by making the human face the new ID.
Our system combines YOLOv12 real-time detection, face recognition, and liveness checks to secure enterprises.

📌 Problem

🚪 Tailgating (unauthorized entry by following others)

🔐 Insider threats & data theft

❌ No continuous monitoring once inside restricted zones

💡 Solution

Real-time alerts in the control room

Tailgating & spoof prevention

Continuous monitoring inside enterprise zones

Frictionless & eco-friendly security

🎯 Unique Selling Proposition (USP)

Unlike existing access systems that only check at entry points,
ObserveX continuously monitors presence inside and instantly alerts security if unauthorized persons are detected.

## Quick Start
Download the model from- https://drive.google.com/drive/folders/1gU2Kvp05a5P93pYvjH-C4zUZ1j_f__Wd?usp=sharing
put the model in /api folder

### Option 1: Automatic Setup (Windows)
1. Double-click `start.bat` to automatically install dependencies and start both services

### Option 2: Manual Setup

#### 1. Start the Python Backend
```bash
cd api
python main.py
```
The backend will run on `http://localhost:8000`

#### 2. Start the Next.js Frontend
```bash
npm install
yarn install
yarn run dev
```
The frontend will run on `http://localhost:3000`

📈 Market Opportunity

🌍 Global Market: $15.8B in 2024 → $26B+ by 2030

🇮🇳 India: Growing at 15% CAGR (IT parks, R&D labs, financial institutions)

📊 Demand: Rising adoption of AI-powered enterprise security

🧩 Novelty & Differentiation

Real-time in-room unauthorized presence alerts

AI-based tailgating prevention (multi-face tracking at doors)

Advanced spoofing prevention (3D depth, blink detection)

🏢 Applications in Enterprises

Secure R&D labs

IT parks & data centers

Financial institutions & banks

Restricted manufacturing zones

💼 Business Model

SaaS subscription (per camera / per location)

Enterprise licensing contracts

Long-term partnerships with MNCs & IT companies

⚙️ Project Setup
📂 Project Structure
ObserveX/
├── api/                  # Backend YOLO & face recognition logic
│   ├── main.py           # Python API for YOLOv12 & recognition
│   ├── yolo12l.pt        # Trained YOLOv12 model weights
├── app/                  # Next.js frontend
│   ├── page.tsx          # Main UI entry page
│   ├── layout.tsx        # Layout & global structure
│   ├── globals.css       # Global styles
├── lib/                  # Utility & model processing
│   ├── onnx-processor.ts # ONNX inference handler
│   ├── utils.ts
├── public/               # Static assets
├── styles/               # Tailwind / custom styles
├── types/                # TypeScript types
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind setup
└── start.bat             # Quick start script (Windows)

🛠️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/ObserveX.git
cd ObserveX

2️⃣ Install Dependencies
# Install frontend dependencies
npm install
# OR
pnpm install

3️⃣ Backend Setup (Python API)
cd api
pip install -r requirements.txt

4️⃣ Run Development Servers

Backend (FastAPI / Flask):

python main.py


Frontend (Next.js):

npm run dev

🔍 How It Works

Upload or capture a live image through the web UI

Backend runs YOLOv12 detection + face recognition + liveness check

Results are returned and displayed in real-time on the dashboard

Unauthorized presence alerts are triggered instantly

🤝 Contributing

We welcome contributions! Please fork the repo and submit a PR.

📜 License

This project is licensed under the MIT License.
