import fs from 'fs';
import path from 'path';
import os from 'os';

const NOTES_PATH = path.join(os.homedir(), '.liam-cli', 'notes.json');

export type Note = { id: string, content: string, date: string };

export async function getNotes(): Promise<Note[]> {
  try {
    const data = await fs.promises.readFile(NOTES_PATH, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  const dir = path.dirname(NOTES_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await fs.promises.writeFile(NOTES_PATH, JSON.stringify(notes, null, 2), { encoding: 'utf-8' });
}
