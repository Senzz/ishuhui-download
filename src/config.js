const config =  {
  apiUrl: 'http://localhost:5000',
  debug: false,
}

// 不是localhost
if(window.location.href.indexOf('localhost') == -1) {
  config.apiUrl = "http://111.230.23.109:5000";  // 线上地址
}

const debug = config.debug;

export { debug, isUc };

export default config;