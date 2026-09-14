"use client";

import React from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import ModelSelector from "./ModelSelector";

// ============================================================================
// CHAT INPUT COMPONENT
// Message textarea, attachment button, ModelSelector pill, and send button
// ============================================================================
export default function ChatInput({
  input,
  setInput,
  onSend,
  models,
  selectedModel,
  onSelectModel,
  isPending,
}: any) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-3xl mx-auto z-10">
      <div className="relative rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20 transition-all p-2">
        {/* Textarea */}
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Assistant... (Enter to send, Shift+Enter for new line)"
          className="w-full resize-none bg-transparent px-3 pt-2 pb-12 text-sm outline-none text-foreground placeholder:text-muted-foreground"
        />

        {/* Bottom Toolbar: Paperclip, Model Selector & Send Button */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Attachment Button */}
            <button
              type="button"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
              title="Attach files"
            >
              <Paperclip className="size-4" />
            </button>

            {/* Model Selector Dropdown */}
            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onSelectModel={onSelectModel}
              isPending={isPending}
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={onSend}
            disabled={!input.trim()}
            className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>

      {/* Safety Disclaimer */}
      <p className="text-[11px] text-center text-muted-foreground/70 mt-2">
        AI generated content can be inaccurate. Verify important information.
      </p>
    </div>
  );
}
