import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function checkImageMatch({ title, description, imageBase64 }) {
  try {
    const prompt = `Instructions: You are a moderator. 
      Check if the provided image matches the following event description.
      Description: ${description}
      
      If the image is relevant to the description, reply with "MATCH".
      If the image is unrelated, fake, or completely different from what is described, reply with "NOT MATCH".
      Answer ONLY with "MATCH" or "NOT MATCH"`;

    const image = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text().trim().toUpperCase();

    return text.includes("NOT MATCH") ? "NOT MATCH" : "MATCH";
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("AI service failed");
  }
}
