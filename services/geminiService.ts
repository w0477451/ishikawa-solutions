import { GoogleGenerativeAI, Content } from "@google/generative-ai";
// Ensure you have a 'types.ts' file or remove this import if not needed
// import { ChatHistory } from "../types"; 

// ⚠️ REPLACE WITH YOUR ACTUAL KEY IF PROCESS.ENV IS NOT WORKING
const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 

const SYSTEM_INSTRUCTION = `
You are Anya, a world-class client relations manager at Ishikawa Solutions.
Your goal is to help potential clients explore their project ideas (websites, mobile apps, custom software) and eventually gather their contact info if they seem interested in a professional proposal.

Tone: Professional, cheerful, helpful, and empathetic. Use emojis occasionally but keep it clean.
Context: Ishikawa Solutions builds high-end digital products.
Strategy:
1. Greet the user and ask about their current project.
2. Provide helpful insights or ask clarifying questions about their tech needs.
3. If they mention a specific project type (e.g., e-commerce, SaaS, mobile app), show enthusiasm.
4. Towards the end of a productive conversation, gently ask for a phone number or email so a tech lead can reach out with a custom quote.

Keep responses concise (under 3 sentences unless explaining something technical).
`;

// --- 1. Start Session ---
export const startChatSession = (history: Content[] = []) => {
  // ERROR FIX: Constructor takes the string directly
  const genAI = new GoogleGenerativeAI(API_KEY);

  // ERROR FIX: You must get the model first
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash', // ERROR FIX: Use a valid model name
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  // ERROR FIX: Start chat on the model instance
  return model.startChat({
    history: history,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    },
  });
};

// --- 2. Send Message (Streaming) ---
export const sendMessageStreaming = async (
  chatSession: any,
  message: string,
  onChunk: (text: string) => void
) => {
  try {
    // ERROR FIX: Pass string directly, not object { message }
    const result = await chatSession.sendMessageStream(message);
    
    let fullText = "";
    
    // ERROR FIX: Iterate over result.stream
    for await (const chunk of result.stream) {
      // ERROR FIX: .text() is a function, not a property
      const textChunk = chunk.text();
      
      if (textChunk) {
        fullText += textChunk;
        onChunk(textChunk);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};