const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

const token = "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";
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

async function askAI(userPrompt) {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userPrompt }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw new Error(response.body?.error?.message || "Unexpected API error");
  }

  return response.body.choices[0].message.content;
}

module.exports = { askAI };
