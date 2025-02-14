import Groq from 'groq-sdk';

const client = new Groq({ apiKey: 'INSERT YOU API-KEY', dangerouslyAllowBrowser: true });

// The model to use for the completion, change it based on Groq models.
const modelTest = "llama3-70b-8192"
const model = "llama-3.3-70b-versatile"

// The result of the completion.
export async function message(conversation) {
    console.log("message");
    const stream = await getGroqChatStream(conversation);
    result = "";
    for await (const chunk of stream) {
        // Print the completion returned by the LLM.
        result += chunk.choices[0]?.delta?.content || "";
    }
}

// The stream of the completion from GROQ documentation.
export async function getGroqChatStream(conversation) {
    return client.chat.completions.create({
        //
        // Required parameters
        //
        messages: conversation,

        // The language model which will generate the completion.
        model: modelTest,

        //
        // Optional parameters
        //

        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.5,

        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_completion_tokens: 1024,

        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,

        // If set, partial message deltas will be sent.
        stream: true,
    });
}