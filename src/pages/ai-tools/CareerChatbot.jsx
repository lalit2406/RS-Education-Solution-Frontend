import React, { useState, useEffect, useRef } from "react";
import "../../styles/ai-tools/CareerChatbot.css";

const API = "https://student-support-chatbot-kvk4.onrender.com";

export default function CareerChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const chatEndRef = useRef(null);

  // generate session
  useEffect(() => {
    setSessionId("sess_" + Math.random().toString(36).substr(2, 9));
  }, []);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const sendMessage = async (override) => {
    const text = override || input;
    if (!text.trim() || loading) return;

    const userMsg = { text, sender: "user" };

    setMessages((prev) => [
      ...prev,
      userMsg,
      { text: "Thinking... 🤔", sender: "bot" },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
        }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove thinking
        return [...updated, { text: data.reply, sender: "bot" }];
      });

      setSuggestions(data.suggestions || []);
      setSessionId(data.session_id);
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          { text: "⚠️ Cannot connect to server", sender: "bot" },
        ];
      });
    }

    setLoading(false);
  };

  // clear chat
  const clearChat = async () => {
    try {
      await fetch(`${API}/chat/session/${sessionId}`, {
        method: "DELETE",
      });
    } catch {}

    setMessages([]);
    setSuggestions([]);
    setSessionId("sess_" + Math.random().toString(36).substr(2, 9));
  };

  return (
    <div className="chat-page">
      {/* HEADER */}
      <div className="chat-header">
        <h2>AI Career Counsellor</h2>
        <button onClick={clearChat}>Clear</button>
      </div>

      {/* CHAT AREA */}
      <div className="chat-box">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <h3>Welcome 👋</h3>
            <p>Ask anything about colleges, career, roadmap...</p>

            <div className="quick-actions">
              <button onClick={() => sendMessage("My JEE rank is 25000")}>
                JEE Rank 25000
              </button>
              <button onClick={() => sendMessage("Best colleges under 1 lakh")}>
                Affordable Colleges
              </button>
              <button onClick={() => sendMessage("Top CS colleges in Delhi")}>
                Top Delhi Colleges
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {loading && <div className="chat-msg bot">Typing...</div>}

        <div ref={chatEndRef}></div>
      </div>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI anything..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  );
}
