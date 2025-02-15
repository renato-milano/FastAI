
export const tools = [
    {
        type: "function",
        function: {
            name: "nome_funzione",
            description: "Descrizione tool, serve a far capire all'AI a cosa serve cosi che sappia quando usarla",
            parameters: {
                type: "object",
                properties: {
                    parametro1: { type: "string" },
                    parametro2: { type: "string" }
                },
                required: ["parametro1", "parametro2"],
                additionalProperties: false
            },
            strict: true
        }
    }
];


// FUNZIONE CHE CHIAMA IL TOOL SELZIONATO DA AI
export const call_tool = async (tool, args) => {
    switch (tool) {
    case "nome_funzione":
            return await nome_funzione(args);
    default:
        return "Errore: Tool non presente"
        break;
  }
};

async function nome_funzione(args) {
    //FETCH DEI PARAMETRI
    const parametro1 = args.parametro1;
    const parametro2 = args.parametro2;
    // FA QUALCOSA, RITORNA UNA STRINGA DI RISPOSTA
}
