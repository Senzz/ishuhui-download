const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      extraBabelPlugins: [
        'transform-remove-console',
      ],
      publicPath: './'
    }
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    '@': path.resolve(__dirname, 'src/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: { 
    template: './src/index.ejs',
    inject: true
  }, 
  publicPath: '/',
  hash: true,
};
