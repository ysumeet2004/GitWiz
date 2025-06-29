const { askAI } = require("../utils/askAzure"); // Moved to utils for cleanliness

async function generateCommitMessage(diff, extraContext = "") {
  try {
    const prompt = `
Given the following Git diff, generate a concise Git commit message (under 30 words).
If useful, consider the user's extra context.

---DIFF---
${diff}

---CONTEXT---
${extraContext}
`;

    const aiMessage = await askAI(prompt);
    return aiMessage.trim();
  } catch (err) {
    console.error("❌ Error generating AI commit message:", err.message);
    return null;
  }
}

module.exports = { generateCommitMessage };
