# 🛡️ DC Point — Escrow-Based E-Marketplace & Legalized Trade Platform

**DC Point** is an escrow-based e-marketplace platform designed to solve the "lack of trust" problem faced by small-scale, unregistered sellers, artisans, and rental hosts. It combines **milestone-based escrow payments**, **collaborative legal trade agreements**, **automated AI compliance screening**, and a **mutual reputation system**.

---

## 🌟 Key Features

- **🛡️ Escrow Vault Protection**: Funds are locked by DC Point upon order placement and released to the seller only after the buyer inspects and approves final delivery.
- **📄 Dual Digital Signature Agreements**: Legal contract generator locking delivery windows, quality inspection rules, and custom packaging notes with unique cryptographic contract hashes.
- **⚡ AI Pre-Screening & Compliance**: Automated scanning checks title, description, and terms for restricted goods, IP/trademark safety, and legal compliance before going live.
- **🛒 Dual Marketplaces**:
  - **Purchase Market**: Custom goods, artisan crafts, tech prototypes, and professional services.
  - **Rent Market**: Gear & equipment rental with refundable escrow security deposit holds.
- **🔄 6-Step Guided Trade Wizard Engine**:
  1. *Chat & Terms Discussion*
  2. *Legal Agreement Builder & Digital Signing*
  3. *Escrow Payment Vault Initiation*
  4. *Seller Progress Updates & Live Countdown Timer*
  5. *Pre-Delivery Checkpoint Approval*
  6. *Delivery Verification & Escrow Release*
- **⚖️ Resolution Center**: AI-assisted mediation evaluating contract terms side-by-side with grievance evidence.
- **🍔 Interactive Persona Switcher**: Switch effortlessly between user personas (*Alex Mercer - Buyer* vs *Maya Lin - Artisan Seller*) to test buyer & seller workflows.

---

## 📂 Project Structure

```
Pint-Point/
├── DC_Point_Source_Code/      # Full React + Vite Source Code
│   ├── src/                   # Components, Data & Assets
│   ├── public/                # Static Media Assets
│   ├── package.json           # Dependencies & Scripts
│   └── vite.config.js         # Vite Configuration
├── DC_Point_Production_Build/ # Pre-built Production Assets (Static HTML/CSS/JS)
└── DC_Point_Complete_Source/  # Complete Source Backup
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/FinCodeLabs/DC-Point.git
   cd DC-Point/DC_Point_Source_Code
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18, Vite
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Custom Keyframe CSS Transitions
- **Styling**: Vanilla CSS Modules with custom Fintech RegTech tokens

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
