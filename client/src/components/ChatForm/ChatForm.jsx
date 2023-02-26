import { useState } from "react";

import arrow from "../../icons/arrow.svg";

import "./ChatForm.css";

export default function ChatForm({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        className="chat-form__input"
        value={input}
        onChange={handleChange}
      />
      <button type="submit" className="chat-form__button">
        <img src={arrow} alt="Arrow icon" aria-hidden />
      </button>
    </form>
  );
}
