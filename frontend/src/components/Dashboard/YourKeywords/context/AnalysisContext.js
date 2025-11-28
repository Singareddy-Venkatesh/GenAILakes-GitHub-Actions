import { createContext,useState } from 'react';

export const AnalysisContext = createContext({
  analysisData: {
    keywords: [],
    hashtags: [],
    taglines: [],
    socialMetrics: {} 
  },
  setAnalysisData: () => {}
});

export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState({
    hashtags: [],
    taglines: [],
    keywords: [],
    socialMediaMetrics: {
      linkedin: 0,
      facebook: 0,
      instagram: 0,
      twitter: 0,
      youtube: 0
    }
  });

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
};