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
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-16">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <header className="flex flex-col items-center gap-6 text-center">
            <span className="rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
              AI-powered ideation
            </span>
            <div className="space-y-3">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
                AI Capstone Generator
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
                Spark standout project ideas with curated industries, project
                types, and tech stacks tailored to your goals.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                60+ idea combinations
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                Tailored for portfolios
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                Clear feature guidance
              </span>
            </div>
          </header>

          <div className="grid w-full items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <Generator setGeneratedTitle={setGeneratedTitle} />
            <Output generatedTitle={generatedTitle} />
          </div>
        </div>
      </main>
    </>
  );
}
