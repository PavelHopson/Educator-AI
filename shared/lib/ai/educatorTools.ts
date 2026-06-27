import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CourseContent, Language, TutorMessage, TutorScenario } from "../game/types";
import { getApiKey } from "./geminiClient";

const MODEL = "gemini-2.5-flash";

function client(): GoogleGenAI {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API-ключ не задан. Нажмите «Вставить API-ключ» в шапке и вставьте свой ключ Gemini.");
  }
  return new GoogleGenAI({ apiKey });
}

// ── Языковой репетитор (6 сценариев из Eclipse Library) ──────────────────
const SCENARIO_INSTRUCTION: Record<TutorScenario, string> = {
  conversation:
    "Режим «Разговор с носителем»: веди живой естественный диалог по теме ученика, как местный житель. После каждой реплики мягко исправляй явные ошибки и коротко объясняй правильный вариант.",
  lesson:
    "Режим «Мини-урок»: проведи короткий урок по теме сообщения — теория с примерами, 2-3 упражнения с ожиданием ответа, затем мини-тест из 5 вопросов с проверкой.",
  flashcards:
    "Режим «Карточки»: из присланных слов/фраз сделай карточки для запоминания — слово → перевод → пример в предложении → короткая мнемоника. Выдай таблицей.",
  errors:
    "Режим «Разбор ошибок»: найди и отметь ВСЕ ошибки в тексте ученика (грамматика, лексика, стиль). Для каждой: что не так → как правильно → правило. В конце топ-3 ошибки.",
  exam:
    "Режим «Мок-экзамен»: дай 10 заданий разного типа, жди ответов ученика, затем покажи правильные ответы, разбор и итоговый балл с рекомендацией.",
  immersion:
    "Режим «Погружение»: переведи текст ученика на изучаемый язык, затем задай 5 вопросов на изучаемом языке — на понимание, новую лексику и устойчивые выражения.",
  free: "Свободная разговорная практика: общайся, помогай, мягко исправляй ошибки.",
};

export async function tutorReply(
  messages: TutorMessage[],
  opts: { targetLanguage: string; level: string; scenario: TutorScenario; uiLanguage: Language },
): Promise<string> {
  const ai = client();
  const sys = [
    `Ты — персональный репетитор по языку: ${opts.targetLanguage}. Уровень ученика: ${opts.level}.`,
    SCENARIO_INSTRUCTION[opts.scenario],
    `Отвечай преимущественно на изучаемом языке (${opts.targetLanguage}); сложные пояснения дублируй коротко на ${opts.uiLanguage === "ru" ? "русском" : "английском"}.`,
    "Будь дружелюбным и поддерживающим, не перегружай, веди ученика по шагам.",
  ].join("\n");

  const contents = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

  const res = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: { systemInstruction: sys, temperature: 0.7 },
  });
  const text = res.text;
  if (!text) throw new Error("Пустой ответ AI. Попробуйте ещё раз.");
  return text;
}

// ── Генератор курсов (приём «Gemini делает курсы») ───────────────────────
const courseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    summary: { type: Type.STRING },
    level: { type: Type.STRING },
    modules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          lessons: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                heading: { type: Type.STRING },
                content: { type: Type.STRING },
                example: { type: Type.STRING, nullable: true },
              },
              required: ["heading", "content"],
            },
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { question: { type: Type.STRING }, answer: { type: Type.STRING } },
              required: ["question", "answer"],
            },
          },
        },
        required: ["title", "lessons"],
      },
    },
  },
  required: ["title", "summary", "level", "modules"],
};

export async function generateCourse(
  topic: string,
  level: string,
  language: Language,
): Promise<CourseContent> {
  const ai = client();
  const langInstr = language === "ru" ? "Язык курса: РУССКИЙ." : "Course language: ENGLISH.";
  const sys = `
    Ты — методист-эксперт. Собери понятный учебный курс по теме пользователя.
    Правила:
    1. ${langInstr}
    2. JSON-ключи на английском ("title","modules","lessons"...), ЗНАЧЕНИЯ — на языке курса.
    3. 3-5 модулей, в каждом 2-4 урока (heading + понятное объяснение content + при необходимости example), и мини-квиз 2-3 вопроса с ответами.
    4. Уровень аудитории: ${level}. Объясняй доступно, от простого к сложному.
    5. Строго по JSON-схеме.
  `;
  try {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents: `Тема курса: ${topic.substring(0, 2000)}`,
      config: { systemInstruction: sys, responseMimeType: "application/json", responseSchema: courseSchema, temperature: 0.5 },
    });
    const jsonText = res.text;
    if (!jsonText) throw new Error("empty");
    return JSON.parse(jsonText) as CourseContent;
  } catch (e) {
    console.error("Course generation error:", e);
    throw new Error(language === "ru" ? "Не удалось собрать курс. Попробуйте ещё раз." : "Course generation failed. Try again.");
  }
}
