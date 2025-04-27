import chalk from 'chalk';
import Table from 'cli-table3';
import inquirer from 'inquirer';
import { getNotes, saveNotes } from '../utils/notesStore';

export async function handleNotesList() {
  try {
    const notes = await getNotes();
    const table = new Table({ head: ['ID', 'Content', 'Date'], style: { head: ['cyan'] } });
    notes.forEach(n => table.push([n.id, n.content, n.date]));
    console.log(chalk.blueBright('\nYour Notes:'));
    console.log(table.toString());
  } catch (err: any) {
    console.log(chalk.redBright('Could not fetch notes.'));
    console.log(chalk.yellow('Error:'), err.message);
  }
}

export async function handleNotesAdd() {
  try {
    const { content } = await inquirer.prompt([
      { type: 'input', name: 'content', message: 'Note content:' }
    ]);
    const notes = await getNotes();
    const id = (Math.max(0, ...notes.map(n => +n.id)) + 1).toString();
    const date = new Date().toISOString().slice(0, 10);
    notes.push({ id, content, date });
    await saveNotes(notes);
    console.log(chalk.greenBright('Note added!'));
  } catch (err: any) {
    console.log(chalk.redBright('Failed to add note.'), chalk.yellow(err.message));
  }
}

export async function handleNotesDelete() {
  try {
    let notes = await getNotes();
    if (!notes.length) {
      console.log(chalk.gray('No notes to delete.'));
      return;
    }
    const { toDelete } = await inquirer.prompt([
      {
        type: 'list',
        name: 'toDelete',
        message: 'Select a note to delete:',
        choices: notes.map(n => ({ name: `${n.content} (${n.date})`, value: n.id }))
      }
    ]);
    notes = notes.filter(n => n.id !== toDelete);
    await saveNotes(notes);
    console.log(chalk.greenBright('Note deleted!'));
  } catch (err: any) {
    console.log(chalk.redBright('Failed to delete note.'), chalk.yellow(err.message));
  }
}
