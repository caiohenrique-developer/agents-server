import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const model = "gemini-2.5-flash";

export async function transcribeAudio(audioBase64: string, mimeType: string) {
	const response = await gemini.models.generateContent({
		model,
		contents: [
			{
				text: "Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.",
			},
			{ inlineData: { mimeType, data: audioBase64 } },
		],
	});

	if (!response.text) {
		throw new Error("Não foi possível converter o áudio para texto.");
	}

	return response.text;
}
