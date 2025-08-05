"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Filter } from "lucide-react";
import { codingProblems } from "@/data/coding-problems";

const ProblemSelector = ({ onProblemSelected }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [filteredProblems, setFilteredProblems] = useState(codingProblems);

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const topics = [
    "All",
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

  const handleFilterChange = () => {
    let filtered = codingProblems;

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty);
    }

    if (selectedTopic !== "All") {
      filtered = filtered.filter(problem => problem.topic === selectedTopic);
    }

    setFilteredProblems(filtered);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setTimeout(handleFilterChange, 0);
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setTimeout(handleFilterChange, 0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Select Problem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Difficulty
            </label>
            <Select value={selectedDifficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Topic
            </label>
            <Select value={selectedTopic} onValueChange={handleTopicChange}>
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

        {/* Problem List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No problems found with the selected filters.
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => onProblemSelected(problem)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {problem.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {problem.topic}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemSelector; 