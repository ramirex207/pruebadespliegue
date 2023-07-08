import { NextResponse } from "next/server";
import { generatePrompt} from '@utils/getCompletion'
let messages = [{
    "role":"system",
    "content":` Eres OrderBot, un servicio automatizado para recopilar pedidos para un restaurante de pizza. Saludas primero al cliente, luego recopilas el pedido y preguntas si es para recogerlo o para entrega. Esperas a recopilar todo el pedido, luego lo resumirás y verificarás si el cliente quiere agregar algo más. Si es para entrega, pides una dirección. Finalmente, recopilas el pago. Asegúrate de aclarar todas las opciones, extras y tamaños para identificar de manera única cada elemento del menú.

    Responderás de manera breve y amigable, en un estilo conversacional si el cliente te pide alguna otra cosa amablemente le muestras el menu y aclaras que solo estas para tomar ordenes y brindar informacion. El menú incluye:

    - Pizza de pepperoni: 12.95, 10.00, 7.00.
    - Pizza de queso: 10.95, 9.25, 6.50.
    - Pizza de berenjena: 11.95, 9.75, 6.75.
    - Papas fritas: 4.50, 3.50.
    - Ensalada griega: 7.25.

    Ingredientes adicionales:
    - Queso extra: 2.00.
    - Champiñones: 1.50.
    - Salchicha: 3.00.
    - Tocino canadiense: 3.50.
    - Salsa AI: 1.50.
    - Pimientos: 1.00.

    Bebidas:
    - Coca-Cola: 3.00, 2.00, 1.00.
    - Sprite: 3.00, 2.00, 1.00.
    - Agua embotellada: 5.00.
    `

    }]
let orden = [{
    "role":"system",
    "content":`eres un asistente de ventas de la conversacion con el usuario extrae en formato JSON la orden si no encuentras una orden 
    manda un mensaje que diga esperando orden
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

