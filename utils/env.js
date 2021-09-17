const path = require('path');

function get_env_path(env_target) {
  let file;
  switch (env_target) {
    case 'development':
      file = '.env.dev';
      break;
    case 'production':
      file = '.env.prod';
      break;
    default:
      file = '.env';
      break;
  }
  return path.resolve(__dirname, '..', file);
}

function try_get_env(env_target) {
  const env_output = require('dotenv').config({
    path: get_env_path(env_target)
  });
  if (env_output.error) {
    console.error(env_output.error);
    process.exit(1);
  }
  if (!env_target) {
    return env_output.parsed;
  }
  return {
    ...try_get_env(),
    ...env_output.parsed
  };
}

module.exports = {
  env: try_get_env(process.env.NODE_ENV),
  env_path: get_env_path(process.env.NODE_ENV)
};
