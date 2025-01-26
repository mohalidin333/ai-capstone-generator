import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const systemMessage = {
      role: "system",
      content: `As an AI Capstone Generator, follow these rules:
        1. Provide high quality and unique titles for IT related thesis or capstone.
        2. Return a JSON object with: :
        {title: "title"},
        {techonologies: ["frontend", "backend", "database"]},
        {target: "target audience"},
        {features: ["feature1", "feature2", "feature3", and so on"]},
        3. make sure that technologies, target and features are related to the industry application, and title.
        4. make sure to generate 1.
        5. make sure to generate different titles if the same industry and application is already generated in the past.
        6. make sure to follow the rules above also include no intro and no conclusion.
        7. do not repeat response.
        `,
    };

    const userMessage = {
      role: "user",
      content: `write a IT or Computer Science Capstone Title that is related to ${data.industry} industry and what is the target audience of the title and techonlogies used if using ${data.application}`,
    };

    // change using axios

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", // Groq model name
        messages: [systemMessage, userMessage],
        temperature: 0.2,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
