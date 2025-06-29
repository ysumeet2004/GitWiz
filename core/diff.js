// core/diff.js

const simpleGit = require('simple-git');
const path = require('path');

const git = simpleGit({ baseDir: process.cwd() });

async function getStagedDiff(filePath = null) {
  try {
    const relativePath = filePath ? path.relative(process.cwd(), filePath) : undefined;
    const diff = await git.diff(['--cached', ...(relativePath ? [relativePath] : [])]);

    console.log('🔍 Staged Diff:\n', diff || 'No staged changes.');
    return diff;
  } catch (error) {
    console.error('❌ Error getting staged diff:', error.message);
    return '';
  }
}

module.exports = { getStagedDiff };
