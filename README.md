🧙‍♂️ gitwiz

A magical AI-powered Git commit assistant that crafts smart commit messages, keeps track of your project history, and helps you work like a wizard.

✨ Features

🧠 AI-generated commit messages from code diffs

📓 Logs commit history with timestamps and Git hashes

👤 Choose between AI mode or manual commit mode

🔧 Seamless integration with Git hooks (optional)

📦 Installation

Once published to npm:

npm install -g @ysumeet2004/gitwiz

🚀 Usage

🧠 AI-based Commit

gitwiz commit

Shows staged diff.

Asks if you want to add extra context.

Sends everything to AI.

Shows commit message suggestion.

You approve → Commit is made + logged.

✍️ Manual Commit

-gitwiz commit-manual
-You enter a message.
-Commit is made directly.
-Change is logged as manual entry.

🗂 Log File Format

Location: gitwiz.log (auto-generated in root)

#gitwiz 001
#timestamp: 2025-06-29 09:00
#type: ai
#changeID: 8f1b4a9 → c2a9d3e

⚙️ Optional Git Hook

Enable commit message auto-fill (only when git commit is run without -m).

Run:

node hooks/setupHook.js

This adds a prepare-commit-msg Git hook that inserts a placeholder message.

🛠 Development

Folder Structure

gitwiz/
├── index.js                # Entry point
├── commands/
│   ├── commit.js           # AI-based commit
│   └── commitManual.js     # Manual commit
├── core/
│   ├── diff.js             # Get Git diff
│   ├── ai.js               # AI interaction logic
│   ├── logger.js           # Commit logging
│   └── git.js              # Git commit + hash retrieval
├── hooks/
│   └── prepare-commit-msg  # Optional Git hook

💡 Example

git add example.js
gitwiz commit

Output:

🔍 Staged Diff: changes found in example.js
🧠 Do you want to add extra context? (y/n): n
💬 Suggested commit: Refactor example.js logic for better readability.
✅ Use this message? (y/n): y
✅ Committed successfully.

❤️ Dedicated To 0725

The joy of coding and not documenting !
