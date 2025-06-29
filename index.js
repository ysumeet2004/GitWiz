#!/usr/bin/env node
const { program } = require('commander');
const { runAICommit } = require('./commands/commit');
const { runManualCommit } = require('./commands/commitManual');

program
  .name('gitwiz')
  .description('gitwiz: AI-powered Git commit assistant with a personal touch')
  .version('1.0.0');

program
  .command('commit')
  .description('Create commit message using AI')
  .action(runAICommit);

program
  .command('commit-manual')
  .description('Create commit message manually')
  .action(runManualCommit);

program.parse(process.argv);
