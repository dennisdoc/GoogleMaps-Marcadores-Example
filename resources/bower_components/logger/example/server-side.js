// Test this like: node server-side.js
var Logger = require('../logger');
var logger = new Logger('server-side example');
logger.emergency('--> EMERGENCY');
logger.critical('--> CRITICAL');
logger.alert('--> ALERT');
logger.error('--> ERROR');
logger.warning('--> WARNING');
logger.notice('--> NOTICE');
logger.info('--> INFO');
logger.debug('--> DEBUG');