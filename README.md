# Liam CLI

A personal, stylish, interactive Node.js/TypeScript CLI client for your homelab.

## Features
- Full interactive CLI with menus (Commander, Inquirer)
- Ergonomic, customizable color themes (light/dark)
- Authentication (JWT login, stores token securely)
- Manage projects and notes with CRUD commands
- Configure API endpoint, theme, and enjoy a solid UX with stylish output (Chalk, cli-table3, figlet)

## Installation

```bash
# Clone this repository
cd liam-cli
./install.sh
liam
```

## Commands

```bash
liam                      # Launch interactive menu UI
liam status               # Show API/server status
liam projects list        # List your projects
liam notes list           # List notes
liam notes add            # Add a note
liam notes delete         # Delete a note
liam login                # Authenticate and save token
```

## Main Menu Example

![ASCII Banner + Main Menu](https://same-assets.com/liam-cli-banner-example.png)

## Settings & Customization

- **Theme:** Light/dark display for banners/colors. Set using the interactive menu or editing `~/.liam-cli/config.json`.
- **API Endpoint:** Point the CLI at any compatible REST API. Update via menu.
- **Token Storage:** Security token is stored in `~/.liam-cli/token.json` after login.
- **Notes Storage:** Local notes saved to `~/.liam-cli/notes.json` (used for fast CRUD; can be extended to cloud/api).

## Usage Examples

### Add a Note
```
liam notes add
```
Or from the menu: `Add Note`

### Delete a Note
```
liam notes delete
```

### Switch Theme
From the interactive main menu, select "Change Theme" and pick light/dark.

### Change API Endpoint
From menu: "Configure API Endpoint" or manually edit `~/.liam-cli/config.json`.

## Extending
You can add new commands by adding files under `src/commands/` and wiring them up in `src/index.ts` and `src/utils/menu.ts`.

---

**Liam CLI** is designed for terminal enthusiasts who want full control, easy extensibility, and ergonomic beauty. Enjoy! 🎉
