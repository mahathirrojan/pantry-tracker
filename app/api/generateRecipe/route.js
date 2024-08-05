// app/api/generateRecipe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { ingredients } = await request.json();

  // Access the API key from environment variables
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OpenAI API key is missing.');
    return NextResponse.json({ error: 'API key is missing.' }, { status: 500 });
  }

  try {
    const prompt = `Create a detailed recipe using the following ingredients: ${ingredients.join(', ')}.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices && data.choices.length > 0) {
      return NextResponse.json({ recipe: data.choices[0].message.content.trim() });
    } else {
      console.error('OpenAI API error:', data.error || 'Unknown error');
      return NextResponse.json({ error: data.error || 'Failed to generate recipe.' }, { status: response.status });
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error occurred.' }, { status: 500 });
  }
}