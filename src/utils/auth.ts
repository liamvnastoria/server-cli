import fs from 'fs';
import path from 'path';
import os from 'os';

const TOKEN_PATH = path.join(os.homedir(), '.liam-cli', 'token.json');

export async function setToken(token: string): Promise<void> {
  const dir = path.dirname(TOKEN_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await fs.promises.writeFile(TOKEN_PATH, JSON.stringify({ token }), { encoding: 'utf-8' });
}

export async function getToken(): Promise<string | null> {
  try {
    const data = await fs.promises.readFile(TOKEN_PATH, { encoding: 'utf-8' });
    return JSON.parse(data).token;
  } catch {
    return null;
  }
}
