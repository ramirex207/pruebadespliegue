
import { Configuration,OpenAIApi} from 'openai';

//aqui empieza el codigo de la api
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
    })
    if (!configuration.apiKey)
        throw new Error('OPEN_API_KEY no esta definida')
    const openai = new OpenAIApi(configuration)
    
    export async function generatePrompt(messages){  
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    });
    const chatResponse = completion.data.choices[0].message.content
    return chatResponse
    }
