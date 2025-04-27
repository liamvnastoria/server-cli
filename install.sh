#!/bin/bash

set -e

APP_NAME="liam"
INSTALL_DIR="/usr/local/bin"
SERVICE_NAME="liam-service"
NODE_MIN_VERSION="16"
DIST_DIR="dist"

echo ""
echo "🚀 Starting Liam CLI installation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js and rerun this script."
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//g' | cut -d '.' -f1)
if [ "$NODE_VERSION" -lt "$NODE_MIN_VERSION" ]; then
  echo "❌ Node.js version must be >= $NODE_MIN_VERSION. Current version is $(node -v)."
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if dist folder exists, and create it if it doesn't
if [ ! -d "$DIST_DIR" ]; then
  echo "🗂️ Creating the '$DIST_DIR' directory..."
  mkdir "$DIST_DIR"
fi

# Build project
echo "🛠️ Compiling TypeScript..."
npm run build

# Verify the existence of the compiled index.js file
if [ ! -f "$DIST_DIR/index.js" ]; then
  echo "❌ The compilation failed. '$DIST_DIR/index.js' is missing!"
  exit 1
fi

# Create the executable file in /usr/local/bin
echo "🔗 Creating executable file for CLI in $INSTALL_DIR..."

echo -e "#!/bin/bash\nnode $(npm root -g)/$APP_NAME/$DIST_DIR/index.js \"\$@\"" > $INSTALL_DIR/$APP_NAME
chmod +x $INSTALL_DIR/$APP_NAME

# Check if the alias is already created, otherwise add it
if ! grep -Fxq "alias $APP_NAME=" ~/.bashrc; then
  echo "Adding alias 'liam' to your shell configuration..."
  echo "alias $APP_NAME='$INSTALL_DIR/$APP_NAME'" >> ~/.bashrc
  source ~/.bashrc
fi

echo "✅ Liam CLI command is now available with 'liam'."

# Propose to install the service
read -p "⚡ Do you want to install Liam CLI as a background service too? (y/n): " INSTALL_SERVICE

if [[ "$INSTALL_SERVICE" == "y" ]]; then
  SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME.service"

  echo "📝 Creating systemd service file at $SERVICE_PATH..."

  sudo bash -c "cat > $SERVICE_PATH" <<EOL
[Unit]
Description=Liam CLI Background Service
After=network.target

[Service]
ExecStart=$(which node) $(npm root -g)/$APP_NAME/$DIST_DIR/background.js
Restart=on-failure
User=$(whoami)
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOL

  echo "🔄 Reloading systemd daemon..."
  sudo systemctl daemon-reload

  echo "▶️ Enabling $SERVICE_NAME service..."
  sudo systemctl enable $SERVICE_NAME

  echo "🎯 Starting $SERVICE_NAME service..."
  sudo systemctl start $SERVICE_NAME

  echo -e "\n\033[1;32m✅ Liam CLI service installed and started!\033[0m\n"
else
  echo -e "\n\033[1;32m✅ Liam CLI installed successfully without background service!\033[0m\n"
fi

