import "./Hero.css";

import HeroList from "../HeroList";
import Container from "../Container";

import examples from "../../constants/gptExamples";
import capabilities from "../../constants/gptCapabilities";
import limitations from "../../constants/gptLimitations";

import sun from "../../icons/examples.svg";
import lightning from "../../icons/capabilities.svg";
import warning from "../../icons/limitations.svg";

export default function Hero() {
  return (
    <Container>
      <h1 className="hero__title">ChatGPT</h1>
      <div className="hero__lists">
        <HeroList title="Examples" svg={sun} items={examples} />
        <HeroList title="Capabilities" svg={lightning} items={capabilities} />
        <HeroList title="Limitations" svg={warning} items={limitations} />
      </div>
    </Container>
  );
}
