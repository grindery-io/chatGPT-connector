import { Configuration, OpenAIApi } from "openai";

export const sendPromptToChatGpt = (apiKey: string, prompt: string) => {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      reject({ message: "API key is required" });
    }
    if (!prompt) {
      reject({ message: "Prompt can't be empty" });
    }

    const configuration = new Configuration({
      apiKey,
    });

    const openai = new OpenAIApi(configuration);

    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      })
      .then((res) => {
        if (res?.data?.choices?.[0]?.message?.content) {
          resolve(res.data.choices[0].message.content);
        } else {
          reject({ message: "No response" });
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });
};
