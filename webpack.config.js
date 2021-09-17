const { merge } = require('webpack-merge');
const common = require('./client/conf/webpack.common');

function get_conf(env) {
  const env_type = env.dev ? 'dev' : 'prod';
  const spec = require(`./client/conf/webpack.${env_type}.js`);

  return merge(common, spec);
}

module.exports = get_conf;
