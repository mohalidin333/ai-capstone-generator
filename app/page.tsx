"use client";

import React from "react";
import Generator from "./components/Generator";
import Output from "./components/Output";
import SEO from "./components/SEO";

interface TitleData {
  title: string;
  technologies?: string[]; // Make optional with ?
  target?: string;
  features?: string[];
}

export default function Home() {
  const [generatedTitle, setGeneratedTitle] = React.useState<TitleData | null>(
    null
  );

  return (
    <>
      <SEO />
      <div className="bg-gray-100 items-start h-screen flex flex-col items-center gap-[5rem] p-[5rem]">
        <h1 className="text-xl">AI Capstone Generator</h1>

        <div className="flex gap-4 items-start flex-col">
          <Generator setGeneratedTitle={setGeneratedTitle} />
          <Output generatedTitle={generatedTitle} />
        </div>
      </div>
    </>
  );
}
