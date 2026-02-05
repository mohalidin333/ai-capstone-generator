"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users2 } from "lucide-react";

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

export default function Output({
  generatedTitle,
}: {
  generatedTitle: TitleData | null;
}) {
  const hasTitle = Boolean(generatedTitle?.title);
  return (
    <Card className="w-full border-slate-200/60 bg-white/90 shadow-lg shadow-blue-100/50 backdrop-blur">
      <CardContent className="mt-[1.2rem] flex flex-col gap-[1.2rem]">
        {hasTitle ? (
          <>
            {/* title */}
            <h4 className="scroll-m-20 text-xl font-bold tracking-tight text-slate-900">
              {generatedTitle?.title}
            </h4>

            {/* technologies */}
            <ul className="flex gap-2 items-center flex-wrap">
              {generatedTitle?.technologies?.map(
                (tech: string, index: number) => (
                  <li
                    key={index}
                    className="rounded-full bg-slate-100 px-[0.7rem] py-[0.25rem] text-[13px] font-semibold text-slate-600"
                  >
                    {tech}
                  </li>
                )
              )}
            </ul>

            {/* description */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-bold uppercase tracking-wide text-slate-400">
                  Problem
                </label>
                <p className="leading-7 text-slate-600">
                  {generatedTitle?.description?.Problem}
                </p>
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wide text-slate-400">
                  Solution
                </label>
                <p className="leading-7 text-slate-600">
                  {generatedTitle?.description?.Solution}
                </p>
              </div>
            </div>

            {/* target */}
            <div className="flex items-center gap-2 text-slate-600">
              <Users2 size={15} />
              <small className="text-sm font-medium leading-none">
                {generatedTitle?.target} · {generatedTitle?.complexity}
              </small>
            </div>

            {/* features */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-wide text-slate-400">
                Core Features
              </label>
              <ul className="flex flex-col gap-2">
                {generatedTitle?.features?.map(
                  (feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex gap-2 items-center text-sm font-medium text-slate-700"
                    >
                      <ChevronRight size={13} />
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-8 py-12 text-center">
            <div className="rounded-full bg-white p-3 shadow-sm">
              <Users2 className="text-indigo-500" size={18} />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-slate-900">
                Your capstone concept appears here
              </h4>
              <p className="text-sm text-slate-500">
                Fill in the form and generate a concept with a ready-made
                overview, audience, and feature list.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
