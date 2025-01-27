"use client";

import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface TitleData {
  title: string;
  technologies?: string[]; // Make optional with ?
  target?: string;
  features?: string[];
}

export default function Generator({
  setGeneratedTitle,
}: {
  setGeneratedTitle: React.Dispatch<React.SetStateAction<TitleData | null>>;
}) {
  const [industry, setIndustry] = useState<string>("");
  const [application, setApplication] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  React.useEffect(() => {
    setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
  }, [loading]);

  async function handleGenerate() {
    setGeneratedTitle({
      title: "",
      technologies: [],
      target: "",
      features: [],
    });
    // check if data is valid
    if (!industry || !application) {
      alert("Please fill out all fields");
      
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/generate", {
        data: { industry, application },
      });

      // Verify response structure
      if (!res.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid API response structure");
      }

      // Parse the JSON content
      const rawContent = res.data.choices[0].message.content;
      const parsedData: TitleData = JSON.parse(rawContent);

      if (!parsedData.title) {
        throw new Error("Title field missing in response");
      }

      setLoading(false);
      setTimer(10);
      setGeneratedTitle(parsedData);
    } catch (error) {
      console.error("Generation failed:", error);
      alert(
        `Generation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm w-full flex flex-col gap-4">
      <h1 className="mb-4">Generate</h1>
      {/* industry */}
      <div className="flex flex-col gap-1">
        <label>Industry</label>
        <select
          onChange={(e) => setIndustry(e.target.value)}
          className="focus:outline-none border border-sky-500 p-2 rounded"
        >
          <option value="Industry" selected disabled>Industry</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Construction">Construction</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Financial services">Financial services</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Consulting">Consulting</option>
          <option value="Sales and Marketing">Sales and Marketing</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
      </div>

      {/* application */}
      <div className="flex flex-col gap-1">
        <label>Application</label>
        <select
          onChange={(e) => setApplication(e.target.value)}
          className="focus:outline-none border border-sky-500 p-2 rounded"
        >
          <option value="Application" selected disabled>Application</option>
          <option value="Web">Web</option>
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      {/* limit to avoid spam */}
      {timer > 0 ? (
        <p className="text-sm text-gray-500">
          You can generate another title in {timer} seconds
        </p>
      ) : (
        <button
          onClick={handleGenerate}
          className={`${
            loading && "pointer-events-none opacity-50"
          } flex items-center justify-center gap-2 bg-sky-500 p-2 text-white rounded shadow-lg hover:shadow-[0]`}
        >
          Generate Title
          {loading && <Loader2 className="animate-spin ml-2" size={20} />}
        </button>
      )}
    </div>
  );
}
