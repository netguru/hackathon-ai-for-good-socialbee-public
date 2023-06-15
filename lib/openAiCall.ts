type OpenAIResponse = {
  choices: { message: { content: string } }[];
};

const createPrompt = (lang: string) =>
  [
    'Simplify the text.',
    'Use simple language.',
    'Shorten it to the most important points.',
    "Please, don't miss a single important point.",
    'Make it understandable for child.',
    'Answer in ' + lang,
  ].join(' ');

const messageFactory = (role: 'system' | 'user', content: string) => ({
  role,
  content,
});

const openAiSettings = {
  max_tokens: 800,
  temperature: 0.7,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 0.95,
  stop: null,
};

export const openAiCall = async ({
  message,
  language,
}: {
  message: string;
  language: string;
}) => {
  const response = (await fetch(
    'https://ngrnd-openai-eus-dev.openai.azure.com/openai/deployments/ng-gpt4/chat/completions?api-version=2023-03-15-preview',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.OPENAI_API_KEY || '',
      },
      body: JSON.stringify({
        messages: [
          messageFactory('system', createPrompt(language)),
          messageFactory('user', message),
        ],
        ...openAiSettings,
      }),
    },
  ).then((response) => response.json())) as OpenAIResponse;

  return response.choices[0].message.content;
};
