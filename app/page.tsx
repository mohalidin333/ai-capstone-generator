"use client";

import React from "react";
import Generator from "./components/Generator";
import Output from "./components/Output";
import SEO from "./components/SEO";

interface TitleData {
  title: string;
  description: string;
  technologies: string[];
  target: string;
  features: string[];
}

export default function Home() {
  const [generatedTitle, setGeneratedTitle] = React.useState<TitleData | null>(
    null
  );

  return (
    <>
      <SEO />
      <div className="bg-gray-100 h-screen items-center flex flex-col gap-[2.5rem] py-[5rem] px-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            AI Capstone Generator
          </h1>
        </div>

        <div className="flex gap-4 md:items-start items-center justify-center md:flex-row flex-col w-full max-w-[1000px]">
          <Generator setGeneratedTitle={setGeneratedTitle} />
          <Output generatedTitle={generatedTitle} />
        </div>
      </div>
    </>
  );
}
