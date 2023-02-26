import "./HeroList.css";

export default function HeroList({ title, svg, items }) {
  return (
    <ul className="hero-list">
      <div className="hero-list__thumb">
        <img src={svg} alt={title} />
        <h3>{title}</h3>
      </div>
      {items.map((item) => (
        <li className="hero-list__item" key={item.id}>
          {item.value}
        </li>
      ))}
    </ul>
  );
}
