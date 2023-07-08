import { NextResponse } from "next/server";
import { dbConnect } from "../../../libs/mongodb";
import { Configuration,OpenAIApi} from 'openai';


dbConnect();
export function GET(request) {
  return NextResponse.json({
    message: "hello world from api get",
  });
}


//aqui empieza el codigo de la api
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
if (!configuration.apiKey)
  throw new Error('OPEN_API_KEY no esta definida')
const openai = new OpenAIApi(configuration)
// aqui empieza las constantes para los ejemplos de la api
const text = `Debes expresar lo que deseas que un modelo haga proporcionando instrucciones que sean lo más claras y específicas posible. Esto guiará al modelo hacia el resultado deseado y reducirá las posibilidades de recibir respuestas irrelevantes o incorrectas. No confundas escribir una indicación clara con escribir una indicación breve. En muchos casos, las indicaciones más largas brindan más claridad y contexto al modelo, lo que puede llevar a resultados más detallados y relevantes.`
const text_1 = `
¡Preparar una taza de té es fácil! Primero, necesitas poner a hervir un poco de \
agua. Mientras eso sucede, \
agarra una taza y pon en ella una bolsita de té. Una vez que el agua esté \
suficientemente caliente, simplemente viértela sobre la bolsita de té. \
Deja reposar un poco para que el té se infusione. Después de unos \
minutos, saca la bolsita de té. Si lo deseas, puedes añadir azúcar o leche al gusto. \
¡Y eso es todo! Tienes una deliciosa \
taza de té para disfrutar.
`;
const text_2=`El sol brilla intensamente hoy y los pájaros están cantando. Es un hermoso día para dar un paseo por el parque. Las flores están floreciendo y los árboles se mecen suavemente con la brisa. La gente está afuera disfrutando del clima encantador. Algunos están haciendo picnics, mientras que otros están jugando juegos o simplemente relajándose sobre el césped. Es un día perfecto para pasar tiempo al aire libre y apreciar la belleza de la naturaleza.`

//aqui empieza la funcion para realizar la solicitud a la api
export async function POST(request){  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      "role":"user",
      "content":Principle2_tactic1_ex2(text_3)
    }],
  });
  const chatResponse = completion.data.choices[0].message.content
  console.log(chatResponse);
  return NextResponse.json({
    result: chatResponse,
    status: 200,
  }
  );
}
/*-----------------Principle 1 WRITE CLEAR AND SPECIFIC INSTRUCTIONS -------------
-------------------Principio 1 ESCRIBE CLARAS Y ESPECIFICAS INSTRUCCIONES -------------
Tactic 1: Use delimiters to separate the prompt from the response
Táctica 1: Utiliza delimitadores para separar la indicación de la respuesta.
*/
export function generatePrompt(text){
  return `Resume el texto delimitado por triple comillas en una sola oración. """${text}"""
  `;
}
//Tactic 2: Ask for structured output
// Táctica 2: Solicita una salida estructurada. puede ser html, json
export function generatePrompt2(){
  const message=`Genera una lista de tres títulos de libros inventados junto con sus autores y géneros.
  Proporciónalos en formato JSON con las siguientes claves: book_id, title, author, genre`
  return message
  ;
}
//Tactic 3: Check whether conditions are satisfied. Check assumptions requierd to do the task
// Táctica 3: Verifica si se cumplen las condiciones. Verifica los supuestos necesarios para realizar la tarea
export function generatePrompt3(text_1){

  return `Se te proporcionará un texto delimitado por comillas triples.
  Si contiene una secuencia de instrucciones, \
  reescribe esas instrucciones en el siguiente formato:
  
  Paso 1 - ...
  Paso 2 - ...
  ...
  Paso N - ...
  
  Si el texto no contiene una secuencia de instrucciones, \
  simplemente escribe "No se proporcionaron pasos".
  
  """${text_1}"""
  `;
}
//few-shot prompting, give successfull examples of completing task, then ask model to perform the task.
//Táctica de "few-shot prompting": proporciona ejemplos exitosos de completar la tarea y luego pide al modelo que realice la tarea.
export function generatePrompt4(){
  const prompt =  `
  Your task is to answer in a consistent style.
  
  <child>: Enséñame sobre la paciencia.
  
  <grandparent>: El río que talla el valle más profundo fluye desde una modesta fuente; 
  la sinfonía más grandiosa se origina a partir de una sola nota; 
  el tapiz más intrincado comienza con un hilo solitario.
  
  <child>: Enséñame sobre la resiliencia.
  `;
  return prompt;
}
/*-----------------Principle 2 GIVE THE MODEL TIME TO THINK -------------
-------------------PrincipIe 2 DALE AL MODELO TIEMPO PARA PENSAR -------------
*/
//constantes para el principio 2
const text_3= `En un encantador pueblo, los hermanos Jack y Jill se embarcaron en una misión para obtener agua de un pozo en lo alto de una colina. Mientras subían, cantando alegremente, la desgracia los golpeó: Jack tropezó con una piedra y rodó colina abajo, seguido por Jill. Aunque un poco golpeados, la pareja regresó a casa y recibieron abrazos reconfortantes. A pesar del percance, su espíritu aventurero no se apagó y continuaron explorando con alegría.`

/*TACTIC 1: Specify the steps to complete a task
Táctica 1: Especifica los pasos para completar una tarea
  Step 1: ...
  Step 2: ...
  ...
  Step N: ...
*/
export function Principle2_tactic1(text){
return `Realiza las siguientes acciones:

1 - Resume el siguiente texto delimitado por comillas triples en una sola oración traducida al español.
2 - Traduce el resumen al francés.
3 - Enumera cada nombre en el resumen en francés.
4 - Genera un objeto JSON que contenga las siguientes claves: french_summary, num_names.

Separa tus respuestas con saltos de línea.

Texto:
"""${text}"""`
}
export function Principle2_tactic1_ex2(text){
  return `Tu tarea es realizar las siguientes acciones:
  1 - Resumir el siguiente texto delimitado por <>
  en una sola oración.
  2 - Traducir el resumen al francés.
  3 - Enumerar cada nombre en el resumen en francés.
  4 - Generar un objeto JSON que contenga las siguientes claves: french_summary, num_names.
  
  Utiliza el siguiente formato:
  Texto: <texto a resumir>
  Resumen: <resumen>
  Traducción: <traducción del resumen>
  Nombres: <lista de nombres en el resumen en francés>
  Salida JSON: <JSON con el resumen y num_names>
  
  Texto: <${text}>`
  }