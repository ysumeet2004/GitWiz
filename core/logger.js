// core/logger.js

const fs = require('fs').promises;
const path = require('path');

const LOG_PATH = path.join(process.cwd(), 'commita.log');

async function getNextSerialNumber() {
  try {
    const content = await fs.readFile(LOG_PATH, 'utf-8');
    const matches = content.match(/#commita\s+(\d+)/g);
    if (!matches || matches.length === 0) return 1;

    const last = matches[matches.length - 1];
    return parseInt(last.split(' ')[1]) + 1;
  } catch (err) {
    // File might not exist yet
    return 1;
  }
}

async function logCommit({ summary, type, changeID }) {
  const timestamp = new Date().toISOString();
  const serial = await getNextSerialNumber();

  const entry = `#commita ${serial}
#${timestamp}
#${type}: ${summary}
#changeID: ${changeID}

`;

  try {
    await fs.appendFile(LOG_PATH, entry, { encoding: 'utf-8' });
    console.log('📝 Commit logged to commita.log');
  } catch (err) {
    console.error('❌ Failed to write to log file:', err.message);
  }
}

module.exports = {
  logCommit
};
