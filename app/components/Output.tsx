"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users2 } from "lucide-react";

type TitleData = {
  title: string;
  description: string;
  technologies: string[];
  target: string;
  features: string[];
};

export default function Output({
  generatedTitle,
}: {
  generatedTitle: TitleData | null;
}) {
  return (
    <Card
      className={`${
        generatedTitle && generatedTitle.title ? "flex" : "hidden"
      } w-full max-w-[500px]`}
    >
      <CardContent className="mt-[1.2rem] flex flex-col gap-[1.2rem]">
        {/* title */}
        <h4 className="scroll-m-20 text-xl font-bold tracking-tight">
          {generatedTitle?.title}
        </h4>

        {/* technologies */}
        <ul className="flex gap-2 items-center flex-wrap">
          {generatedTitle &&
            generatedTitle?.technologies?.map((tech: string, index: number) => (
              <li
                key={index}
                className="rounded bg-muted px-[0.5rem] py-[0.2rem] text-[13px] font-semibold"
              >
                {tech}
              </li>
            ))}
        </ul>

        {/* description */}
        <p className="leading-7 text-">{generatedTitle?.description}</p>

        {/* target */}
        <div className="flex items-center gap-2">
          <Users2 size={15} />
          <small className="text-sm font-medium leading-none">
            {generatedTitle?.target}
          </small>
        </div>

        {/* features */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-muted-foreground">Features</label>
          <ul className="flex flex-col gap-2">
            {generatedTitle &&
              generatedTitle?.features?.map(
                (feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex gap-2 items-center text-sm font-medium"
                  >
                    <ChevronRight size={13} />
                    {feature}
                  </li>
                )
              )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
