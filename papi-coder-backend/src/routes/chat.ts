import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, paperTitle } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Simulate agent response
  setTimeout(() => {
    const responses = [
      `I have updated the skeleton code for ${paperTitle} to include the requested changes.`,
      `The hyperparameter ambiguity issue has been logged. I recommend starting with AdamW and a learning rate of 3e-4.`,
      `Based on the methodology, I've constructed a basic PyTorch module for the forward pass.`,
      `I've flagged Section 3.2 for further review regarding the data normalization step.`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    res.json({ reply: randomResponse });
  }, 1000);
});

export default router;