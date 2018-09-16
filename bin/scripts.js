#!/usr/bin/env node
const { spawn } = require('child_process');
var argv = require('minimist')(process.argv.slice(2));

process.on('unhandledRejection', err => {
  throw err;
});

const scripts = ['start', 'build'];

const script = argv._.map(script => scripts.includes(script) ? script : null).filter(Boolean);

switch (script[0]) {
  case 'start':
  case 'build': {
    const child = spawn(
      'node',
      [require.resolve(`../internals/scripts/${script}.js`), ...process.argv.slice(3)],
      { stdio: 'inherit' },
    );
    child.once('error', (error) => {
      process.exit(1);
    });
    child.once('exit', (exitCode) => {
      process.exit(exitCode);
    });

    break;
  }
  default:
    console.log(`Unknown script ${script}.`);
    break;
}
