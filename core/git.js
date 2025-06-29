// core/git.js

const simpleGit = require('simple-git');
const git = simpleGit({ baseDir: process.cwd() });

async function commitWithMessage(message) {
  try {
    await git.commit(message);
    console.log('✅ Committed successfully.');
  } catch (error) {
    throw new Error(`Failed to commit: ${error.message}`);
  }
}

async function getCommitHashes() {
  try {
    const log = await git.log({ maxCount: 2 });
    const [latest, before] = log.all;

    return {
      beforeHash: before ? before.hash : 'N/A',
      afterHash: latest.hash
    };
  } catch (error) {
    throw new Error(`Failed to get commit hashes: ${error.message}`);
  }
}

module.exports = {
  commitWithMessage,
  getCommitHashes
};
