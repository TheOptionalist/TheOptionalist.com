"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AssistantLink, AssistantReply } from "@/lib/assistantTypes";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  links?: AssistantLink[];
  suggestions?: string[];
};

function createMessage(
  role: ChatMessage["role"],
  text: string,
  links: AssistantLink[] = [],
  suggestions: string[] = []
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    links,
    suggestions
  };
}

export default function StudyAssistant() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  async function askAssistant(query: string, includeUserMessage = true) {
    const trimmedQuery = query.trim();

    if (includeUserMessage && !trimmedQuery) {
      return;
    }

    if (includeUserMessage) {
      setMessages((current) => [...current, createMessage("user", trimmedQuery)]);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: trimmedQuery })
      });

      const data = (await response.json()) as AssistantReply;

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.message, data.links, data.suggestions)
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "The assistant is temporarily unavailable. Use Courses or Video Library for manual navigation.",
          [
            {
              title: "Courses",
              href: "/courses",
              label: "Page",
              description: "Open all course shelves."
            },
            {
              title: "Video Library",
              href: "/videos",
              label: "Page",
              description: "Open all video collections."
            }
          ],
          ["Open courses", "Open video library", "Open revision lectures"]
        )
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && messages.length === 0 && !loading) {
      void askAssistant("", false);
    }
  }, [open, messages.length, loading]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, loading]);

  return (
    <div className={`assistant-shell${open ? " is-open" : ""}`}>
      {open ? (
        <section className="assistant-panel" aria-label="AI Assistant">
          <header className="assistant-header">
            <div>
              <p className="assistant-kicker">AI Assistant</p>
              <h2>Study help</h2>
            </div>
            <button
              className="assistant-close"
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">x</span>
            </button>
          </header>

          <div className="assistant-messages" ref={listRef}>
            {messages.map((message) => (
              <article
                className={`assistant-message assistant-message-${message.role}`}
                key={message.id}
              >
                <p>{message.text}</p>

                {message.links && message.links.length > 0 ? (
                  <div className="assistant-links">
                    {message.links.map((link) =>
                      link.external ? (
                        <a
                          className="assistant-link"
                          href={link.href}
                          key={`${message.id}-${link.href}-${link.title}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <strong>{link.title}</strong>
                          <span>{link.label}</span>
                        </a>
                      ) : (
                        <Link
                          className="assistant-link"
                          href={link.href}
                          key={`${message.id}-${link.href}-${link.title}`}
                        >
                          <strong>{link.title}</strong>
                          <span>{link.label}</span>
                        </Link>
                      )
                    )}
                  </div>
                ) : null}

                {message.role === "assistant" &&
                message.suggestions &&
                message.suggestions.length > 0 ? (
                  <div className="assistant-suggestions">
                    {message.suggestions.map((suggestion) => (
                      <button
                        className="assistant-suggestion"
                        key={`${message.id}-${suggestion}`}
                        type="button"
                        onClick={() => void askAssistant(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}

            {loading ? (
              <div className="assistant-message assistant-message-assistant">
                <p>Thinking through the best route for this query.</p>
              </div>
            ) : null}
          </div>

          <form
            className="assistant-form"
            onSubmit={(event) => {
              event.preventDefault();
              const query = input.trim();
              if (!query) {
                return;
              }
              setInput("");
              void askAssistant(query);
            }}
          >
            <label className="sr-only" htmlFor="assistant-input">
              Ask the AI assistant
            </label>
            <input
              id="assistant-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about courses, videos, or revision"
            />
            <button type="submit" disabled={loading}>
              Ask
            </button>
          </form>
        </section>
      ) : null}

      <button
        className="assistant-toggle"
        type="button"
        aria-expanded={open}
        aria-label="Open AI assistant"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="assistant-toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img">
            <path
              d="M8.5 9.25h7M8.5 12h5M12 4.75c-4 0-7.25 2.77-7.25 6.19 0 1.95 1.06 3.69 2.72 4.82l-.53 3.49 3.34-1.81c.55.11 1.12.16 1.72.16 4 0 7.25-2.77 7.25-6.2S16 4.75 12 4.75Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>AI Assistant</span>
      </button>
    </div>
  );
}
