import figlet from 'figlet';
import chalk from 'chalk';
import { Command } from 'commander';
import { mainMenu } from './utils/menu';
import { handleStatus } from './commands/status';
import { handleProjectsList } from './commands/projects';
import { handleNotesList, handleNotesAdd, handleNotesDelete } from './commands/notes';
import { handleLogin } from './commands/login';
import { getTheme } from './utils/theme';

const program = new Command();

program
  .name('liam')
  .description('Personal Homelab Interactive CLI Client')
  .version('1.0.0');

program
  .command('status')
  .description('Fetch and display the server API status')
  .action(handleStatus);

program
  .command('projects list')
  .description('List available projects from the API')
  .action(handleProjectsList);

program
  .command('notes list')
  .description('List stored notes')
  .action(handleNotesList);

program
  .command('notes add')
  .description('Add a new note')
  .action(handleNotesAdd);

program
  .command('notes delete')
  .description('Delete a note')
  .action(handleNotesDelete);

program
  .command('login')
  .description('Authenticate and save a token locally')
  .action(handleLogin);

if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  // No subcommand: show banner and interactive menu
  console.clear();
  const theme = getTheme();
  const banner = figlet.textSync('Liam CLI', { horizontalLayout: 'full' });
  if (theme === 'dark') {
    console.log(chalk.magentaBright(banner));
  } else {
    console.log(chalk.cyanBright(banner));
  }
  mainMenu();
}
