import {NextResponse} from 'next/server'
import {Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
if (!configuration.apiKey)
    throw new Error('OPEN_API_KEY no esta definida')
const openai = new OpenAIApi(configuration)


export async function POST(request){
    const {prompt} = await request.json()
    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:generatePrompt(prompt),
        max_tokens: 150,
    })
    console.log(prompt)
    console.log(completion.data.choices[0].text)
    return NextResponse.json({result :completion.data.choices[0].text, status:200})   
    }
function generatePrompt(prompt){
    return `asume el rol de comediante especializado en chistes informaticos y crea un chiste con la entrada del usuario.
    user: javascript
    joke: como se llama el lenguaje de programacion de los gatos, miuwscript
    user: ${prompt}
    joke:`;
}