import axios from 'axios';
import chalk from 'chalk';
import Table from 'cli-table3';
import { getToken } from '../utils/auth';

export async function handleStatus() {
  try {
    const token = await getToken();
    const res = await axios.get('https://secure.skygenesisenterprise.com/api/status', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      timeout: 8000
    });

    // Render status info
    const table = new Table({ head: ['Property', 'Value'], style: { head: ['cyan'] } });
    Object.entries(res.data).forEach(([k, v]) => table.push([chalk.bold(k), String(v)]));
    console.log(chalk.greenBright('\nServer API Status:'));
    console.log(table.toString());
  } catch (err: any) {
    console.log(chalk.redBright('Failed to fetch API status.'));
    if (err.response)
      console.log(chalk.yellow('Server Response:'), err.response.data);
    else
      console.log(chalk.yellow('Error:'), err.message);
  }
}
