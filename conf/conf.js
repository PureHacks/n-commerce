/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 9:06 AM
 */

// load configurations
var devConf  = require('./devConf').conf
  , prodConf = require('./prodConf').conf;

/**
 * Returns the current configuration object
 * @returns {*} the configuration object
 */
function getCurrentEnvironment() {
  if('dev') {
    return devConf;
  } else {
    return prodConf;
  }
};

// returns current configuration object
exports.conf = getCurrentEnvironment();