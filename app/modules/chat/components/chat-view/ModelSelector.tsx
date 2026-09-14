"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, Check, Search } from "lucide-react";

// ============================================================================
// MODEL SELECTOR COMPONENT
// A dropdown menu to search and select from available free AI models
// ============================================================================
export default function ModelSelector({
  models,
  selectedModel,
  onSelectModel,
  isPending,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const modelList = models?.models || [];

  // Filter models based on search query
  const filteredModels = modelList.filter(
    (m: any) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block">
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 bg-card hover:bg-muted text-xs font-medium cursor-pointer transition-colors shadow-xs"
      >
        <Sparkles className="size-3.5 text-primary shrink-0" />
        <span className="max-w-[150px] truncate text-foreground">
          {isPending
            ? "Loading models..."
            : selectedModel?.name?.replace(/\(free\)/i, "") || "Select Model"}
        </span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
          FREE
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
      </button>

      {/* Dropdown Popover List */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-80 max-h-80 bg-popover border border-border rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
          {/* Search Box */}
          <div className="p-2 border-b border-border bg-muted/30">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full pl-8 pr-2 py-1.5 text-xs bg-background rounded-lg border border-border outline-none focus:border-primary text-foreground"
              />
            </div>
          </div>

          {/* List of Models */}
          <div className="overflow-y-auto p-1 max-h-60">
            {filteredModels.length === 0 ? (
              <p className="text-xs text-muted-foreground p-3 text-center">
                No models found
              </p>
            ) : (
              filteredModels.map((m: any) => {
                const isSelected = selectedModel?.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onSelectModel(m);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer hover:bg-muted transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className="truncate font-medium">
                        {m.name?.replace(/\(free\)/i, "")}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {m.id}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="size-3.5 text-primary shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
