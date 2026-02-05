import { NextResponse } from "next/server";
import axios from "axios";

type TitleData = {
  title: string;
  description: {
    Problem: string;
    Solution: string;
  };
  technologies: string[];
  target: string;
  complexity: string;
  features: string[];
};

function normalizeTitleData(payload: unknown): TitleData | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidate = payload as Partial<TitleData>;

  const description = candidate.description as
    | { Problem?: unknown; Solution?: unknown }
    | undefined;

  if (
    typeof candidate.title !== "string" ||
    !description ||
    typeof description.Problem !== "string" ||
    typeof description.Solution !== "string" ||
    typeof candidate.target !== "string" ||
    typeof candidate.complexity !== "string" ||
    !Array.isArray(candidate.technologies) ||
    !Array.isArray(candidate.features)
  ) {
    return null;
  }

  return {
    title: candidate.title,
    description: {
      Problem: description.Problem,
      Solution: description.Solution,
    },
    target: candidate.target,
    complexity: candidate.complexity,
    technologies: candidate.technologies.filter(
      (item): item is string => typeof item === "string"
    ),
    features: candidate.features.filter(
      (item): item is string => typeof item === "string"
    ),
  };
}

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const systemMessage = {
      role: "system",
      content: `You are an AI Capstone Generator. Output only valid JSON, with no markdown, no backticks, and no extra text.
Return exactly one JSON object with this schema:
{
  "title": "string",
  "description": {
    "Problem": "string",
    "Solution": "string"
  },
  "technologies": ["string", "string", "string"],
  "target": "string",
  "complexity": "Small | Mid | Advance",
  "features": ["string", "string", "string", "string"]
}
Rules:
1) The title must clearly reflect a real, urgent need of the target client and hint at the solution.
2) description.Problem and description.Solution must each be comprehensive in 1-2 sentences.
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

    const rawContent = response.data?.choices?.[0]?.message?.content;

    if (!rawContent || typeof rawContent !== "string") {
      return NextResponse.json(
        {
          error:
            "The model returned an unexpected response format. Please try again.",
        },
        { status: 502 }
      );
    }

    let parsedContent: unknown;
    try {
      parsedContent = JSON.parse(rawContent);
    } catch {
      return NextResponse.json(
        {
          error:
            "The model returned invalid JSON content. Please try again.",
        },
        { status: 502 }
      );
    }

    const normalizedData = normalizeTitleData(parsedContent);
    if (!normalizedData) {
      return NextResponse.json(
        {
          error:
            "The generated result is missing required fields. Please retry.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ data: normalizedData });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const upstreamMessage =
        (error.response?.data as { error?: { message?: string } })?.error
          ?.message ||
        error.response?.statusText ||
        error.message;

      return NextResponse.json(
        {
          error: `Generation API failed: ${upstreamMessage}`,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Unexpected server error while generating a capstone title.",
      },
      { status: 500 }
    );
  }
}
