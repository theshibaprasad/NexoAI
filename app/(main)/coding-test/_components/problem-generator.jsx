"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ProblemGenerator = ({ onProblemGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [selectedTopic, setSelectedTopic] = useState("Arrays");

  const difficulties = ["Easy", "Medium", "Hard"];
  const topics = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Sorting",
    "Searching",
    "Math",
    "Bit Manipulation",
    "Stack",
    "Queue",
    "Hash Table",
    "Two Pointers",
    "Sliding Window",
    "Binary Search",
    "Recursion",
    "Backtracking",
    "Greedy",
    "Design"
  ];

  const handleGenerateProblem = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/coding-test/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty: selectedDifficulty,
          topic: selectedTopic,
          language: "javascript",
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        onProblemGenerated(result);
        toast.success("New problem generated! 🎉");
      } else {
        toast.error(result.error || "Failed to generate problem");
      }
    } catch (error) {
      toast.error("Failed to generate problem. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Generate New Problem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Difficulty
            </label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={difficulty === "Easy" ? "default" : difficulty === "Medium" ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {difficulty}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Topic
            </label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerateProblem}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Problem
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          AI will generate a unique problem based on your selected difficulty and topic
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemGenerator; 