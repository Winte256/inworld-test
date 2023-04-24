import { InworldClient } from '@inworld/nodejs-sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
 
const client = new InworldClient().setApiKey({
  key: process.env.INWORLD_KEY!,
  secret: process.env.INWORLD_SECRET!,
});

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = async (request: VercelRequest, response: VercelResponse) => {
  const token = await client.generateSessionToken();
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(token));
}

export default allowCors(handler);