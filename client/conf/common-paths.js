const path = require('path');

const CLIENT_ROOT = path.resolve(__dirname, '../');

module.exports = {
  client_root: CLIENT_ROOT,
  output_path: path.join(CLIENT_ROOT, 'dist'),
  app_entry: path.join(CLIENT_ROOT, 'src', 'index.js'),
  html_template: path.join(CLIENT_ROOT, 'public', 'index.html')
};
