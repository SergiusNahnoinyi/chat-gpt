import "./NewChatButton.css";

export default function NewChatButton({ onClick }) {
  return (
    <button type="button" className="new-chat-button" onClick={onClick}>
      <span>+</span>New Chat
    </button>
  );
}
