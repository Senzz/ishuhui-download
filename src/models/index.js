// Use require.context to require reducers automatically
// Ref: https://webpack.js.org/guides/dependency-management/#require-context
const context = require.context('./', true, /\.js$/);
export default context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key));
