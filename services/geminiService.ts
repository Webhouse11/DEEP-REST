
import { GoogleGenAI, Type } from "@google/genai";
import { Post, Category } from "../types";

export const generateDailyArticle = async (apiKey: string): Promise<Partial<Post>> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const categories = Object.values(Category);
  const selectedCategory = categories[Math.floor(Math.random() * categories.length)];

  const prompt = `Write a high-quality, SEO-optimized blog post for "DeepRest Journal".
  Topic: ${selectedCategory}
  Target Audience: Professionals and parents.
  Tone: Empathetic, calm, non-clinical, evidence-informed.
  Length: 800-1000 words.
  Include: SEO Title (max 60 chars), Meta Description (max 160 chars), 3-5 keywords, and 3-4 structured HTML sections using H2 and H3 tags.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          slug: { type: Type.STRING },
          summary: { type: Type.STRING },
          content: { type: Type.STRING },
          seoTitle: { type: Type.STRING },
          metaDescription: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["title", "slug", "summary", "content", "seoTitle", "metaDescription", "keywords"]
      }
    }
  });

  const data = JSON.parse(response.text);
  
  return {
    ...data,
    id: Date.now().toString(),
    category: selectedCategory,
    author: "AI Health Editor",
    date: new Date().toISOString(),
    imageUrl: `https://picsum.photos/seed/${Date.now()}/1200/800`,
    altText: `Image representing ${data.title}`,
    canonicalUrl: `https://deeprestjournal.com/${data.slug}`
  };
};
