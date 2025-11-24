import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, IMAGE_GENERATION_PROMPT_PREFIX, IMAGE_GENERATION_STYLE } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
};

export interface AnalysisResult {
  text: string;
  image?: string;
}

export const analyzeTopic = async (topic: string): Promise<string> => {
  const ai = getClient();
  // Using gemini-3-pro-preview for complex reasoning tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `${SYSTEM_PROMPT} ${topic}`,
    config: {
        thinkingConfig: { thinkingBudget: 2048 } // Allow some thinking for complex analysis
    }
  });
  
  return response.text || "No analysis generated.";
};

export const generateTopicImage = async (topic: string): Promise<string | null> => {
  const ai = getClient();
  const prompt = `${IMAGE_GENERATION_PROMPT_PREFIX}${topic}${IMAGE_GENERATION_STYLE}`;

  try {
    // Using gemini-2.5-flash-image for image generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        // Nano banana models don't support responseMimeType
      }
    });

    // Extract image from response
    for (const candidate of response.candidates || []) {
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
             return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null; 
  }
};
