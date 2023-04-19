import { InworldClient } from '@inworld/nodejs-sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
 
const client = new InworldClient().setApiKey({
  key: process.env.INWORLD_KEY!,
  secret: process.env.INWORLD_SECRET!,
});

export default  async (request: VercelRequest, response: VercelResponse) => {
  const token = await client.generateSessionToken();
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(token));
}
