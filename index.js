import OpenAI from "openai";
import express from "express";
import cors from "cors";

const openai = new OpenAI();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/prompt", async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        });

        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate completion" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
