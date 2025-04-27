import inquirer from 'inquirer';
import chalk from 'chalk';
import { handleStatus } from '../commands/status';
import { handleProjectsList } from '../commands/projects';
import { handleNotesList } from '../commands/notes';
import { handleLogin } from '../commands/login';

export async function mainMenu(): Promise<void> {
  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: chalk.bold('What would you like to do?'),
        choices: [
          { name: 'API Status', value: 'status' },
          { name: 'List Projects', value: 'projects' },
          { name: 'List Notes', value: 'notes' },
          { name: 'Add Note', value: 'notesAdd' },
          { name: 'Delete Note', value: 'notesDelete' },
          { name: 'Login', value: 'login' },
          new inquirer.Separator(),
          { name: 'Change Theme', value: 'theme' },
          { name: 'Configure API Endpoint', value: 'config' },
          { name: chalk.red('Exit'), value: 'exit' },
        ],
      },
    ]);

    switch (choice) {
      case 'status':
        await handleStatus();
        break;
      case 'projects':
        await handleProjectsList();
        break;
      case 'notes':
        await handleNotesList();
        break;
      case 'notesAdd':
        await (await import('../commands/notes')).handleNotesAdd();
        break;
      case 'notesDelete':
        await (await import('../commands/notes')).handleNotesDelete();
        break;
      case 'login':
        await handleLogin();
        break;
      case 'theme':
        await (await import('./theme')).setTheme();
        break;
      case 'config':
        await (await import('./settings')).setApiBaseUrl();
        break;
      case 'exit':
        console.log(chalk.greenBright('\nGoodbye!'));
        process.exit(0);
    }
    // After each action, prompt to continue
    await inquirer.prompt([{ type: 'input', name: 'pause', message: chalk.gray('Press Enter to return to menu...') }]);
    console.clear();
  }
}
