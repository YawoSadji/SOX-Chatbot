const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are an assistant specialized in SOX compliance. Only respond to questions related to SOX regulations, financial controls, auditing best practices, compliance topics, CPRA, and Segregation of duties.",
});

app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  try {
    const result = await model.generateContent(userMessage);
    res.json({ response: result.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
