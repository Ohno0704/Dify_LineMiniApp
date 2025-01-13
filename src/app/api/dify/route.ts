import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.DIFY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Dify API key is missing' }, { status: 500 });
  }

  try {
    const { prompt } = await req.json();
    const response = await fetch('https://api.dify.ai/v1/workflows/run', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`, // 環境変数から取得したAPIキーを使用
        'Content-Type': 'application/json',
      },
    //   body: JSON.stringify({ prompt }),
      body: JSON.stringify({
        // model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        inputs: { prompt },
        user: 'unique-user-id', // 必要なuserフィールドを追加
      }),
    });
    const data = await response.json();
    console.log('Dify API response:', data);
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error('Error calling Dify API:', error);
    return NextResponse.json({ error: 'Failed to fetch from Dify API' }, { status: 500 });
  }
}
