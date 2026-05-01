import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../styles/dashboard/ChatbotSupport.css";
import {
  FaTimes,
  FaUserCircle,
  FaMicrophone,
  FaVolumeUp,
  FaVolumeMute,
  FaPaperPlane,
} from "react-icons/fa";
import { BsRobot } from "react-icons/bs";

const ChatbotSupport = ({ onClose, mode = "modal" }) => {

  const chatRef = useRef(null);
  const [messages, setMessages] = useState([
  {
    sender: "bot",
    text: "Hey! I am Riddhi. How can I help you?",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const API_URL = import.meta.env.VITE_CHATBOT_API_URL;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

   const handleClose = useCallback(() => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (onClose) onClose();
}, [onClose]);

  /* 🔇 Stop speech when toggle OFF */
  useEffect(() => {
    if (!isSpeaking && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [isSpeaking]);

  /* Auto Scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
  if (mode !== "widget") return;

  const handleOutsideClick = (e) => {
    if (
  chatRef.current &&
  !chatRef.current.contains(e.target) &&
  !e.target.closest(".chat-float") // 🔥 prevent button conflict
) {
  handleClose();
}
  };

  // 🔥 IMPORTANT: delay binding (prevents instant close after open)
  const timer = setTimeout(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  }, 0);

  return () => {
    clearTimeout(timer);
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [mode, handleClose]);

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const cleanTextForSpeech = (text) => {
    return text.replace(
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
      "",
    );
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window) || !isSpeaking) return;

    const cleanText = cleanTextForSpeech(text);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    utterance.rate = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* Speech Recognition */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const handleMic = () => {
    if (!recognitionRef.current) return;

    // 🔇 STOP SPEECH when mic is tapped
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // 🎤 toggle mic
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

 

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    window.speechSynthesis.cancel();

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, time: getTime() },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userText }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let fullText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (let line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "").trim();
            if (!jsonStr) continue;

            try {
              const parsed = JSON.parse(jsonStr);

              if (parsed.token) {
                fullText += parsed.token;
                setIsTyping(false);

                await delay(fullText.length < 60 ? 20 : 8);

                setMessages((prev) => {
                  const updated = [...prev];

                  if (
                    updated.length === 0 ||
                    updated[updated.length - 1].sender !== "bot"
                  ) {
                    updated.push({
                      sender: "bot",
                      text: fullText,
                      time: getTime(),
                    });
                  } else {
                    updated[updated.length - 1].text = fullText;
                  }

                  return updated;
                });
              }

              if (parsed.done) {
                speakText(fullText);
                done = true;
                break;
              }
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again.",
          time: getTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return mode === "modal" ? (
    <div className="rs-chatbotsupport-modal-overlay" onClick={handleClose}>
      <div
        className="rs-chatbotsupport-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rs-chatbotsupport-header-new">
          <div className="rs-chatbotsupport-header-left">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="avatar"
              className="rs-chatbotsupport-avatar-img"
            />
            <div>
              <h4>Riddhi</h4>
              <p>
                <span className="dot"></span>
                {isTyping ? "Typing..." : "Online • RS Education"}
              </p>
            </div>
          </div>

          <div className="rs-chatbotsupport-header-right">
            <button
              className="voice-btn"
              onClick={() => setIsSpeaking((prev) => !prev)}
            >
              {isSpeaking ? <FaVolumeUp /> : <FaVolumeMute />}
              {isSpeaking && <span className="wave"></span>}
            </button>

            <button className="rs-chatbotsupport-close-btn" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="rs-chatbotsupport-messages">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rs-chatbotsupport-msg-row ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
              <div className="rs-chatbotsupport-avatar">
                {msg.sender === "user" ? <FaUserCircle /> : <BsRobot />}
              </div>

              <div className="rs-chatbotsupport-msg-content">
                <div className="rs-chatbotsupport-msg-text">{msg.text}</div>
                <div className="rs-chatbotsupport-msg-time">{msg.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="rs-chatbotsupport-msg-row bot">
              <div className="rs-chatbotsupport-avatar">
                <BsRobot />
              </div>
              <div className="rs-chatbotsupport-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="rs-chatbotsupport-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            className="rs-chatbotsupport-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            className={`rs-chatbotsupport-mic-btn ${
              isListening ? "listening" : ""
            }`}
            onClick={handleMic}
            disabled={isTyping}
          >
            <FaMicrophone />
          </button>

          <button
            className="rs-chatbotsupport-send-btn"
            onClick={handleSend}
            disabled={isTyping}
          >
            {isTyping ? "..." : <FaPaperPlane />}
          </button>
        </div>
      </div>
    </div>
    ) : (
  /* ================= WIDGET MODE (Floating Button) ================= */
  <div className="rs-chatbotsupport-widget">
    <div 
  className="rs-chatbotsupport-widget-inner"
  ref={chatRef}
>
      {/* HEADER */}
      <div className="rs-chatbotsupport-header-new">
        <div className="rs-chatbotsupport-header-left">
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="avatar"
            className="rs-chatbotsupport-avatar-img"
          />
          <div>
            <h4>Riddhi</h4>
            <p>
              <span className="dot"></span>
              {isTyping ? "Typing..." : "Online • RS Education"}
            </p>
          </div>
        </div>

        <div className="rs-chatbotsupport-header-right">
          <button
            className="voice-btn"
            onClick={() => setIsSpeaking((prev) => !prev)}
          >
            {isSpeaking ? <FaVolumeUp /> : <FaVolumeMute />}
            {isSpeaking && <span className="wave"></span>}
          </button>

          <button
            className="rs-chatbotsupport-close-btn"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="rs-chatbotsupport-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rs-chatbotsupport-msg-row ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            <div className="rs-chatbotsupport-avatar">
              {msg.sender === "user" ? <FaUserCircle /> : <BsRobot />}
            </div>

            <div className="rs-chatbotsupport-msg-content">
              <div className="rs-chatbotsupport-msg-text">
                {msg.text}
              </div>
              <div className="rs-chatbotsupport-msg-time">
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="rs-chatbotsupport-msg-row bot">
            <div className="rs-chatbotsupport-avatar">
              <BsRobot />
            </div>
            <div className="rs-chatbotsupport-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="rs-chatbotsupport-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          className="rs-chatbotsupport-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          className={`rs-chatbotsupport-mic-btn ${
            isListening ? "listening" : ""
          }`}
          onClick={handleMic}
          disabled={isTyping}
        >
          <FaMicrophone />
        </button>

        <button
          className="rs-chatbotsupport-send-btn"
          onClick={handleSend}
          disabled={isTyping}
        >
          {isTyping ? "..." : <FaPaperPlane />}
        </button>
      </div>
    </div>
  </div>
  );
};

export default ChatbotSupport;
