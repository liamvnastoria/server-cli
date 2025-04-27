import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_PATH = path.join(os.homedir(), '.liam-cli', 'config.json');

export async function setTheme() {
  let config = { apiBaseUrl: 'https://secure.skygenesisenterprise.com/api', theme: 'light' };
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    }
  } catch {}
  const { theme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Choose color theme:',
      choices: [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
      ],
      default: config.theme || 'light'
    }
  ]);
  config.theme = theme;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
  console.log('✔ Theme updated!');
}

export function getTheme() {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    return config.theme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}
