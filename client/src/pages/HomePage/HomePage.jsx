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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line prefer-const
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
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
