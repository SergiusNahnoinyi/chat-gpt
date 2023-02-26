import "./ModelSelector.css";

export default function ModelSelector({ models, onChange }) {
  return (
    <label htmlFor="select">
      Choose an AI model:
      <select className="model-selector" onChange={onChange} id="select">
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </select>
    </label>
  );
}
