import { Configuration, OpenAIApi } from "openai";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_API_ORG,
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/models", async (req, res) => {
  try {
    const response = await openai.listModels();

    res.status(200).json({ models: response.data.data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  const { model } = req.body;

  try {
    const response = await openai.createCompletion({
      model: `${model}`,
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5
    });

    res.status(200).json({ message: response.data.choices[0].text });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running. Use your API at http://localhost:${process.env.PORT}`
  );
});
