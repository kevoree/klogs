#! /usr/bin/env node
var readline = require('readline');
var chalk = require('chalk');

var REGEX = /^([0-9]{2}:[0-9]{2}) (TRACE|DEBUG|INFO|WARN|ERROR): (.*)$/;

function noColor(str) {
  return str;
}

function prettyPrint(match, time, level, msg) {
  var color;

  switch (level) {
    default:
      color = noColor;
      break;

    case 'TRACE':
      color = chalk.grey;
      break;

    case 'DEBUG':
      color = chalk.cyan;
      break;

    case 'INFO':
      color = noColor;
      break;

    case 'WARN':
      color = chalk.yellow;
      break;

    case 'ERROR':
      color = chalk.red;
      break;
  }
  return chalk.gray(time) + '  ' + color(msg);
}

var rl = readline.createInterface({ input: process.stdin });

rl.on('line', function (line) {
  console.log(line.replace(REGEX, prettyPrint));
});
