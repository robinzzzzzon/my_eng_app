const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'your_key', dangerouslyAllowBrowser: true });

export async function getRandomTextExamples(config) {

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ 
        role: 'user', 
        content: `Придумай 3 произвольных текста на тему ${config[0]}, длиной ${config[1]} слов, при этом тексты должны быть написаны в формате монолога с самим собой. Каждый текст начинай с пометки: [SECTION]` 
    }],
  });

  return completion
}