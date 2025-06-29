// commands/commit.js

const readline = require('readline');
const { getStagedDiff } = require('../core/diff');
const { askAI } = require('../utils/askAzure');
const { getCommitHashes, commitWithMessage } = require('../core/git');
const { logCommit } = require('../core/logger');

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

async function runAICommit() {
  const diff = await getStagedDiff();
  if (!diff || diff.trim().length === 0) {
    console.error('❌ No staged changes to commit.');
    return;
  }

  const extra = await prompt('🧠 Do you want to add extra context for AI? (y/n): ');
  let userContext = '';
  if (extra.toLowerCase() === 'y') {
    userContext = await prompt('✍️  Enter your context: ');
  }

  const aiPrompt = `Summarize the following code changes in under 30 words:\n\n${diff}\n\nExtra Context: ${userContext}`;
  const aiMessage = await askAI(aiPrompt);

  console.log('\n💬 Suggested Commit Message:');
  console.log(`"${aiMessage}"`);

  const confirm = await prompt('\n✅ Use this message? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Commit cancelled.');
    return;
  }

  await commitWithMessage(aiMessage);
  const { beforeHash, afterHash } = await getCommitHashes();

  await logCommit({
    summary: aiMessage,
    type: 'ai',
    changeID: `${beforeHash}+${afterHash}`
  });
}

module.exports = { runAICommit };
