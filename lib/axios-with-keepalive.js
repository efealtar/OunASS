const axios = require('axios');
const Agent = require('agentkeepalive');

const keepAliveOptions = {
  maxSockets: 25, // maximum number of concurrent sockets per origin
  maxFreeSockets: 5, // maximum number of sockets that will be left open in the free state
  timeout: 120000, // active socket keepalive for 2 mins
  freeSocketTimeout: 60000, // free socket keepalive for 1 min
};

axios.defaults.httpAgent = new Agent(keepAliveOptions);
axios.defaults.httpsAgent = new Agent.HttpsAgent(keepAliveOptions);
axios.defaults.headers['Accept-Encoding'] = 'gzip';

module.exports = axios;
