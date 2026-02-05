import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const systemMessage = {
      role: "system",
      content: `You are an AI Capstone Generator. Output only valid JSON, with no markdown, no backticks, and no extra text.
Return exactly one JSON object with this schema:
{
  "title": "string",
  "description": "Problem: string Solution: string",
  "technologies": ["string", "string", "string"],
  "target": "string",
  "complexity": "Small | Mid | Advance",
  "features": ["string", "string", "string", "string"]
}
Rules:
1) The title must clearly reflect a real, urgent need of the target client and hint at the solution.
2) The description must be comprehensive in 2-4 sentences and always contain both labels exactly: "Problem:" and "Solution:".
3) technologies, target, complexity, and features must align to the target client, platform type, and title.
4) Features represent core features, must be specific and practical, and have no duplicates.
5) Produce unique results across repeated requests.`,
    };

    const userMessage = {
      role: "user",
      content: `Create a Computer Science capstone title for the target client: ${data.targetClient}.
Platform type: ${data.platformType}.
Project complexity: ${data.projectComplexity}.
Preferred tech stack (optional): ${data.techStack || "none provided"}.
Include emerging technologies: ${data.includeEmergingTech}.
Return only the JSON object that fits the required schema.`,
    };

    // change using axios

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [systemMessage, userMessage],
        temperature: 1.0,
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
