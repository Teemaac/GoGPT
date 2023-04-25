import axios from 'axios';

const chatGptEndpoint = 'https://api.openai.com/v1/completions';

const API_KEY = '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';


export const getChatGptResponse = async (message) => {
    try {
      const response = await axios.post(chatGptEndpoint, {
        prompt: message,
        max_tokens: 150,
        temperature: 0.5,
        model: 'text-davinci-003',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error.message);
      throw new Error('Failed to generate response');
    }
  };