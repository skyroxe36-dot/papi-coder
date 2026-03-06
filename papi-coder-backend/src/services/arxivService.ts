import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function fetchArxivMetadata(arxivId: string): Promise<{ title: string; abstract: string }> {
  try {
    const res = await axios.get(`https://export.arxiv.org/api/query?id_list=${arxivId}`);
    const parser = new XMLParser();
    const result = parser.parse(res.data);

    // Arxiv API returns feed.entry for single results
    const entry = result.feed?.entry;

    if (!entry) {
      throw new Error('Arxiv entry not found');
    }

    return {
      title: entry.title || 'Unknown Title',
      abstract: entry.summary || 'No abstract available'
    };
  } catch (error) {
    console.error('Error fetching from Arxiv API:', error);
    throw error;
  }
}