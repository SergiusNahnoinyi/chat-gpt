import { useState } from "react";

import NewChatButton from "../../components/NewChatButton/NewChatButton";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ChatForm from "../../components/ChatForm/ChatForm";
import Loader from "../../components/Loader/Loader";

import "./HomePage.css";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line prefer-const
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    setIsLoading(true);

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
    setIsLoading(false);
  };

  return (
    <main className="app">
      <aside className="side-menu">
        <NewChatButton onClick={() => setChatLog([])} />
      </aside>
      <section className="chat-box">
        {isLoading && <Loader />}
        {chatLog.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChatMessage key={index} message={message} />
        ))}
        <ChatForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}
