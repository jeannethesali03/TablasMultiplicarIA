import { getRandomElement, correctMessages, incorrectMessages } from '../utils/messages';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const generateAIMessage = async (type) => {
  // Si no hay clave de API, usar los arrays de mensajes
  if (!GEMINI_API_KEY) {
    return getRandomElement(type === 'correct' ? correctMessages : incorrectMessages);
  }

  try {
    const prompt = type === 'correct'
      ? 'Genera un mensaje motivador, breve (máximo 50 caracteres) y divertido para un niño que respondió correctamente una pregunta de multiplicación. Incluye emojis. Solo el mensaje, sin explicaciones.'
      : 'Genera un mensaje motivador, breve (máximo 60 caracteres) y alentador para un niño que respondió incorrectamente una pregunta de multiplicación. Incluye emojis. Solo el mensaje, sin explicaciones.';

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      // Si falla la API, usar los arrays de mensajes
      return getRandomElement(type === 'correct' ? correctMessages : incorrectMessages);
    }

    const data = await response.json();
    const message = data.contents?.[0]?.parts?.[0]?.text;

    return message || getRandomElement(type === 'correct' ? correctMessages : incorrectMessages);
  } catch (error) {
    console.error('Error generating AI message:', error);
    // Fallback a los arrays de mensajes
    return getRandomElement(type === 'correct' ? correctMessages : incorrectMessages);
  }
};

// Importar las constantes para uso directo también
export { correctMessages, incorrectMessages } from '../utils/messages';
