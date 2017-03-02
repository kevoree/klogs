#! /usr/bin/env node

var readline = require('readline');
var chalk = require('chalk');

var REGEX = /^([0-9]{2}:[0-9]{2}) (TRACE|DEBUG|INFO|WARN|ERROR): (.*)/;

function noColor(str) {
	return str;
}

function getColor(level) {
	switch (level) {
		default:
			return noColor;

		case 'TRACE':
			return chalk.grey;

		case 'DEBUG':
			return chalk.cyan;

		case 'INFO':
			return noColor;

		case 'WARN':
			return chalk.yellow;

		case 'ERROR':
			return chalk.red;
	}
}

var rl = readline.createInterface({
	input: process.stdin
});

var matcher;
var color = noColor;
rl.on('line', function (line) {
	matcher = line.match(REGEX);
	if (matcher) {
		color = getColor(matcher[2]);
		console.log(chalk.gray(matcher[1]) + '  ' + color(matcher[3]));
	} else {
		console.log(color(line));
	}
});

process.on('SIGINT', function () {
	// process.stdout.write('\x1b[0G');
});
