import axios from 'axios';
import chalk from 'chalk';
import Table from 'cli-table3';
import { getToken } from '../utils/auth';

export async function handleProjectsList() {
  try {
    const token = await getToken();
    const res = await axios.get('https://secure.skygenesisenterprise.com/api/projects', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      timeout: 8000
    });
    const table = new Table({ head: ['ID', 'Name', 'Status'], style: { head: ['cyan'] } });
    (res.data.projects || []).forEach((p: any) => table.push([p.id, p.name, p.status]));
    console.log(chalk.greenBright('\nProjects:'));
    console.log(table.toString());
  } catch (err: any) {
    console.log(chalk.redBright('Could not fetch projects.'));
    if (err.response)
      console.log(chalk.yellow('Server Response:'), err.response.data);
    else
      console.log(chalk.yellow('Error:'), err.message);
  }
}
