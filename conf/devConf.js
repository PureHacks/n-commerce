/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 9:19 AM
 */

var devConf = {
  databaseName: 'test',
  databaseHost: 'localhost',
  payPal: {
    "port" : 5000,
    "api" : {
      "host" : "api.sandbox.paypal.com",
      "port" : "",
      "client_id" : "ARtpgRB02F650dhBMrZ1u-9G5GMkEJwc8hVlU8Mt85RkIvewNAu1rXkHTi8L",
      "client_secret" : "EKItsRCjlq3Rx-q7eoHp8cCefbT8dY635Gn0AGQ0pjju04gy7KHt_jK1N2aC"
    }
  }
};

exports.conf = devConf;