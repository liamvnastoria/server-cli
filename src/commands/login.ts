import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';
import { setToken } from '../utils/auth';

export async function handleLogin() {
  try {
    const { username, password } = await inquirer.prompt([
      { type: 'input', name: 'username', message: 'Username:' },
      { type: 'password', name: 'password', message: 'Password:' },
    ]);
    const res = await axios.post('https://secure.skygenesisenterprise.com/api/auth/login', {
      username,
      password
    }, { timeout: 8000 });

    if (res.data && res.data.token) {
      await setToken(res.data.token);
      console.log(chalk.greenBright('\nLogin successful! Token stored.'));
    } else {
        console.log(chalk.redBright('\nLogin failed. No token received.'));
    }
  } catch (err: any) {
    console.log(chalk.redBright('Login error.'));
    if (err.response)
      console.log(chalk.yellow('Server Response:'), err.response.data);
    else
      console.log(chalk.yellow('Error:'), err.message);
  }
}
