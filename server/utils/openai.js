```javascript
const axios = require('axios');
const { OPENAI_API_KEY } = require('../config');

const openai = {
  async sendMessage(message) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: message,
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error);
      throw error;
    }
  }
};

module.exports = openai;
```