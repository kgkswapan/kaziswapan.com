---
title: "OpenTradeInfra"
summary: "An open-source trading infrastructure lab built to understand the full trade lifecycle—from market data to execution, risk, and monitoring."
tech: "Python, QuickFIX, PostgreSQL, Docker, Prometheus, Grafana"
category: "Trading Infrastructure"
noteTag: "opentradeinfra"
featured: true
link1: "https://github.com/kgkswapan/OpenTradeInfra"
buttonText1: "GitHub Repo"
milestoneProgress:
  M1: 100
  M2: 0
  M3: 0
  M4: 0
  M5: 0
  M6: 0
  M7: 0
---

---
**OpenTradeInfra** is my hands-on project to build a transparent, modular trading infrastructure from scratch.  
The goal is simple: understand how modern trading systems work under the hood by designing each realistic layer myself — connectivity, data, risk, storage, monitoring, and orchestration.

## **Why Build This**  
Most trading platforms are powerful but closed systems — you interact with them every day, but the internal mechanisms are rarely visible. I’m building OpenTradeInfra as a personal learning project to demystify these systems for myself, using only open-source tools and synthetic data.

Understanding the full engineering lifecycle of a trade — from connectivity to trade capture, to risk, to monitoring — helps me think more clearly and operate more effectively in my professional role. It sharpens troubleshooting instincts, deepens technical understanding, and gives me a clearer mental model of the systems I support.

This project is intentionally scoped to the parts of the trade lifecycle that can be built in an open-source environment. It does **not** attempt to recreate regulated post-trade systems such as clearing, settlement, custody, or regulatory reporting.

Everything here is:

- open,  
- testable,  
- documented,  
- and built from first principles.

It’s both a long-term engineering project and a structured learning journey.

I rely heavily on AI throughout this project — for planning, structuring components, debugging issues, and breaking down complex topics into something manageable. I don’t want to give the impression that I’m a coding expert or an industry guru. I’m learning as I build, and AI is one of the tools helping me along the way. This project exists to improve my understanding, not to showcase mastery. It’s a practical learning journey supported by modern tools, curiosity, and consistent work.

## **Project Milestones**

### **M1 — Market Data + FIX Gateway (Completed)**  
- QuickFIX Acceptor + Initiator  
- Synthetic order flow generator  
- Basic validation and message handling  

### **M2 — Trade Capture DB**  
- PostgreSQL schema for trades and positions  
- FIX log parser  
- Trade persistence pipeline  

### **M3 — Risk Engine**  
- Real-time P&L  
- VaR and Greeks (QuantLib)  
- Risk aggregation  

### **M4 — Monitoring & Automation**  
- Prometheus metrics  
- Grafana dashboards  
- PowerShell automation scripts  

### **M5 — Messaging + Logging**  
- RabbitMQ or Kafka integration  
- ELK stack for logs  

### **M6 — Orchestration + CI/CD**  
- Docker Compose → Kubernetes  
- GitHub Actions pipeline  

### **M7 — UI & Final Integration**  
- Streamlit/Dash UI  
- Project whitepaper  
- GitHub Release v1.0  

## **Current Status**  
Milestone **M1** is actively in progress.  
Market data simulation and the FIX gateway are functioning, with successful test messages and order flows verified. A detailed write-up of Milestone 1 is available in my Notes.

This project will continue growing milestone by milestone toward full trade-lifecycle coverage — in every domain that can realistically be built in open-source.
