'use client';

import { useState } from 'react';

export function useWhopCheckout() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');

  const handleCheckout = async (e: React.FormEvent, whopCheckoutUrl: string) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      // 1. Save lead email to database
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: 'founders-access' }),
      });

      // 2. Prepare URL with prefilled email
      const targetUrl = new URL(whopCheckoutUrl);
      targetUrl.searchParams.set('email', email);

      // 3. Store URL and trigger modal view
      setEmbedUrl(targetUrl.toString());
      setIsOpen(true);
    } catch (error) {
      console.error('Failed to register lead before checkout:', error);
      const targetUrl = new URL(whopCheckoutUrl);
      targetUrl.searchParams.set('email', email);
      setEmbedUrl(targetUrl.toString());
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsOpen(false);

  return { email, setEmail, loading, isOpen, embedUrl, handleCheckout, closeModal };
}