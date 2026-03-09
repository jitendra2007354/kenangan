import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = `${title} | Kenangan Coffee & Tea`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  return null;
};
