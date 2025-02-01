const path = require('path');
const fs = require('fs');

module.exports = {
  devServer: {
    host: 'www.lookfantastic.com',
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
