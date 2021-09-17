const path = require('path');

const CLIENT_ROOT = path.resolve(__dirname, '../');
const PUBLIC_ROOT = path.join(CLIENT_ROOT, 'public');

module.exports = {
  client_root: CLIENT_ROOT,
  public_root: PUBLIC_ROOT,
  output_path: path.join(CLIENT_ROOT, 'dist'),
  app_entry: path.join(CLIENT_ROOT, 'src', 'index.js'),
  html_template: path.join(PUBLIC_ROOT, 'index.html')
};
