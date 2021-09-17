const { merge } = require('webpack-merge');
const common = require('./client/conf/webpack.common');

function get_conf(env) {
  const env_type = env.IS_DEV ? 'dev' : 'prod';
  const spec = require(`./client/conf/webpack.${env_type}.js`);

  return merge(common, spec);
}

module.exports = get_conf;
