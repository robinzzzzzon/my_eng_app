const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'your_key', dangerouslyAllowBrowser: true });

export async function getRandomTextExamples(config) {

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ 
        role: 'user', 
        content: `Придумай абзац на тему ${config[0]}, длиной ${config[1]} слов при этом текст должен быть написан в формате монолога с самим собой.` 
    }],
  });

  return completion
}