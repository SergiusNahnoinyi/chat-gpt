import { useState, useEffect } from "react";

import Container from "../../components/Container";
import Hero from "../../components/Hero";
import NewChatButton from "../../components/NewChatButton/NewChatButton";
import ChatMessage from "../../components/ChatMessage";
import ChatForm from "../../components/ChatForm";

import Loader from "../../components/Loader/Loader";

import "./HomePage.css";

export default function HomePage() {
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("babbage");
  const [models, setModels] = useState([]);

  const getModels = async () => {
    const response = await fetch("http://localhost:5000/models");
    const data = await response.json();
    setModels(data.models);
  };

  useEffect(() => {
    getModels();
  }, []);

  const handleSubmit = async (input) => {
    const chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setChatLog(chatLogNew);
    setIsLoading(true);

    try {
      const messages = chatLogNew.map((message) => message.message).join("\n");

      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messages,
          model: selectedModel
        })
      });

      const data = await response.json();
      setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    } catch (error) {
      console.error(error);
      setChatLog(chatLog);
    }

    setIsLoading(false);
  };

  return (
    <main className="app">
      <aside className="side-menu">
        <select onChange={(e) => setSelectedModel(e.target.value)}>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
        </select>
        <NewChatButton onClick={() => setChatLog([])} />
      </aside>
      <section className="chat-section">
        <Container>
          {chatLog.length !== 0 ? (
            chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          ) : (
            <Hero />
          )}
          {isLoading && <Loader />}
        </Container>
      </section>
      <section className="form-section">
        <ChatForm onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
