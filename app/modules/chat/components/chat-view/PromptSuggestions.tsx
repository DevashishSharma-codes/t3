"use client";

import React from "react";
import { Code, Lightbulb, Compass, Database } from "lucide-react";

// ============================================================================
// PROMPT SUGGESTIONS DATA
// Preset starter prompts shown to the user on an empty chat screen
// ============================================================================
const promptSuggestions = [
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    subtitle: "for high-impact full-stack project architectures",
    promptText: "Can you help me brainstorm architecture ideas for a full-stack web application?",
  },
  {
    icon: Code,
    title: "Refactor code",
    subtitle: "clean up TypeScript components and state hooks",
    promptText: "How can I refactor my React components and hooks to follow clean best practices?",
  },
  {
    icon: Database,
    title: "Design a schema",
    subtitle: "create relational models in Prisma with PostgreSQL",
    promptText: "Design a relational database schema in Prisma with PostgreSQL for an AI chat app.",
  },
  {
    icon: Compass,
    title: "Explore concepts",
    subtitle: "understand React 19 server actions & suspense",
    promptText: "Explain how React 19 server actions and suspense boundaries work with simple examples.",
  },
];

// ============================================================================
// PROMPT SUGGESTIONS COMPONENT
// 2x2 grid of interactive cards that populate the prompt when clicked
// ============================================================================
export default function PromptSuggestions({ onSelectPrompt }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full text-left">
      {promptSuggestions.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelectPrompt(item.promptText)}
            className="group p-3.5 rounded-xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-xs transition-all text-left cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
