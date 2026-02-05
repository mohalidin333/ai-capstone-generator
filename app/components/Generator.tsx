"use client";

import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TitleData {
  title: string;
  description: string;
  technologies: string[];
  target: string;
  complexity: string;
  features: string[];
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return "API request failed. Please try again.";
  }

  if (error instanceof Error) {
    return "Request failed. Please try again.";
  }

  return "Request failed. Please try again.";
}

export default function Generator({
  setGeneratedTitle,
}: {
  setGeneratedTitle: React.Dispatch<React.SetStateAction<TitleData | null>>;
}) {
  const [targetClient, setTargetClient] = useState<string>("");
  const [platformType, setPlatformType] = useState<string>("");
  const [projectComplexity, setProjectComplexity] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [includeEmergingTech, setIncludeEmergingTech] =
    useState<string>("No");
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [showRetryModal, setShowRetryModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  React.useEffect(() => {
    setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
  }, [loading]);

  const loadCachedTitle = () => {
    if (typeof window === "undefined") {
      return null;
    }

    const cached = localStorage.getItem("capstone:last-title");
    if (!cached) {
      return null;
    }

    try {
      return JSON.parse(cached) as TitleData;
    } catch (error) {
      console.error("Failed to parse cached title:", error);
      return null;
    }
  };

  const saveCachedTitle = (titleData: TitleData) => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem("capstone:last-title", JSON.stringify(titleData));
  };

  async function handleGenerate() {
    setGeneratedTitle({
      title: "",
      description: "",
      technologies: [],
      target: "",
      complexity: "",
      features: [],
    });
    // check if data is valid
    if (!targetClient || !platformType || !projectComplexity) {
      alert("Please fill out all fields");

      return;
    }

    try {
      setLoading(true);
      setShowRetryModal(false);
      setErrorMessage("");

      const res = await axios.post("/api/generate", {
        data: {
          targetClient,
          platformType,
          projectComplexity,
          techStack,
          includeEmergingTech,
        },
      });

      if (!res.data?.data) {
        throw new Error("Invalid API response structure");
      }

      const parsedData: TitleData = res.data.data;

      if (!parsedData.title) {
        throw new Error("Title field missing in response");
      }

      setLoading(false);
      setTimer(10);
      setGeneratedTitle(parsedData);
      saveCachedTitle(parsedData);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      const cachedTitle = loadCachedTitle();
      if (cachedTitle) {
        setGeneratedTitle(cachedTitle);
      }

      const message = getErrorMessage(error);

      setErrorMessage(message);
      setShowRetryModal(true);
      console.error("Generation failed:", error);
    }
  }

  return (
    <Card className="w-full border-slate-200/60 bg-white/80 shadow-lg shadow-indigo-100/40 backdrop-blur">
      <CardHeader className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-slate-900">
          Generate Capstone
        </h3>
        <p className="text-sm text-slate-500">
          Share your focus areas so we can create a capstone idea with an
          on-point scope.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-5">
          {/* industry */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="industry" className="text-slate-700">
              Target Client
            </Label>
            <Select onValueChange={(value) => setTargetClient(value)}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Target Client" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Random">Random</SelectItem>
                <SelectItem value="Education and EdTech">
                  Education and EdTech
                </SelectItem>
                <SelectItem value="Retail and E-commerce">
                  Retail and E-commerce
                </SelectItem>
                <SelectItem value="Agriculture and Food Production">
                  Agriculture and Food Production
                </SelectItem>
                <SelectItem value="Construction and Engineering">
                  Construction and Engineering
                </SelectItem>
                <SelectItem value="Healthcare and Telemedicine">
                  Healthcare and Telemedicine
                </SelectItem>
                <SelectItem value="Financial services">
                  Financial services
                </SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Government and Public Service">
                  Government and Public Service
                </SelectItem>
                <SelectItem value="Logistics and Supply Chain">
                  Logistics and Supply Chain
                </SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Hospitality and Tourism">
                  Hospitality and Tourism
                </SelectItem>
                <SelectItem value="Media and Entertainment">
                  Media and Entertainment
                </SelectItem>
                <SelectItem value="Human Resources and Recruitment">
                  Human Resources and Recruitment
                </SelectItem>
                <SelectItem value="Legal and Compliance">
                  Legal and Compliance
                </SelectItem>
                <SelectItem value="Non-profit and Community Services">
                  Non-profit and Community Services
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* application */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="project" className="text-slate-700">
              Platform Type
            </Label>
            <Select onValueChange={(value) => setPlatformType(value)}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Platform Type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Random">Random</SelectItem>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Desktop">Desktop</SelectItem>
                <SelectItem value="IoT">IoT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="complexity" className="text-slate-700">
              Project Complexity
            </Label>
            <Select onValueChange={(value) => setProjectComplexity(value)}>
              <SelectTrigger id="complexity">
                <SelectValue placeholder="Project Complexity" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="emerging-tech" className="text-slate-700">
              Include emerging technologies?
            </Label>
            <p className="text-[13px] text-slate-500">
              Examples: AI, ML, QR Code, SMS, Blockchain, MCP.
            </p>
            <Select
              value={includeEmergingTech}
              onValueChange={(value) => setIncludeEmergingTech(value)}
            >
              <SelectTrigger id="emerging-tech">
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* technology */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="application" className="text-slate-700">
              Preferred Tech Stack{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <p className="text-[13px] text-slate-500">
              Please match it to the target client and platform type.
            </p>
            <Input
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="E.g. React, Node.js"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {/* limit to avoid spam */}
        {timer > 0 ? (
          <p className="text-sm text-slate-500">
            You can generate another title in {timer} seconds
          </p>
        ) : (
          <Button
            onClick={handleGenerate}
            className={`${loading && "pointer-events-none opacity-50"} w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-200 transition hover:from-indigo-600 hover:to-blue-600`}
          >
            Generate
            {loading && <Loader2 className="animate-spin ml-2" size={20} />}
          </Button>
        )}

        <a
          target="_blank"
          href="https://www.facebook.com/mohalidin.lidasan.3"
          className="text-[13px] font-medium text-muted-foreground hover:underline"
          rel="noreferrer"
        >
          Need a developer to build it? Hire me on Facebook.
        </a>
        <a
          target="_blank"
          href="https://www.tiktok.com/@mohalidintech"
          className="text-[13px] font-medium text-muted-foreground hover:underline"
          rel="noreferrer"
        >
          Or reach me on TikTok @mohalidintech.
        </a>
      </CardFooter>

      {showRetryModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h4 className="text-lg font-semibold text-slate-900">
              We couldn&apos;t generate a new title.
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              {errorMessage ||
                "The request failed. You can retry right away."}
            </p>
            <div className="mt-4 flex flex-wrap justify-end gap-3">
              <Button
                variant="outline"
                className="border-slate-200"
                onClick={() => setShowRetryModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowRetryModal(false);
                  handleGenerate();
                }}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
