import { Configuration, OpenAIApi } from "openai";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  organization: "org-8X0v8WRmDnvDoIJ2tO5hTirj",
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(
    `Server running. Use your API at http://localhost:${process.env.PORT}`
  );
});

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0
  });
  res.json({ data: response.data });
  console.log(response);
});
