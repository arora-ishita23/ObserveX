# ObserveX – AI-Powered Enterprise Security

## Running Instructions

### Frontend (React / Next.js)

```bash
yarn install
yarn run dev
```

### Backend (FastAPI)

```bash
cd api
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Overview

ObserveX is an AI-driven enterprise security solution that replaces outdated ID cards and manual access systems with face-based identity verification.
Our system uses YOLOv12 real-time detection, facial recognition, and liveness checks to prevent unauthorized access, insider threats, and data theft.

Unlike traditional CCTV systems, ObserveX not only monitors but also provides real-time alerts to security teams when unknown individuals or tailgating attempts are detected.

We also integrate a voice assistant model, enabling security personnel to control the system, request identity checks, and trigger alerts hands-free via voice commands.

---

## Key Features

* **Face as the New ID** – No cards, no duplication, no loss.
* **Real-Time Alerts** – Unauthorized access instantly flagged in the security room.
* **Spoofing & Tailgating Prevention** – Advanced AI models detect fake attempts.
* **Seamless CCTV Integration** – Works with existing camera infrastructure.
* **Voice Assistant Model** – Enables voice-based commands for access checks, alert triggers, and system queries.

---

## Technology Stack

* **Computer Vision**: YOLOv12, OpenCV
* **Face Recognition**: Deep Learning embeddings
* **Liveness Detection**: Anti-spoofing AI
* **Voice Assistant**: Speech-to-Text + NLP + Command Execution
* **Backend**: Python, FastAPI
* **Frontend**: React / Next.js
* **Deployment**: Cloud / On-premise hybrid

---

## Market Problem

Enterprises face growing threats of insider data theft, unauthorized access, and spoofing attacks. Traditional ID cards and manual CCTV monitoring are inefficient, error-prone, and reactive instead of proactive.

---

## ObserveX Solution

* **Frictionless Security** – Automated, contactless, and eco-friendly.
* **AI-Powered Monitoring** – Real-time detection & alerts for unauthorized access.
* **Voice-Enabled Control** – Security teams can interact with the system hands-free.

---

## Target Market

* MNCs & Large Enterprises (R\&D labs, corporate offices, data centers)
* Critical Infrastructure (Airports, BFSI, government facilities)

---

## Competitive Advantage

* Real-time security alerts (most competitors only log events).
* Tailgating & spoofing prevention.
* Voice-enabled AI assistant for enterprise security – unique USP.

---

## Business Model

* SaaS Subscription (per camera/month)
* Enterprise Licensing
* Custom Integrations & Analytics Add-ons
