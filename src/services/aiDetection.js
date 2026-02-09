// Mock AI Service - Simulates analyzing text
export const analyzeText = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      // Simple Keyword Logic for MVP
      if (lowerText.includes('bank') || lowerText.includes('verify') || lowerText.includes('suspended')) {
        resolve({
          score: 85,
          risk: 'Critical',
          verdict: 'Phishing Attempt',
          reason: 'Urgent language ("suspended") and banking keywords detected without personalization.',
        });
      } else if (lowerText.includes('offer') || lowerText.includes('prize') || lowerText.includes('winner')) {
        resolve({
          score: 60,
          risk: 'Warning',
          verdict: 'Spam / Scam',
          reason: 'Promotional language detected. Likely a lottery scam.',
        });
      } else {
        resolve({
          score: 10,
          risk: 'Safe',
          verdict: 'Likely Safe',
          reason: 'No suspicious patterns detected.',
        });
      }
    }, 2000); // Fake 2-second AI processing delay
  });
};