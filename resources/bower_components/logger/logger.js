/*
 * @module Logger 
 * @author Clément Désiles
 * @date 2014-04-23
 * @copyright Télécom Santé
 */
(function (global) {
	'use strict';

	/**
	 * Available log levels for Logger
	 * @attribute {array}
	 */
	var _levels = {
		emergency: '[EMERGENCY]',
		critical:  '[CRITICAL] ',
		alert:     '[ALERT]',
		error:     '[ERROR]',
		warning:   '[WARNING]',
		notice:    '[NOTICE]',
		info:      '[INFO]',
		debug:     '[DEBUG]'
	};

	// Node only
	if (typeof process !== 'undefined' && process.title === 'node') {
		var os     = require('os')
		  , clc    = require('cli-color');

		// Add colors
		_levels.emergency = clc.redBright.bold(_levels.emergency);
		_levels.critical = clc.redBright(_levels.critical);
		_levels.alert = clc.yellowBright(_levels.alert);
		_levels.error = clc.red(_levels.error);
		_levels.warning = clc.yellow(_levels.warning);
		_levels.notice = clc.cyan(_levels.notice);
		_levels.info = clc.magenta(_levels.info);
		_levels.debug = clc.blackBright(_levels.debug);
	}

	/**
	 * TelecomSante Logger
	 * output messages with different warnings and colours
	 *
	 * @lends {Logger}
	 * @param {String} service - name of the service to log
	 * @param {Object} opt - options to enhance the logging process
	 * @return none
	 */
	function Logger(service, opt) {
		service = service || '';
		opt = opt || {};

		if (typeof process !== 'undefined' && process.title === 'node') {
			opt.hostname = opt.hostname || os.hostname();
		}

		/** 
		 * Get the infos to append to the logs
		 * @param {String} level
		 * @return {String} infos
		 */
		var _getinfos = function (level) {
			var infos = [];
			infos.push(new Date().toISOString());
			if (opt.hostname) infos.push(opt.hostname);
			infos.push(_levels[level]);
			infos.push(service);
			return infos.join(' ');
		};

		// Public log methods
		this.emergency = global.console.error.bind(global.console, _getinfos('emergency'));
		this.critical  = global.console.error.bind(global.console, _getinfos('critical'));
		this.alert     = global.console.error.bind(global.console, _getinfos('alert'));
		this.error     = global.console.error.bind(global.console, _getinfos('error'));
		this.warning   = global.console.warn.bind(global.console, _getinfos('warning'));
		this.notice    = global.console.info.bind(global.console, _getinfos('notice'));
		this.info      = global.console.info.bind(global.console, _getinfos('info'));
		this.debug     = global.console.log.bind(global.console, _getinfos('debug'));

		// Some aliases
		this.err  = this.error;
		this.warn = this.warning;
		this.note = this.notice;
		this.dbg  = this.debug;
	}

	// Export it
	// ---------
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Logger;
	} else {
		global.Logger = Logger;
	}
})(typeof window === 'undefined' ? global : window);