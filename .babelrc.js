module.exports = {
  plugins: [
    // "dynamic-import-node-sync",
    [
      'babel-plugin-module-resolver',
      // "dynamic-import-node-sync",
      {
        alias: {
          components: './src/components',
        },
      },
    ],
  ],
};