const googleAuth = require('cypress-google-auth/plugin');
module.exports = (on, config) => {
  googleAuth(on, config);
};