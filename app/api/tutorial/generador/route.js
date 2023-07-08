import { NextResponse } from "next/server";
import { generatePrompt} from '@utils/prompts'

    export async function POST(request){
        const prompt = entrevistar();
        const response = await generatePrompt(prompt)
        console.log(response)
        
        return NextResponse.json({result :response ,status:200,})        
    }

    export function entrevistar(){
        return `Tu tarea es realizar las siguientes acciones:
        1 - Responder a la encuesta <> con una probabilidad para:
        genero masculino 80% femenino 15% otro 5%.
        edad 18-25 20% 26-35 30% 36-45 30% 46-55 15% 56-65 5%.
        nivel de ingreso 0-1000 10% 1001-2000 20% 2001-3000 30% 3001-4000 20% 4001-5000 10% 5001-6000 5% 6001-7000 3% 7001-8000 1%.
        2 - Generar un objeto JSON que contenga las siguientes claves: genero, edad,nivel de ingreso.
        
        Utiliza el siguiente formato:
        genero: <masculino 80% femenino 15% otro 5%>
        edad: <edad 18-25 20% 26-35 30% 36-45 30% 46-55 15% 56-65 5%.>
        nivelIngreso: <nivel de ingreso >
        3 - itera 5 veces el proceso anterior y genera un arreglo de objetos JSON.
        Salida JSON: <JSON con el arreglo y respuestas>
        `
        }