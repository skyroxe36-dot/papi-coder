# Paper2Agent Synthesizer 🚀

Paper2Agent Synthesizer is an interactive AI application that automatically translates research papers into fully runnable code frameworks. By deconstructing the methodology, identifying implementation gaps, generating skeleton code, and mapping out a hyperparameter grid search, it solves the most critical pain points of replicating research papers.

This repository consists of a modern, fast React frontend and a Node.js/Express backend that handles API communication with Arxiv and agent LLMs.

---

## Architecture Overview

*   **`papi-coder-app/`** (Frontend)
    *   Built with React 19, Vite, TypeScript, Tailwind CSS v4, and Framer Motion.
    *   Handles the user interface, routing (react-router-dom), and agent chat simulation interface.
*   **`papi-coder-backend/`** (Backend)
    *   Built with Node.js, Express, and TypeScript.
    *   Fetches metadata dynamically from Arxiv (`arxivService.ts`).
    *   Simulates/manages the Swarm AI orchestration logic (`llmService.ts`).

---

## Prerequisites

*   Node.js (v20+ recommended)
*   npm (v10+ recommended)

---

## Quick Start Guide

You will need two terminal windows to run the frontend and backend concurrently.

### 1. Start the Backend

Open your first terminal and run the following commands:

```bash
# Navigate to the backend directory
cd papi-coder-backend

# Install the necessary dependencies
npm install

# Start the development server (runs on port 3001)
npm run dev
```

*Note: The backend will be available at `http://localhost:3001`.*

### 2. Start the Frontend

Open your second terminal and run the following commands:

```bash
# Navigate to the frontend directory
cd papi-coder-app

# Install the necessary dependencies
npm install

# Start the Vite development server (runs on port 5173)
npm run dev
```

*Note: The frontend will be available at `http://localhost:5173`. Open this URL in your browser to interact with the application.*

---

## Usage

1.  Navigate to the **Home** page (`http://localhost:5173`).
2.  Paste a valid Arxiv URL (e.g., `https://arxiv.org/abs/1706.03762`) into the input field and click **Synthesize**.
3.  The backend will fetch the paper's metadata (Title & Abstract) and simulate the agent swarm analyzing the content.
4.  You will be automatically redirected to the **Workspace** dashboard.
5.  Use the **Reproduction Plan** sidebar to navigate the different phases (Deep Deconstruction, Data Setup, Skeleton Code, Full Training, Outreach).
6.  Interact with the **Agent Reasoning Log** terminal on the right side of the screen by asking questions about the implementation.

---

## API Configuration (Optional)

In the current version, the LLM synthesis is simulated to ensure rapid local testing without requiring paid API keys.

If you wish to configure real LLM connections:
1. Navigate to the frontend **Settings** page via the navigation bar to input your API keys (OpenAI, Anthropic, Gemini).
2. Modify `papi-coder-backend/src/services/llmService.ts` to forward these keys and connect to the respective provider SDKs.