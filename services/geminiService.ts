import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { HistoricalScene } from "../types";

// This function gets the API key from the browser's session storage and initializes the AI client.
// It's called by every function that needs to talk to the API.
const getGenAIClient = (): GoogleGenAI => {
    const apiKey = sessionStorage.getItem('gemini-api-key');
    if (!apiKey) {
        // This error is caught by the error handler below.
        throw new Error("API key not found. Please set it in the app.");
    }
    return new GoogleGenAI({ apiKey });
};

// This is a wrapper to handle API errors in one place.
const withApiErrorHandling = async <T>(apiCall: () => Promise<T>): Promise<T> => {
    try {
        return await apiCall();
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            const errorMessage = (error as { message: string }).message;
            if (/API key|authentication|UNAUTHENTICATED/i.test(errorMessage)) {
                throw new Error("Authentication Error: Your API key is invalid. Please check it and try again.");
            }
        }
        console.error("Gemini API Error:", error);
        throw new Error("The AI failed to process the request. It might be busy or an error occurred. Please try again.");
    }
};

export const analyzeImageForFace = (imageBase64: string, mimeType: string): Promise<boolean> =>
    withApiErrorHandling(async () => {
        const ai = getGenAIClient();
        const model = 'gemini-2.5-flash';
        const prompt = 'Does this image prominently feature a human face, looking mostly towards the camera? Answer with only "YES" or "NO".';

        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    { inlineData: { data: imageBase64, mimeType } },
                    { text: prompt }
                ]
            }
        });

        const text = response.text.trim().toUpperCase();
        return text.includes('YES');
    });

export const generateImageFromPrompt = (prompt: string): Promise<string | null> =>
    withApiErrorHandling(async () => {
        const ai = getGenAIClient();
        const model = 'gemini-2.5-flash-image';

        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return null;
    });

export const generatePortraitFromPrompt = (prompt: string): Promise<string | null> => {
    const fullPrompt = `${prompt}. This should be a clear, front-facing portrait. The face should be well-lit and unobstructed. The style should be photorealistic.`;
    return generateImageFromPrompt(fullPrompt);
};

export const generateRandomPortrait = (): Promise<string | null> => {
    const randomPrompt = `A clear, front-facing, photorealistic portrait of a randomly generated, fictional adult person over 21 years old. The face should be well-lit and unobstructed. The person can be of any gender and ethnicity, with unique, interesting features.`;
    return generateImageFromPrompt(randomPrompt);
}

export const generateRandomScenes = async (): Promise<HistoricalScene[]> =>
    withApiErrorHandling(async () => {
        const ai = getGenAIClient();
        const model = 'gemini-2.5-flash';
        const ideasPrompt = 'Generate a JSON array of 9 unique and visually interesting historical or fantasy scene ideas for a photo background. Each object in the array should have two keys: "name" (a short, catchy title like "Viking Fjord" or "Atlantis Underwater") and "imagePrompt" (a detailed, descriptive prompt for an AI image generator to create a photorealistic background scene).';
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [{ text: ideasPrompt }] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            imagePrompt: { type: Type.STRING },
                        },
                        required: ['name', 'imagePrompt'],
                    },
                },
            },
        });

        const sceneIdeas = JSON.parse(response.text.trim()) as { name: string; imagePrompt: string }[];
        if (!sceneIdeas || sceneIdeas.length === 0) {
            throw new Error("Failed to generate scene ideas.");
        }

        const imagePromises = sceneIdeas.map(idea => generateImageFromPrompt(idea.imagePrompt));
        const imageResults = await Promise.all(imagePromises);

        const createMergePrompt = (sceneName: string) => `Change the background of the person in this image to a detailed, photorealistic scene of ${sceneName}. The lighting on the person should match the new background. The final image should look like a real photograph taken in that location.`;

        const generatedScenes = sceneIdeas.map((idea, index) => {
            const imageBase64 = imageResults[index];
            if (!imageBase64) { return null; }
            return {
                id: `${idea.name.replace(/\s+/g, '-')}-${Date.now()}-${index}`,
                name: idea.name,
                imageUrl: `data:image/jpeg;base64,${imageBase64}`,
                prompt: createMergePrompt(idea.name),
            };
        }).filter((scene): scene is HistoricalScene => scene !== null);

        if (generatedScenes.length === 0) {
            throw new Error("Failed to generate any scene images.");
        }

        return generatedScenes;
    });


export const generateTimeTravelImage = (imageBase64: string, mimeType: string, prompt: string): Promise<string | null> =>
    withApiErrorHandling(async () => {
        const ai = getGenAIClient();
        const model = 'gemini-2.5-flash-image';

        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    { inlineData: { data: imageBase64, mimeType } },
                    { text: prompt }
                ]
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }

        return null;
    });
