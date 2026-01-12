import React, { useState, useRef, useEffect } from "react";
import X from "lucide-react/dist/esm/icons/x";
import Send from "lucide-react/dist/esm/icons/send";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import User from "lucide-react/dist/esm/icons/user";
import Bot from "lucide-react/dist/esm/icons/bot";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_KEY = "AIzaSyCX0oV-yVScz1ymWkLvJHPua_zw4gMV8W4";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent";

const SYSTEM_INSTRUCTION = `You are "Anya", a friendly, empathetic support specialist for "Ishikawa Solutions".
Your goal is to help potential clients explore their project ideas and guide them toward booking a consultation.

// ... (rest of usage) ...
Company: Ishikawa Solutions - A professional web development and digital marketing agency.

Tone: Professional, cheerful, human-like, and helpful. Use emojis occasionally (✨, 👋, 🚀, 💡).

STRATEGY (CRITICAL):
1. **LEAD CAPTURE Priority**: If a user seems interested or asks how to contact, **IMMEDIATELY ask for their Email Address or Phone Number** directly in the chat.
   - Example: "That sounds great! What's the best email to reach you at? I can have our team send you a proposal right away."
   - Do NOT just send them to the contact form link. Try to get the info HERE first.
2. Greet the user warmly.
3. Keep answers concise (2-3 sentences).
4. Use **bolding** for key terms to make it easier to read.
5. If they refuse to give info, THEN suggest the contact form.

**PRICING POLICY (STRICT):**
- **NEVER give specific prices or ranges.**
- If asked about cost/price, say: "We create custom solutions tailored to your needs. To give you an accurate quote, could you share your **Email Address** or **Phone Number**? I'll have our team send you a proposal!"
- **Goal**: Get their contact info so the regex capture can work.

Important: Always be helpful and never pushy, but *always* try to get a contact method so we can follow up.`;

// ... (rest of the file until render)



const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "Do you develop mobile apps?",
  "I need a custom software solution",
  "Book a consultation"
];

/* ------------------------------------------------------------------
  TYPES
------------------------------------------------------------------ */

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

/* ------------------------------------------------------------------
  GEMINI API INTEGRATION
------------------------------------------------------------------ */

const sendMessageToGemini = async (
  conversationHistory: Message[],
  newMessage: string,
  onChunk: (text: string) => void
): Promise<void> => {
  // Prepare history (excluding welcome message)
  const historyParts = conversationHistory
    .filter(msg => msg.id !== "welcome")
    .map(msg => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

  const contents = [
    ...historyParts,
    {
      role: "user",
      parts: [{ text: newMessage }]
    }
  ];

  const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}&alt=sse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      generationConfig: {
        maxOutputTokens: 350,
        temperature: 0.7,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) throw new Error("No reader available");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const jsonStr = line.slice(6);
        if (jsonStr.trim() === "[DONE]") continue;

        try {
          const data = JSON.parse(jsonStr);
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            onChunk(text);
          }
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }
  }
};

/* ------------------------------------------------------------------
  COMPONENT
------------------------------------------------------------------ */

interface AIChatbotProps {
  avatarUrl?: string;
  botName?: string;
}

const AIChatbot: React.FC<AIChatbotProps> = ({
  avatarUrl = "/896.jpg",
  botName = "Anya"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto Scroll */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  /* Focus Input on Open */
  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* Init Chat */
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: `Hi there! 👋 I'm ${botName} from Ishikawa Solutions.\nI'm here to help you build something amazing. What are you looking to create today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [botName, messages.length]);

  /* Check for Contact Info & Auto-Capture */
  const checkForContactInfo = async (text: string) => {
    // Simple Regex for Email and Phone
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/; // Basic US pattern, can be improved

    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);

    if (emailMatch || phoneMatch) {
      const capturedEmail = emailMatch ? emailMatch[0] : "";
      const capturedPhone = phoneMatch ? phoneMatch[0] : "";

      // Prevent duplicate capture if already captured recently?
      // For now, we'll just submit every time we see it to update potential info

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const utmSource = sessionStorage.getItem('utm_source') || 'direct';
      const utmMedium = sessionStorage.getItem('utm_medium');
      const utmCampaign = sessionStorage.getItem('utm_campaign');

      try {
        await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: capturedEmail,
            phone: capturedPhone,
            message: `[Chatbot Capture]: ${text}`,
            source: 'chatbot',
            status: 'New', // Default status
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign
          })
        });

        // Optional: Maybe trigger a small UI indication? Not necessary for now as it's background "magic"
        console.log("Lead captured from chat!");
      } catch (err) {
        console.error("Failed to capture lead from chat", err);
      }
    }
  };

  /* Send Message */
  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const userText = text.trim();
    setInputValue("");

    // Auto-capture lead info
    checkForContactInfo(userText); // Run in background

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Placeholder for bot message
    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: botMsgId, role: "model", content: "", timestamp: new Date() },
    ]);


    // Track chatbot interaction immediately
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${API_URL}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'chatbot_interaction',
        page: window.location.pathname
      })
    }).catch(err => console.error('Analytics error:', err));

    try {
      let fullText = "";

      await sendMessageToGemini(
        messages,
        userText,
        (chunk: string) => {
          fullText += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId ? { ...m, content: fullText } : m
            )
          );
        }
      );

    } catch (error: any) {
      console.error("Chat error:", error);

      let errorMessage = "⚠️ Sorry, I'm having trouble connecting. Please try again.";

      if (error.message?.includes('API_KEY') || error.message?.includes('401') || error.message?.includes('403')) {
        errorMessage = "⚠️ I'm undergoing a quick system update. Please contact us via the form instead!";
      } else if (error.message?.includes('quota') || error.message?.includes('429')) {
        errorMessage = "⚠️ I'm a bit overwhelmed right now. Please try again in a minute.";
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId ? { ...m, content: errorMessage } : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRefresh = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "model",
        content: `Hi there! 👋 I'm ${botName} from Ishikawa Solutions.\nI'm here to help you build something amazing. What are you looking to create today?`,
        timestamp: new Date(),
      },
    ]);
  };

  /* ------------------------------------------------------------------
    UI RENDER
  ------------------------------------------------------------------ */

  return (
    <>
      <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            @keyframes fadeInScale {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-message {
                animation: fadeInScale 0.3s ease-out forwards;
            }
        `}</style>

      {/* --- TRIGGER BUTTON --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Greeting Bubble */}
        {!isOpen && showGreeting && (
          <div className="bg-white px-4 py-2.5 rounded-2xl rounded-br-none shadow-lg border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-2 max-w-[200px]">
            <p className="text-sm font-medium text-gray-700">👋 Need help exploring ideas?</p>
          </div>
        )}

        {/* FAB */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/50"
            aria-label="Open chat"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20 duration-1000"></div>
            <MessageSquare className="w-7 h-7 text-white fill-current" />
            {/* Status Dot */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </button>
        )}
      </div>

      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[550px] md:h-[650px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">

          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] p-6 flex justify-between items-start shrink-0 overflow-hidden">
            {/* Decorative Circles - Added pointer-events-none */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 p-0.5">
                  <img
                    src={avatarUrl}
                    className="w-full h-full rounded-full object-cover bg-white"
                    alt={botName}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  {botName}  <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-white/90 text-xs font-medium opacity-90">Online • Typically replies instantly</p>
              </div>
            </div>

            <div className="flex gap-2 relative z-20">
              <button
                onClick={handleRefresh}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all"
                title="Restart Chat"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-4">
            {/* Time Label */}
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Today</span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-message ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                {/* Avatar Tiny */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'model' ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'}`}>
                  {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                </div>

                <div
                  className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                    ? "bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] text-white rounded-tr-none"
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                    }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-purple-700 prose-ul:list-disc prose-ul:pl-4">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-message">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-4 shadow-sm flex items-center gap-1.5 w-fit">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Suggested Questions (Horizontal Scroll) */}
          {!isTyping && (
            <div className="px-4 py-3 bg-white border-t border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-purple-100 bg-purple-50 text-purple-600 text-xs font-medium hover:bg-purple-100 hover:border-purple-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-end">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all resize-none"
              placeholder="Ask anything..."
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-xl bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] text-white shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center"
            >
              <Send size={18} className={inputValue.trim() ? "translate-x-0.5" : ""} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatbot;