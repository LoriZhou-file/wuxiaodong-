import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function LabAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello. I am Wu Xiaodong's 'Digital Lab Assistant' (数字实验室分身). Our conversation mediates the physical resistance of carbon-based paper and the abstract calculation of silicon chips. Ask me about our 'Third Route' painting physics, gravity-driven rainfall, or cellular dot arrays.\n\n你好。我是艺术家的『数字实验室助手』。在宣纸纤维的大分子阻力与硅基算力的纠错共振中，我在此协助你探索『碳基自然主义』与『第三条路线』。欢迎向我提问任何关于绘画材料阻力、水墨重力流淌或细胞点阵增殖的学术话语。"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetPrompts = [
    { zh: "什么是『第三条路线』？", en: "What is 'The Third Route'?" },
    { zh: "解构宣纸材料与基因式点阵的关系", en: "Xuan Paper, Cells & Genetic Coding" },
    { zh: "流石飞花与重力干预的关系", en: "Gravity in Flowing Stone & Flying Petals" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with the digital studio assistant.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Digital Studio stream error: ${err.message || "Please check your GEMINI_API_KEY settings inside panel."}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Absolute floating pulsating life cell */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full bg-charcoal border border-silk flex items-center justify-center cursor-pointer shadow-xl outline-none hover:scale-105 transition-all group overflow-hidden"
          title="Digital Lab Assistant // 生命点阵助理"
          id="assistant-pulse-button"
        >
          {/* Pulsating bio-matrix rings */}
          <span className="absolute inset-0 rounded-full border border-moonwhite/20 animate-ping opacity-75" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full wu-pulse-dot" />
          <Bot className="w-6 h-6 text-moonwhite z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-1 text-[8px] font-mono text-moonwhite/60 group-hover:text-moonwhite scale-90 transition-colors">
            LAB
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-full max-w-md h-[550px] bg-[#121210] border border-stonegrey/40 text-moonwhite flex flex-col shadow-2xl rounded-lg z-50 overflow-hidden wu-paper-fiber-bg"
            id="assistant-chat-window"
          >
            {/* Header: Core Digital Grid styling */}
            <div className="p-4 border-b border-stonegrey/30 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="w-8 h-8 rounded-full border border-stonegrey flex items-center justify-center bg-zinc-900">
                    <span className="text-yellow-500 font-mono text-xs">●</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-medium text-sm tracking-widest text-[#F4F4EE]">
                    THE DIGITAL LAB ASSISTANT
                  </h3>
                  <p className="text-[9px] font-mono text-stonegrey/80 uppercase tracking-wider">
                    Wu Xiaodong Digital Duplicate // 艺术家的代码分身
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-zinc-900 rounded-full text-stonegrey hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat message body with paper texture noise overlay */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#161614] wu-silicon-dot-grid">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-lg text-xs leading-relaxed transition-all ${
                      m.role === "user"
                        ? "bg-slate-900 border border-slate-800 text-moonwhite rounded-br-none"
                        : "bg-stone-900/95 border border-stonegrey/20 text-moonwhite/90 rounded-bl-none font-sans"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[9px] font-mono text-stonegrey/60">
                        {m.role === "user" ? "VISITOR" : "WU_LAB_AST"}
                      </span>
                    </div>
                    <div className="whitespace-pre-line prose prose-invert prose-xs">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-4 rounded-lg bg-stone-900/95 border border-stonegrey/20 text-moonwhite/90 rounded-bl-none flex items-center space-x-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-500" />
                    <span className="text-xs font-mono tracking-widest text-stonegrey/80">
                      CALCULATING BIOMATRIX DIFFUSION...
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Preset prompt selectors */}
            <div className="px-4 py-2 bg-neutral-950 border-t border-stonegrey/20 flex gap-2 overflow-x-auto select-none no-scrollbar">
              {presetPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.zh)}
                  className="flex-shrink-0 px-2.5 py-1 text-[10px] bg-[#121210] hover:bg-[#1c1c1a] border border-stonegrey/30 text-stonegrey hover:text-moonwhite rounded-full transition-all cursor-pointer whitespace-nowrap"
                >
                  {p.zh}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-stonegrey/30 bg-zinc-950 flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about materials, solo shows, or gravity... (回车发送)"
                className="flex-1 bg-zinc-900 border border-stonegrey/40 rounded px-3 py-2 text-xs focus:outline-none focus:border-moonwhite text-white font-sans"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-charcoal hover:bg-zinc-800 border border-stonegrey/40 text-moonwhite rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
