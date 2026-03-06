import { PaperData } from '../types';

export const DEFAULT_PAPER_DATA: PaperData = {
  title: "Agentic Frameworks for Autonomous Task Resolution",
  gaps: [
    { type: 'Hyperparameter Ambiguity', desc: 'Weight decay and optimizer epsilon values are missing from Section 4.1.', severity: 'high' },
    { type: 'Implementation Gap', desc: 'The mathematical operation in Eq 3 requires bounds to prevent NaN errors (log(0)).', severity: 'critical' },
    { type: 'Dataset Discrepancies', desc: 'Exact tokenization strategy and filtering pipeline for the custom dataset are omitted.', severity: 'medium' }
  ],
  pipeline: ['Raw Input', 'Attention Layers (Eq 1-3)', 'Loss Function (Cross-Entropy)'],
  dataStats: {
    samples: "1.2M",
    split: "80/10/10",
    seed: "42",
    preprocessing: "def normalize_and_tokenize(batch):\n    batch['image'] = (batch['image'] - mean) / std\n    return batch"
  },
  skeletonCode: "import torch\nimport torch.nn as nn\n\nclass PaperModel(nn.Module):\n    def __init__(self, dim, hidden_dim):\n        super().__init__()\n        self.proj = nn.Linear(dim, hidden_dim)\n        self.eps = 1e-8\n\n    def forward(self, x):\n        x = self.proj(x)\n        x = torch.log(torch.clamp(x, min=self.eps))\n        return x",
  gridSearch: [
    { param: "Weight Decay", space: "[1e-4, 1e-5, 0]", status: "Pending" },
    { param: "Optimizer Epsilon", space: "[1e-8, 1e-6]", status: "Completed" },
    { param: "Warmup Steps", space: "[0, 1000, 5000]", status: "Pending" }
  ]
};

// Simulated LLM call if no API key is provided
export async function simulateLLMAnalysis(paperContext: string): Promise<PaperData> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...DEFAULT_PAPER_DATA,
                // Make title dynamic if possible from context
                title: paperContext.split('\\n')[0].replace('Title: ', '') || DEFAULT_PAPER_DATA.title
            });
        }, 1500);
    });
}