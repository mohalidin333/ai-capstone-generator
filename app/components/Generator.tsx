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
  features: string[];
}

export default function Generator({
  setGeneratedTitle,
}: {
  setGeneratedTitle: React.Dispatch<React.SetStateAction<TitleData | null>>;
}) {
  const [industry, setIndustry] = useState<string>("");
  const [application, setApplication] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
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
      description: "",
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
      console.log(techStack);

      const res = await axios.post("/api/generate", {
        data: { industry, application, techStack },
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
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.error("Generation failed:", error);
      alert(
        `Generation failed: ${
          error instanceof Error
            ? error.message + ". Please try again!"
            : "Unknown error. Please try again!"
        }`
      );
    }
  }

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Generate Capstone
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* industry */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="industry">Target Industry</Label>
            <Select onValueChange={(value) => setIndustry(value)}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Random">Random</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Financial services">
                  Financial services
                </SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
                <SelectItem value="Sales and Marketing">
                  Sales and Marketing
                </SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* application */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="application">Project</Label>
            <Select onValueChange={(value) => setApplication(value)}>
              <SelectTrigger id="application">
                <SelectValue placeholder="Application" />
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

          {/* technology */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="application">
              TechStack{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <p className="text-[13px] text-muted-foreground">Please match it to the target industry and project type.</p>
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
          <p className="text-sm text-muted-foreground">
            You can generate another title in {timer} seconds
          </p>
        ) : (
          <Button
            onClick={handleGenerate}
            className={`${loading && "pointer-events-none opacity-50"} w-full`}
          >
            Generate
            {loading && <Loader2 className="animate-spin ml-2" size={20} />}
          </Button>
        )}

        <a
          href="https://www.tiktok.com/@secretdev333"
          className="text-[13px] font-medium hover:underline text-muted-foreground"
        >
          Tiktok@secretdev333
        </a>
      </CardFooter>
    </Card>
  );
}
