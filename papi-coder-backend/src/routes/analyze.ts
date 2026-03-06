import express from 'express';
import { fetchArxivMetadata } from '../services/arxivService';
import { simulateLLMAnalysis, DEFAULT_PAPER_DATA } from '../services/llmService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let paperContext = url;
  const arxivMatch = url.match(/arxiv\.org\/(?:abs|pdf)\/(\d+(\.\d+)?)/);

  try {
    if (arxivMatch) {
      console.log(`Fetching Arxiv metadata for ${arxivMatch[1]}`);
      const metadata = await fetchArxivMetadata(arxivMatch[1]);
      paperContext = `Title: ${metadata.title}\nAbstract: ${metadata.abstract}`;
    } else {
      console.log('Non-arxiv URL, using direct URL as context');
    }

    console.log('Simulating LLM Analysis...');
    // In a real app, you would pass apiKeys from req.body to a real LLM call
    const paperData = await simulateLLMAnalysis(paperContext);

    res.json(paperData);

  } catch (error) {
    console.error('Error during analysis:', error);
    // Fallback to default data
    res.json(DEFAULT_PAPER_DATA);
  }
});

export default router;