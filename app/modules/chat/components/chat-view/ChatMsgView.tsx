"use client";

import React, { useState, useEffect } from "react";
import { useAiModels } from "@/app/modules/hooks/useAiModels";
import PromptSuggestions from "./PromptSuggestions";
import ChatInput from "./ChatInput";

// ============================================================================
// WELCOME HEADER (SUB-COMPONENT)
// Displays personalized greeting and the active AI model badge
// ============================================================================
function WelcomeHeader({ firstName, selectedModel }: any) {
  return (
    <div className="text-center space-y-2 max-w-xl mx-auto">
      {/* Active Model Indicator Pill */}
      {selectedModel && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-xs text-muted-foreground mb-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Model:</span>
          <span className="font-semibold text-foreground">
            {selectedModel.name?.replace(/\(free\)/i, "")}
          </span>
        </div>
      )}

      {/* Welcome Title */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        Welcome back,{" "}
        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {firstName}
        </span>
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        How can I assist you with your projects and ideas today?
      </p>
    </div>
  );
}

// ============================================================================
// MAIN CHAT VIEW (MASTER CONTAINER)
// Coordinates AI models data, input state, and renders the modular components
// ============================================================================
export default function ChatMsgView({ initialUser }: any) {
  // Extract user's first name
  const firstName = initialUser?.name ? initialUser.name.split(" ")[0] : "there";

  // 1. Fetch AI models via React Query hook
  const { data: models, isPending } = useAiModels();

  // 2. State for the currently selected AI model
  const [selectedModel, setSelectedModel] = useState<any>(null);

  // Automatically default to the first model once models are loaded
  useEffect(() => {
    if (!selectedModel && models?.models?.length > 0) {
      setSelectedModel(models.models[0]);
    }
  }, [models, selectedModel]);

  // 3. State for chat message input
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Sending prompt to:", selectedModel?.id, input);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-b from-primary/5 via-primary/0 to-transparent blur-3xl pointer-events-none" />

      {/* Main Center Area: Greeting + Starter Suggestions */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl w-full mx-auto text-center z-10 overflow-y-auto">
        <WelcomeHeader firstName={firstName} selectedModel={selectedModel} />
        <PromptSuggestions onSelectPrompt={(text: string) => setInput(text)} />
      </div>

      {/* Bottom Area: Input Area with Embedded Model Selector */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        models={models}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        isPending={isPending}
      />
    </div>
  );
}