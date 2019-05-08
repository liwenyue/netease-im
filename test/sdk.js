/**
 * Created by henryleu on 9/6/16.
 */
const Nim = require('../lib');
const Promise = require('bluebird');
const config = require('./config');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.setLevel('DEBUG');


const nim = new Nim({
    appsecret: config.appsecret,
    appkey: config.appkey,
    logger: logger
});

module.exports = Promise.promisifyAll(nim);