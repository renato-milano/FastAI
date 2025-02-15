import Groq from 'groq-sdk';
import { tools,call_tool } from './tools';

const client = new Groq({ apiKey: 'INSERT YOU API-KEY', dangerouslyAllowBrowser: true });

// The model to use for the completion, change it based on Groq models.
const modelTest = "llama3-70b-8192"
const model = "llama-3.3-70b-versatile"
const DeepSeek="deepseek-r1-distill-llama-70b"

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


export async function getGroqChatStream(conversation) {
    try {
    // PRIMA CHIAMATA PER VERIFICARE L'USO DI TOOL
    let response = await client.chat.completions.create({
        model: DeepSeek,
        messages: conversation,
        stream: false,
        tools: tools,
        tool_choice: "auto",
        max_completion_tokens: 2096,
        reasoning_format: "parsed"
    });
    
    let responseMessage = response.choices[0].message;
    let toolCalls = responseMessage.tool_calls;

    // SE NON CI SONO TOOL CHIAMATI IN TOOL_CALLS MA LA RISPOSTA 
    // CONTIENTE LA CHIAMATA COME MESSAGGIO, ALLORA FORZA L'USO DI TOOL 
    if(!toolCalls){
        if(responseMessage.content.includes("<tool_call>")){
        console.log("Chiamata forzata!")
            response = await client.chat.completions.create({
                model: DeepSeek,
                messages: conversation,
                stream: false,
                tools: tools,
                tool_choice: "required", // FORZA LA CHIAMATA
                max_completion_tokens: 1000,
            });
        }
    }
    
    responseMessage = response.choices[0].message;
    toolCalls = responseMessage.tool_calls;

    // FETCH TOOL CHIAMATI, MA NON TUTTI, ESEGUE I TOOL CHIAMATI
    if (toolCalls &&toolCalls.length!=tools.length) {
        
        console.log("Ragionamento: ",responseMessage.reasoning);
        delete responseMessage.reasoning
        conversation.push(responseMessage);

        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const functionResponse = call_tool(functionName,functionArgs);
            conversation.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: functionName,
                content: await functionResponse,
            });
        }
    }

    // RISPOSTA FINALE
    return client.chat.completions.create({
        //
        // Required parameters
        //
        messages: conversation,
        model: ModelTest,

        //
        // Optional parameters
        //
        temperature: 0.5,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: true,
    });
    
} catch (error) {

        conversation.push({
            role: "system",
            content: "Errore: Qualcosa è andato storto, riprova più tardi.",
        });
        return client.chat.completions.create({
            //
            // Required parameters
            //
            messages: conversation,
            model: ModelTest,
    
            //
            // Optional parameters
            //
            temperature: 0.5,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: true,
        });
        
}
}