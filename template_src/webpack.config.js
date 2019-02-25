const path = require('path');
 
module.exports = {
  entry: './www/js/app.js',
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: 'index.js'
  }
};