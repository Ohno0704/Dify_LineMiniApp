'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/dify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch from Dify API');
      }

      const data = await res.json();
      const llm_res = data.result.data.outputs.output;
      console.log('Full API Response:', llm_res); // デバッグ用ログ
      if (llm_res) {
        setResponse(llm_res);
      } else {
        setResponse('Unexpected response format');
      }
    } catch (error) {
      console.error(error);
      setResponse('Error fetching response from Dify API');
    } finally {
      setLoading(false);
      console.error("form submit failed");
    }
  };

  return (
    <div>
      <h1>Dify Chat</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response || 'No response yet'}</p>
      </div>
    </div>
  );
}
