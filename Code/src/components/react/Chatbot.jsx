import { useEffect, useRef, useState } from 'react';
import profile from '../../data/profile.js';

const ENDPOINT = '/api/chat';
const GREETING = `Hi! I'm ${profile.name.split(' ')[0]}'s AI assistant. Ask me about his projects, skills, or experience.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Teaser bubble after 2s, until the chat is opened for the first time.
  useEffect(() => {
    if (hasBeenOpened || open) return undefined;
    const id = setTimeout(() => setShowBanner(true), 2000);
    return () => clearTimeout(id);
  }, [hasBeenOpened, open]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  function toggle() {
    setOpen((o) => {
      const next = !o;
      if (next) {
        setHasBeenOpened(true);
        setShowBanner(false);
        setTimeout(() => inputRef.current?.focus(), 60);
      }
      return next;
    });
  }

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) throw new Error('request failed');
      const data = await res.json();
      setMessages((m) => [...m, { role: 'bot', text: data.reply || 'Something went wrong. Try again!' }]);
    } catch {
      // Friendly fallback pointing at real contact links, per ai-chatbot.md.
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: 'The assistant is unavailable right now. You can reach Eric directly through the contact links on this page.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }


  return (
    <>
      {/* Teaser banner */}
      {showBanner && !open && (
        <button className="chat-banner" type="button" onClick={toggle}>
          Hey there! Wanna chat?
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label={`${profile.name} assistant`}>
          <header className="chat-header">
            <div className="chat-identity">
              {/* Decorative prompt mark; the accessible name is the `.chat-name` text beside it. */}
              <span className="chat-avatar" aria-hidden="true"><span className="chat-prompt">&gt;_</span></span>
              <div className="chat-id-text">
                <span className="chat-name">{profile.name}&apos;s AI assistant</span>
                <span className="chat-status">
                  <span className="chat-dot" aria-hidden="true"></span> Online
                </span>
              </div>
            </div>
            <button className="chat-close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </header>

          {/* aria-live so screen readers announce new replies */}
          <div className="chat-messages" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.role === 'bot' && (
                  <span className="chat-mini-avatar" aria-hidden="true"><span className="chat-prompt">&gt;_</span></span>
                )}
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot">
                <span className="chat-mini-avatar" aria-hidden="true"><span className="chat-prompt">&gt;_</span></span>
                <div className="chat-bubble">Typing...</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about projects..."
              aria-label="Message"
              disabled={loading}
            />
            <button
              className="chat-send"
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className="chat-fab"
        type="button"
        onClick={toggle}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" />
          </svg>
        )}
      </button>
    </>
  );
}
