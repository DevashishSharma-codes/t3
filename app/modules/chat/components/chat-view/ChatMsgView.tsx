import React from 'react'
import { ArrowUp, Paperclip, Code, Lightbulb, Compass, Database } from 'lucide-react'
import { currentUser } from '@/app/modules/authentication/actions';

const promptSuggestions = [
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    subtitle: "for high-impact full-stack project architectures"
  },
  {
    icon: Code,
    title: "Refactor code",
    subtitle: "clean up TypeScript components and state hooks"
  },
  {
    icon: Database,
    title: "Design a schema",
    subtitle: "create relational models in Prisma with PostgreSQL"
  },
  {
    icon: Compass,
    title: "Explore concepts",
    subtitle: "understand React 19 server actions & suspense"
  }
];
const ChatMsgView = async () => {
  const user = await currentUser();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  return (

    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Top subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-b from-primary/5 via-primary/0 to-transparent blur-3xl pointer-events-none" />

      {/* Main chat center view */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl w-full mx-auto text-center z-10 overflow-y-auto">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Welcome back, <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{firstName}</span>
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-md">
          How can I assist you with your projects and ideas today?
        </p>

        {/* Suggestion cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full text-left">
          {promptSuggestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                type="button"
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
      </div>

      {/* Bottom Message Input Area */}
      <div className="p-4 sm:p-6 w-full max-w-3xl mx-auto z-10">
        <div className="relative rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20 transition-all p-2">
          <textarea
            rows={2}
            placeholder="Message AI Assistant..."
            className="w-full resize-none bg-transparent px-3 pt-2 pb-10 text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <button
              type="button"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
              title="Attach files"
            >
              <Paperclip className="size-4" />
            </button>
          </div>
          <div className="absolute bottom-2.5 right-3 flex items-center gap-2">
            <button
              type="button"
              className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs cursor-pointer active:scale-95"
              title="Send message"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
        <p className="text-[11px] text-center text-muted-foreground/70 mt-2">
          AI generated content can be inaccurate. Verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatMsgView