"use client";
import React from "react";

interface TitleData {
  title: string;
  technologies?: string[]; // Make optional with ?
  target?: string;
  features?: string[];
}
export default function Output({
  generatedTitle,
}: {
  generatedTitle: TitleData | null;
}) {
  return (
    <div className="bg-white p-4 rounded shadow-sm w-full flex flex-col gap-4">
      <h1 className="mb-4">Output</h1>
      {/*  */}

      {generatedTitle && generatedTitle?.title ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-500">Title</label>
            <p>{generatedTitle?.title}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-500">
              Technologies (Optional)
            </label>
            <ul>
              {generatedTitle &&
                generatedTitle?.technologies?.map(
                  (tech: string, index: number) => <li key={index}>{tech}</li>
                )}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-500">Target</label>
            <p>{generatedTitle?.target}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-500">Features</label>
            <ul>
              {generatedTitle &&
                generatedTitle?.features?.map(
                  (feature: string, index: number) => (
                    <li key={index}>
                      {index + 1}. {feature}
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please generate a title</p>
      )}
    </div>
  );
}
