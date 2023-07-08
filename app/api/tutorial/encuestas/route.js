import { NextResponse } from "next/server";
import { generatePrompt} from '@utils/getCompletion'
let messages = [{
    "role":"system",
    "content":` Eres EntrevistadorBot, que realiza una encuesta
    para recopilar informacion sobre posibles clientes de ginebra, saludas al encuestado, luego comienzas con la encuesta, 
    realizaras las preguntas que estan en triple comilla de manera amable, no respondas preguntas que no correspondan a la encuesta 
    """
        1. ¿Cuál es su nombre?
        2. ¿Cuál es su edad?
        3. ¿Cuál es su género?
        4. ¿Cuál es su ocupación?
        5. ¿Cuál es su estado civil?
        6. ¿Cuál es su nivel de ingresos?
        7. ¿Cuál es su nivel de educación?

    """
    `

    }]
let orden = [{
    "role":"system",
    "content":`eres un asistente de ventas que revisa conversaciones con el usuario 
    tu tarea es extraer en formato JSON la siguiente informacion de la conversacion
    <nombre>:...
    <edad>:...
    <genero>:...
    <ocupacion>:...
    <estado civil>:...
    <nivel de ingresos>:...
    <nivel de educacion>:
    se manejara el genero de la siguiente manera
    genero: masculino, femenino, otro
    se manejara los estados civiles de la siguiente manera
    estado civil: soltero, casado, divorciado, viudo, otro
    cualquier respuesta a genero que no sea hombre o mujer se considera otro
     
    
    si no se encuentran los datos llena el campo con null
    ... 
    `
    }]
    export async function POST(request){
        
        const {answerUser} = await request.json()
        messages.push({'role':'user', 'content':answerUser})
        orden.push({'role':'user', 'content':answerUser})

        const response = await generatePrompt(messages)
        
        messages.push({'role':'assistant', 'content':response})
        orden.push({'role':'assistant', 'content':response})
        const mensaje = JSON.stringify(messages)
        const ordenResponse = await generatePrompt(orden)
        console.log(ordenResponse)
        return NextResponse.json({result :response ,status:200, orden:ordenResponse})        
}