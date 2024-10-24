const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: 'my_key', dangerouslyAllowBrowser: true });

export async function getRandomTextExamples(config) {

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ 
        role: 'user', 
        content: `Придумай 3 произвольных текста на тему ${config[0]}, длиной ${config[1]} слов, при этом тексты должны быть написаны в формате монолога с самим собой. Каждый текст начинай с пометки: [SECTION]` 
    }],
  });

  return completion
}

export async function getTopicList(config) {

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ 
        role: 'user', 
        content: `Please generate ${config[1]} relevant and interesting topics as asking of my opinion by using theme: ${config[0]}. Length of topics shouldn't be more than 30 words. Mark each topic as [TOPIC] at the beginning of sentence without numeration and your first explanation. Only marking list.` 
    }],
  });

  return completion
}