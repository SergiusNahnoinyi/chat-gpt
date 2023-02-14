import "./ChatForm.css";

export default function ChatForm({ input, setInput, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
