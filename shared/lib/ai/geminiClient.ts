import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameType, Difficulty, GameContent, Language } from "../game/types";

// #region Schemas
const quizSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    quizData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          explanation: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                text: { type: Type.STRING },
                isCorrect: { type: Type.BOOLEAN },
              },
              required: ["id", "text", "isCorrect"]
            }
          }
        },
        required: ["id", "question", "options", "explanation"]
      }
    }
  },
  required: ["title", "description", "quizData"]
};

const escapeRoomSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    escapeRoomData: {
      type: Type.OBJECT,
      properties: {
        startSceneId: { type: Type.STRING },
        scenes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              itemFound: { type: Type.STRING, nullable: true },
              choices: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    nextSceneId: { type: Type.STRING },
                    requiredItem: { type: Type.STRING, nullable: true }
                  },
                  required: ["text", "nextSceneId"]
                }
              }
            },
            required: ["id", "title", "description", "choices"]
          }
        },
      },
      required: ["startSceneId", "scenes"]
    }
  },
  required: ["title", "description", "escapeRoomData"]
};
// #endregion

export const generateGame = async (
  text: string, 
  type: GameType, 
  difficulty: Difficulty,
  language: Language
): Promise<GameContent> => {
  
  if (!process.env.API_KEY) {
    throw new Error("API_KEY не найден. Проверьте настройки окружения.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-2.5-flash'; 

  const langInstruction = language === 'ru' 
    ? "Язык контента: РУССКИЙ (Russian)." 
    : "Content Language: ENGLISH.";

  const systemInstruction = `
    You are a Senior EdTech Game Designer.
    Goal: Transform boring educational text into an engaging game.
    
    Rules:
    1. ${langInstruction}
    2. IMPORTANT: JSON Keys must remain in English (e.g., "title", "question", "options"). Only the VALUES should be in the target language.
    3. Tone: Professional but engaging.
    4. Follow the JSON schema strictly.
    5. Difficulty Level: ${difficulty}.
    
    If the text is too short, hallucinate plausible educational context based on the keywords.
  `;

  let prompt = "";
  let schema: Schema | undefined;

  // #region Prompt Engineering
  if (type === GameType.Quiz) {
    prompt = `
    Analyze the text and create a Quiz with 5-7 questions.
    - Questions must test understanding, not just memory.
    - Options must have good distractors.
    - Include an explanation for the correct answer.
    
    Source Text: ${text.substring(0, 15000)}`; 
    schema = quizSchema;
  } else if (type === GameType.EscapeRoom) {
    prompt = `
    Create a Text-Based Escape Room / Adventure based on the material.
    - Player starts in a situation related to the topic.
    - Solving problems requires applying knowledge from the text.
    - Create at least 5 linked scenes.
    - Include inventory items if relevant.
    - Create bad endings for wrong choices.
    
    Source Text: ${text.substring(0, 15000)}`;
    schema = escapeRoomSchema;
  } else {
    prompt = `Create an educational simulation based on: ${text.substring(0, 15000)}`;
    schema = quizSchema;
  }
  // #endregion

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4, 
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from AI");

    const parsedData = JSON.parse(jsonText);
    
    return { ...parsedData, type };

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error(language === 'ru' 
      ? "Ошибка генерации. Попробуйте еще раз." 
      : "Generation error. Please try again.");
  }
};