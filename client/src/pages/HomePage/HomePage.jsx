import { useState, useEffect } from "react";

import ModelSelector from "../../components/ModelSelector";
import NewChatButton from "../../components/NewChatButton";
import Hero from "../../components/Hero";
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
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/models`);
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

      const response = await fetch(process.env.REACT_APP_BASE_URL, {
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

  const handleChange = (e) => {
    setSelectedModel(e.currentTarget.value);
  };

  return (
    <>
      <header className="header">
        <ModelSelector models={models} onChange={handleChange} />
        <NewChatButton onClick={() => setChatLog([])} />
      </header>
      <main className="main">
        {isLoading && <Loader />}
        <section className="chat-section">
          {chatLog.length !== 0 ? (
            chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          ) : (
            <Hero />
          )}
        </section>
        <section className="form-section">
          <ChatForm onSubmit={handleSubmit} />
        </section>
      </main>
    </>
  );
}
