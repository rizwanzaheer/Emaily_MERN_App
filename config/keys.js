module.exports = {
  googleClientID: '786215798692-09dhnjktntidue1fl8cuolsaaclj389u.apps.googleusercontent.com',
  googleClientSecret: 'a-3VkZI-oZ8gWQ9YiubgNHQ3',
  mongoURI: 'mongodb://rizwan:rizwan-dev@ds137121.mlab.com:37121/emaily-dev',
  cookieKey: 'adhoiuahuw@i324@!133234$#2390fiasdf0adgdfadrqr4352trergsdfhfgbfiasdadf#@!#$$%adfafeadfad'
};
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
