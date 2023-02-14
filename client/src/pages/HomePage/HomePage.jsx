import { useState } from "react";

import ChatMessage from "../../components/ChatMessage/ChatMessage";

import "./HomePage.css";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?"
    },
    {
      user: "me",
      message: "I want to use chat GPT today"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}` }]);
    setInput("");
  };

  return (
    <main className="app">
      <aside className="side-menu">Aside</aside>
      <section className="chat-box">
        {chatLog.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChatMessage key={index} message={message} />
        ))}
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </section>
    </main>
  );
}
