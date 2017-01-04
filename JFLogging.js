/*
MIT License

Copyright (c) 2017 Juan Francisco Romero Moreno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*
JFLogJS  (v1.0 - 2017-01-04)
@Author: Juan Francisco Romero Moreno

JFLogJS library is a very little Javascript library that allows to make logging easier and better.

*/
"use strict";
if(window.LOG){throw"Attempting to recreate LOG. Library may be included more than once on the page."}

(function() {
	window.LOG = {
		// Is log
		status: null,
		removeMilSecDate: null,
		level_all: "ALL",
		level_debug: "DEBUG",
		level_info: "INFO",
		level_warning: "WARN",
		level_error: "ERROR",
		level_critical: "CRITICAL",
		level_nomessages: "NO_MESSAGES",
		currentLevel: null,
		// Enabling and disabling logging Library
		enable: function() {
			LOG.status = "enabled";
		},
		disable: function() {
			LOG.status = "disabled";
		},
		isEnabled: function() {
			return LOG.status === "enabled";
		},
		isDisabled: function() {
			return LOG.status === "disabled";
		},
		setLevel: function(level) {
			if( level !== LOG.level_all &&
				level !== LOG.level_debug &&
				level !== LOG.level_info &&
				level !== LOG.level_warning &&
				level !== LOG.level_error &&
				level !== LOG.level_critical) {
				throw("Level " + level + " is not allowed. Please use any of these options: " +
				  LOG.level_all + ", " + LOG.level_debug + ", " + LOG.level_info + ", " + LOG.level_warning + ", " + LOG.level_error + ", " + LOG.level_critical + ", " +  LOG.level_nomessages);
			}
			LOG.currentLevel = level;
		},
		setAllMessagesLevel: function() {
				LOG.setLevel(LOG.level_all);
		},
		setDebugLevel: function() {
			LOG.setLevel(LOG.level_debug);
		},
		setInfoLevel: function() {
			LOG.setLevel(LOG.level_info);
		},
		setWarningLevel: function() {
			LOG.setLevel(LOG.level_warning);
		},
		setErrorLevel: function() {
			LOG.setLevel(LOG.level_error);
		},
		setCriticalLevel: function() {
			LOG.setLevel(LOG.level_critical);
		},
		setNoMessagesLevel: function() {
			LOG.setLevel(LOG.level_nomessages);
		},
		all: function(msg) {
			LOG.printMsg(LOG.level_all, msg);
			launchMsgEvents(LOG.level_all);
		},
		debug: function(msg) {
			LOG.printMsg(LOG.level_debug, msg);
			LOG.launchMsgEvents(LOG.level_debug);
		},
		info: function(msg) {
			LOG.printMsg(LOG.level_info, msg);
			LOG.launchMsgEvents(LOG.level_info);
		},
		warn: function(msg) {
			LOG.printMsg(LOG.level_warning, msg);
			LOG.launchMsgEvents(LOG.level_warning);
		},
		error: function(msg) {
			LOG.printMsg(LOG.level_err, msg);
			LOG.launchMsgEvents(LOG.level_error);
		},
		critical: function(msg) {
			LOG.printMsg(LOG.level_critical, msg);
			LOG.launchMsgEvents(LOG.level_critical);
		},
		nomessages: function() {
			LOG.launchMsgEvents(LOG.level_nomessages);
		},
		getLevelNumber: function(level) {
			if(level === LOG.level_all) return 0;
			if(level === LOG.level_debug) return 1;
			if(level === LOG.level_info) return 2;
			if(level === LOG.level_warning) return 3;
			if(level === LOG.level_error) return 4;
			if(level === LOG.level_critical) return 10;

			// No messages
			if(level === LOG.level_nomessages) return 100;
		},
		levelIsPrintable: function(levelToTest) {
			return (LOG.getLevelNumber(levelToTest) >= LOG.getLevelNumber(LOG.currentLevel));
		},
		printMsg: function(level, msg) {
			if(LOG.isEnabled() && LOG.levelIsPrintable(level)) {
				var d = new Date().toISOString();
				d = d.replace("T", " ");
				d = d.replace("Z", "");
				if() {
					d = d.substring(0, d.length - 4);
				}

				console.log(d + " - " + level + " - " + msg);
			}
		},
		onMessageFuncs: [],
		onMessage: function(msgType, func) {
			if(!LOG.onMessageFuncs[msgType]) {
				LOG.onMessageFuncs[msgType] = [];
			}
			// If func is not a function, exits
			if(typeof func !== "function") throw "onMessage Func has to be a function";
			// Add the function to the queue
			LOG.onMessageFuncs[msgType].push(func);
		},
		launchMsgEvents: function(level) {
			if(LOG.isEnabled() && LOG.levelIsPrintable(level) && typeof LOG.onMessageFuncs[level] !== "undefined") {
				for(var i = 0 ; i < LOG.onMessageFuncs[level].length ; i++) {
					LOG.onMessageFuncs[level][i]();
				}
			}
		},
	};

	function initLogging() {
		LOG.enable();
		LOG.currentLevel = LOG.level_error;
		LOG.removeMilSecDate = true;
	}
	// Init logging:
	initLogging();
})();
