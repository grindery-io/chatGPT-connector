import {
  ConnectorInput,
  ConnectorDefinition,
  ActionOutput,
} from "grindery-nexus-common-utils";
import { sendPromptToChatGpt } from "./openAi";

let debugOutput = "Hello World!";

function addDebugOutput(output: string) {
  if (debugOutput.length > 10000) {
    debugOutput = "(truncated)";
  }
  debugOutput += `\n[${new Date().toISOString()}] ${output}`;
}

async function sendPrompt(
  params: ConnectorInput<unknown>
): Promise<ActionOutput> {
  const fields = params.fields as {
    apiKey: string;
    prompt: string;
  };

  try {
    const response = await sendPromptToChatGpt(fields.apiKey, fields.prompt);

    if (response) {
      addDebugOutput(`[${params.sessionId}] Response: ${response}`);
      return {
        payload: {
          prompt: fields.prompt,
          response,
        },
      };
    }
  } catch (err) {
    console.error("getTokenPrice error", err);
  }

  return {
    payload: {
      prompt: fields.prompt,
      response: "",
    },
  };
}

export const CONNECTOR_DEFINITION: ConnectorDefinition = {
  actions: { sendPrompt },
  triggers: {},
  webhooks: {},
  options: {
    mutateRoutes: (app) => {
      app.get("/debug", (req, res) => res.type("text").send(debugOutput).end());
    },
  },
};
