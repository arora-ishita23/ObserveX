
// "use client";
// import React, { useState, useRef } from "react";
// import { Mic, X, Square } from "lucide-react";

// const GEMINI_API_KEY =
//   process.env.NEXT_PUBLIC_GEMINI_KEY || "AIzaSyC2-pgU30vIyMeJxAkcfClpK7r413dfb6g";

// const JarvisAssistant: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

//   // Start listening
//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported in this browser");
//       return;
//     }
//     const SpeechRecognition =
//       (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = false;
//     recognitionRef.current.lang = "en-US";

//     recognitionRef.current.onstart = () => setIsListening(true);
//     recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
//       const transcript = event.results[event.results.length - 1][0].transcript.trim();
//       resetSilenceTimer(transcript);
//     };
//     recognitionRef.current.onend = () => setIsListening(false);

//     recognitionRef.current.start();
//   };

//   // Stop listening
//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   // Auto-send after 2s silence
//   const resetSilenceTimer = (text: string) => {
//     if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
//     silenceTimeoutRef.current = setTimeout(() => {
//       sendMessage(text);
//     }, 2000);
//   };

//   // Send query to Gemini
//   const sendMessage = async (text: string) => {
//     if (!text) return;
//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text }] }],
//           }),
//         }
//       );
//       const data = await res.json();
//       let reply =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response";

//       // Limit to 50 words
//       reply = reply.split(/\s+/).slice(0, 50).join(" ");

//       // Speak reply
//       utteranceRef.current = new SpeechSynthesisUtterance(reply);
//       utteranceRef.current.onstart = () => setIsSpeaking(true);
//       utteranceRef.current.onend = () => setIsSpeaking(false);
//       speechSynthesis.speak(utteranceRef.current);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   // Stop speaking
//   const stopSpeaking = () => {
//     speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
//       >
//         {isOpen ? <X /> : <Mic />}
//       </button>

//       {isOpen && (
//         <div className="mt-3 w-[350px] h-[450px] bg-gray-900 text-white rounded-2xl shadow-xl flex flex-col">
//           <div className="p-3 font-bold border-b border-gray-700">🤖 JARVIS Assistant</div>

//           {/* Animated sound waves */}
//           <div className="flex-1 flex items-center justify-center">
//             {isSpeaking ? (
//               <div className="flex space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-2 bg-blue-500 rounded animate-bounce"
//                     style={{
//                       height: `${10 + i * 5}px`,
//                       animationDelay: `${i * 0.1}s`,
//                     }}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-400">Waiting for input...</p>
//             )}
//           </div>

//           <div className="p-3 border-t border-gray-700 flex items-center justify-between">
//             {isListening ? (
//               <button
//                 onClick={stopListening}
//                 className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
//               >
//                 Stop 🎤
//               </button>
//             ) : (
//               <button
//                 onClick={startListening}
//                 className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg"
//               >
//                 Start 🎤
//               </button>
//             )}
//             {isSpeaking && (
//               <button
//                 onClick={stopSpeaking}
//                 className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg flex items-center"
//               >
//                 <Square className="mr-1" size={16} /> Stop Response
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JarvisAssistant;
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, X } from "lucide-react";
import { buildObserveXPrompt, isObserveXRelated } from "./observex_knowledge";

// ---- Types for TS/WebKit SpeechRecognition ----
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}


const GEMINI_API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_KEY || "AIzaSyC2-pgU30vIyMeJxAkcfClpK7r413dfb6g";

// Reusable refusal message (matches system prompt)
const REFUSAL = "I can only assist with ObserveX and its security features.";

const JarvisAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [pendingText, setPendingText] = useState(""); // manual input (optional)
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Safety: warn if no API key
  useEffect(() => {
    if (!GEMINI_API_KEY) {
      console.warn("NEXT_PUBLIC_GEMINI_KEY is not set. Responses will fail.");
    }
  }, []);

  // ---- Speech handling ----
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const SR = window.webkitSpeechRecognition || window.SpeechRecognition;
    const rec: SpeechRecognition = new SR();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onstart = () => setIsListening(true);
    rec.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      resetSilenceTimer(transcript);
    };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // Auto-send after 1.8s of silence
  const resetSilenceTimer = (text: string) => {
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => {
      void sendMessage(text);
    }, 1800);
  };

  // ---- TTS helper ----
  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.0;
      u.pitch = 1.0;
      u.volume = 1.0;
      window.speechSynthesis.cancel(); // stop previous utterances
      window.speechSynthesis.speak(u);
    } catch {
      /* no-op */
    }
  };

  // ---- Core: send to Gemini with ObserveX prompt ----
  const sendMessage = async (userText: string) => {
    const text = (userText || "").trim();
    if (!text) return;

    // Client-side gate (fast UX)
    if (!isObserveXRelated(text)) {
      const next = [
        ...messages,
        { role: "user" as const, text },
        { role: "assistant" as const, text: REFUSAL },
      ];
      setMessages(next);
      speak(REFUSAL);
      return;
    }

    // Build ObserveX-constrained prompt
    const prompt = buildObserveXPrompt(text);

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response";

      const next2 = [...next, { role: "assistant" as const, text: reply }];
      setMessages(next2);
      speak(reply);
    } catch (err) {
      console.error("Gemini error:", err);
      const fail = "Error fetching response";
      const next2 = [...next, { role: "assistant" as const, text: fail }];
      setMessages(next2);
      speak(fail);
    }
  };

  // Optional manual input send
  const onSendClick = () => {
    const t = pendingText.trim();
    setPendingText("");
    void sendMessage(t);
  };

  // Stop TTS when panel closes
  useEffect(() => {
    if (!isOpen) {
      try {
        window.speechSynthesis.cancel();
      } catch { /* no-op */ }
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {/* Toggle FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
        aria-label={isOpen ? "Close ObserveX Assistant" : "Open ObserveX Assistant"}
      >
        {isOpen ? <X /> : <Mic />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="mt-3 w-[360px] h-[520px] bg-gray-900 text-white rounded-2xl shadow-xl flex flex-col">
          <div className="p-3 font-semibold border-b border-gray-800 flex items-center justify-between">
            <span>🤖 ObserveX Assistant</span>
            <span className="text-xs opacity-70">ObserveX-only</span>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] leading-relaxed ${
                  m.role === "user"
                    ? "bg-blue-600 ml-auto text-right"
                    : "bg-gray-700 mr-auto text-left"
                }`}
              >
                {m.text}
              </div>
            ))}
            {isListening && (
              <div className="text-xs opacity-70">Listening… speak your question.</div>
            )}
          </div>

          {/* Controls */}
          <div className="p-3 border-t border-gray-800 space-y-2">
            <div className="flex gap-2">
              <input
                value={pendingText}
                onChange={(e) => setPendingText(e.target.value)}
                placeholder="Ask about ObserveX…"
                className="flex-1 bg-gray-800 rounded-lg px-3 py-2 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSendClick();
                }}
              />
              <button
                onClick={onSendClick}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg"
              >
                Send
              </button>
            </div>

            <div className="flex items-center justify-between">
              {isListening ? (
                <button
                  onClick={stopListening}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
                >
                  Stop 🎤
                </button>
              ) : (
                <button
                  onClick={startListening}
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg"
                >
                  Start 🎤
                </button>
              )}
              <span className="text-[10px] opacity-60">
                Powered by Gemini • Scoped to ObserveX
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JarvisAssistant;
