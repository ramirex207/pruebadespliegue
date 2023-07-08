import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export default async function (req, res) {
  const animal = req.body.animal || '';
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
      max_tokens: 150,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
   res.status(500).json({ error: error.message });
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `asume el rol de comediante especializado en chistes informaticos y crea un chiste con la entrada del usuario.

user: javascript
joke: como se llama el lenguaje de programacion de los gatos, miuwscript
user: ${capitalizedAnimal}
joke:`;
}
