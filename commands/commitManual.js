// commands/commitManual.js

const readline = require('readline');
const { makeCommit, getCommitHashes } = require('../core/git');
const { logCommit } = require('../core/logger');

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

async function runManualCommit() {
  const message = await prompt('📝 Enter your commit message: ');

  if (!message || message.trim().length === 0) {
    console.error('❌ Commit message cannot be empty.');
    return;
  }

  await makeCommit(message);
  const { beforeHash, afterHash } = await getCommitHashes();

  await logCommit({
    summary: message,
    type: 'manual',
    changeID: `${beforeHash}+${afterHash}`
  });
}

module.exports = { runManualCommit };
