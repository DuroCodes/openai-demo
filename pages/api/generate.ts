import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { apiKey } from '../../config';

interface Choice {
  text: string;
}

interface Completion {
  data: {
    choices: Choice[];
  };
}

interface Response {
  result: string;
}

const configuration = new Configuration({
  apiKey,
});

const client = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse<Response>) {
  const completion = await client.createCompletion({
    model: 'text-davinci-002',
    prompt: req.body.request,
    temperature: 0.6,
    max_tokens: 1000,
  }) as Completion;

  res.status(200).json({ result: completion.data.choices[0].text });
}