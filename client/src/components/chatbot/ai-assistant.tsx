import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { askAiAssistant } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { getUserPreferencesContext } from "@/lib/user-preferences";

interface Message {
  isBot: boolean;
  text: string;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      isBot: true, 
      text: "Hello! I'm your Hanoi Climate AI Assistant. Ask me anything about Hanoi's weather, climate, air quality, or environmental conditions."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const askAiMutation = useMutation({
    mutationFn: (question: string) => {
      // Get user preferences context if available
      const preferencesContext = getUserPreferencesContext();
      return askAiAssistant(question, preferencesContext);
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, { isBot: true, text: data.answer }]);
    },
    onError: () => {
      setMessages(prev => [...prev, { 
        isBot: true, 
        text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
      }]);
    }
  });

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || askAiMutation.isPending) return;
    
    // Add user message
    setMessages(prev => [...prev, { isBot: false, text: inputValue }]);
    
    // Send to AI
    askAiMutation.mutate(inputValue);
    
    // Clear input
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sample questions users can ask
  const sampleQuestions = [
    "What's the best time of year to visit Hanoi?",
    "How is climate change affecting Hanoi?",
    "How can I protect myself from air pollution?",
    "What should I wear during monsoon season?",
    "What are the best indoor activities on hot days?",
  ];

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-border">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot 
                  ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600' 
                  : 'bg-primary-100 dark:bg-primary-900 text-gray-800 dark:text-gray-100'
              }`}
            >
              {message.isBot && (
                <div className="flex items-center mb-1">
                  <span className="material-icons text-primary-500 text-sm mr-1">smart_toy</span>
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Hanoi Climate AI</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">
                {askAiMutation.isPending && index === messages.length - 1 ? (
                  <BotTypingAnimation />
                ) : (
                  message.text
                )}
              </p>
            </div>
          </div>
        ))}
        {askAiMutation.isPending && messages[messages.length - 1]?.isBot === false && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center mb-1">
                <span className="material-icons text-primary-500 text-sm mr-1">smart_toy</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Hanoi Climate AI</span>
              </div>
              <BotTypingAnimation />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Try asking:</h3>
          <div className="grid grid-cols-1 gap-2">
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-2 text-left text-xs"
                onClick={() => {
                  setInputValue(question);
                  setMessages(prev => [...prev, { isBot: false, text: question }]);
                  askAiMutation.mutate(question);
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border bg-background">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about weather, climate, or environmental conditions..."
            disabled={askAiMutation.isPending}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={inputValue.trim() === "" || askAiMutation.isPending}
          >
            <span className="material-icons">send</span>
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          AI Assistant provides information specific to Hanoi's climate and weather conditions.
        </p>
      </div>
    </div>
  );
}

function BotTypingAnimation() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
}