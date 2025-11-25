import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Loader2, AlertCircle, Bug, Terminal, Plus, Mic, ExternalLink } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURATION ---
const API_KEY = "AIzaSyBftrds9f1MYIrUsVOUs646G6tiGNB9fRE"; 

const ISHIKAWA_KNOWLEDGE_BASE = `
You are a helpful, human-like sales assistant named "Srikhar" for Ishikawa Solutions.
Your goal is to be friendly, concise, and encourage users to book a service.

COMPANY INFO:
Ishikawa Solutions is a digital agency building amazing products.
- Website Development (React, WordPress)
- Custom Software (Bespoke solutions, SaaS)
- Mobile Apps (iOS/Android)
- E-commerce (Shopify, Stripe/Razorpay integrations)

BELIEFS: Honesty, hard work, and delivering more than expected.
TECH STACK: React Js, Node, Figma, Google Analytics, Vite.

RULES:
1. Answer questions based ONLY on the info above.
2. Keep answers short (max 2-3 sentences).
3. Do not say "As an AI". Speak as "We" or "I".
4. LEAD GEN GOAL: If the user asks about pricing, specific services, or "how to start", politely ask for their email address to send a proposal.
`;

// --- TYPES ---
interface ChatMessage {
  id: number;
  sender: 'user' | 'ai' | 'system' | 'debug';
  text: string;
  isError?: boolean;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  useEffect(() => {
    setMessages([
      { 
        id: 1, 
        sender: 'ai', 
        text: 'Hi there! I\'m Srikhar from Ishikawa Solutions. How can I help you grow your business today?' 
      },
    ]);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // FIX: Removed the logic that was blocking your real API key
    if (!API_KEY || API_KEY.includes("YOUR_NEW_API_KEY")) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "system",
        text: "⚠ Missing API Key. Please add your key."
      }]);
      return;
    }

    const userText = input;
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: "user",
      text: userText
    }]);

    setInput("");
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // FIX: Strictly use the standard Flash model. 
      // If this fails with 404, it guarantees the API is OFF, not a model issue.
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const chatHistory = messages
        .filter(m => m.sender !== "system" && m.sender !== "debug")
        .map(m => `${m.sender === "user" ? "User" : "Srikhar"}: ${m.text}`)
        .join("\n");

      const prompt = `${ISHIKAWA_KNOWLEDGE_BASE}

PREVIOUS CHAT:${chatHistory}

USER: ${userText}
SRIKHAR:
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "ai",
        text: aiResponse
      }]);

    } catch (error: any) {
      console.error("Gemini Fatal Error:", error.message);
      
      let friendlyError = "Something went wrong. Please try again.";
      let technicalDetail = error.message;

      // --- SMART ERROR DIAGNOSIS ---
      if (error.message.includes("404") || error.message.includes("not found")) {
        friendlyError = "API NOT ENABLED: Your API Key is valid, but the 'Generative Language API' service is turned OFF in Google Cloud.";
        technicalDetail = "Action Required: Enable the API for your project.";
      } else if (error.message.includes("403") || error.message.includes("key")) {
        friendlyError = "INVALID KEY: Google rejected this API key.";
      } else if (error.message.includes("503") || error.message.includes("overloaded")) {
        friendlyError = "Google Servers are busy. Please try again in 5 seconds.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: "system",
          text: friendlyError,
          isError: true
        }
      ]);

      // If it's the 404 "API Not Enabled" error, show a direct link
      if (error.message.includes("404")) {
         setMessages(prev => [
            ...prev,
            {
               id: Date.now() + 1,
               sender: 'debug',
               text: "Click here to fix: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com"
            }
         ]);
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-4 z-50 w-[350px] md:w-[380px] h-[600px] bg-gradient-to-b from-purple-50 via-white to-pink-50 rounded-[30px] shadow-2xl flex flex-col font-sans border border-white/50 backdrop-blur-sm animate-slide-in overflow-hidden ring-1 ring-black/5">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-md border-b border-white/50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">Ishikawa AI</h3>
                    <p className="text-xs text-gray-500 font-medium">Digital chatbot interface</p>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-6 custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed relative ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-blue-200' 
                      : message.sender === 'system' 
                      ? 'bg-red-50 text-red-600 border border-red-100 font-medium'
                      : message.sender === 'debug'
                      ? 'bg-gray-900 text-blue-400 font-mono text-xs p-3 break-all cursor-pointer hover:bg-black' 
                      : 'bg-white text-gray-700 rounded-tl-none shadow-gray-200 border border-white'
                  }`}>
                  {message.sender === 'system' && <AlertCircle size={16} className="mb-2" />}
                  {message.sender === 'debug' && <ExternalLink size={14} className="mb-1 inline mr-2" />}
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-white">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/60 backdrop-blur-md">
             <div className="flex items-center gap-3">
                {/* Plus Button */}
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 shadow-sm transition-all">
                    <Plus size={20} />
                </button>

                {/* Input Field */}
                <form onSubmit={handleSend} className="flex-grow relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Chat here..."
                        className="w-full h-12 pl-5 pr-12 bg-white rounded-full text-gray-700 placeholder-gray-400 outline-none shadow-sm border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                        disabled={isLoading}
                    />
                    
                    {/* Send / Mic Button */}
                    <div className="absolute right-1 top-1 flex items-center gap-1">
                        {!input.trim() ? (
                            <button type="button" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600">
                                <Mic size={20} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all shadow-md transform hover:scale-105"
                                disabled={isLoading}
                            >
                                <Send size={18} className="ml-0.5" />
                            </button>
                        )}
                    </div>
                </form>
             </div>
          </div>

        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideIn { from { transform: translateY(50px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
      `}</style>
    </>
  );
};

export default AIChatbot;