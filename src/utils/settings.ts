import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_PATH = path.join(os.homedir(), '.liam-cli', 'config.json');

export async function setApiBaseUrl() {
  let config = { apiBaseUrl: 'https://secure.skygenesisenterprise.com/api', theme: 'light' };
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    }
  } catch {}
  const resp = await inquirer.prompt([
    {
      type: 'input',
      name: 'apiBaseUrl',
      message: 'API Base URL:',
      default: config.apiBaseUrl || ''
    }
  ]);
  config.apiBaseUrl = resp.apiBaseUrl;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
  console.log('✔ API Base URL updated!');
}
