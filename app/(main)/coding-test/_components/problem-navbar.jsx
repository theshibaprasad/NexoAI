"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  CheckCircle,
  Clock,
  Zap,
  Play,
  Loader2,
  Filter
} from "lucide-react";

const ProblemNavbar = forwardRef(({ onProblemSelected, onProblemGenerated, currentProblem }, ref) => {
  const [showProblemSelector, setShowProblemSelector] = useState(false);
  const [showProblemGenerator, setShowProblemGenerator] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [generatorDifficulty, setGeneratorDifficulty] = useState("Medium");
  const [generatorTopic, setGeneratorTopic] = useState("Arrays");
  const [isGenerating, setIsGenerating] = useState(false);
  const [codingStats, setCodingStats] = useState({
    problemsSolved: 0,
    timeSpentMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const selectorRef = useRef(null);
  const generatorRef = useRef(null);

  // Fetch coding statistics on component mount
  useEffect(() => {
    const fetchCodingStats = async () => {
      try {
        console.log("Fetching coding stats...");
        const response = await fetch("/api/coding-stats");
        console.log("Response status:", response.status);
        if (response.ok) {
          const stats = await response.json();
          console.log("Coding stats received:", stats);
          setCodingStats(stats);
        } else {
          const error = await response.json();
          console.error("Error response:", error);
        }
      } catch (error) {
        console.error("Error fetching coding stats:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchCodingStats();
  }, []);

  // Function to refresh stats (can be called from parent)
  const refreshStats = async () => {
    try {
      console.log("Refreshing coding stats...");
      const response = await fetch("/api/coding-stats");
      console.log("Refresh response status:", response.status);
      if (response.ok) {
        const stats = await response.json();
        console.log("Refreshed stats:", stats);
        setCodingStats(stats);
      } else {
        const error = await response.json();
        console.error("Refresh error response:", error);
      }
    } catch (error) {
      console.error("Error refreshing coding stats:", error);
    }
  };

  // Expose refreshStats function to parent
  useImperativeHandle(ref, () => ({
    refreshStats,
  }));

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setShowProblemSelector(false);
      }
      if (generatorRef.current && !generatorRef.current.contains(event.target)) {
        setShowProblemGenerator(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const predefinedProblems = [
    { id: "two-sum", title: "Two Sum", difficulty: "Easy", topic: "Arrays" },
    { id: "palindrome-number", title: "Palindrome Number", difficulty: "Easy", topic: "Math" },
    { id: "reverse-string", title: "Reverse String", difficulty: "Easy", topic: "Strings" },
    { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "Medium", topic: "Stack" },
    { id: "maximum-subarray", title: "Maximum Subarray", difficulty: "Medium", topic: "Dynamic Programming" },
    { id: "binary-search", title: "Binary Search", difficulty: "Easy", topic: "Arrays" },
    { id: "merge-sorted-array", title: "Merge Sorted Array", difficulty: "Easy", topic: "Arrays" },
    { id: "climbing-stairs", title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming" },
    { id: "best-time-to-buy", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays" },
    { id: "contains-duplicate", title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays" },
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const topics = ["All", "Arrays", "Strings", "Math", "Stack", "Dynamic Programming", "Trees", "Graphs", "Two Pointers", "Sliding Window"];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredProblems = predefinedProblems.filter(problem => {
    const difficultyMatch = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    const topicMatch = selectedTopic === "All" || problem.topic === selectedTopic;
    return difficultyMatch && topicMatch;
  });

  const handleGenerateProblem = async () => {
    setIsGenerating(true);
    try {
      await onProblemGenerated({
        difficulty: generatorDifficulty,
        topic: generatorTopic,
        language: "javascript"
      });
      setShowProblemGenerator(false);
    } catch (error) {
      console.error("Error generating problem:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFilterChange = (type, value) => {
    if (type === 'difficulty') {
      setSelectedDifficulty(value);
    } else if (type === 'topic') {
      setSelectedTopic(value);
    }
    // Don't close the dropdown when filters change
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Problem Selection */}
          <div className="flex items-center space-x-4">
            {/* Current Problem Display */}
            {currentProblem && (
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {currentProblem.title}
                    </span>
                    <Badge className={`text-xs ${getDifficultyColor(currentProblem.difficulty)}`}>
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="relative" ref={selectorRef}>
              <Button
                variant="outline"
                onClick={() => setShowProblemSelector(!showProblemSelector)}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <BookOpen className="w-4 h-4" />
                Select Problem
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {showProblemSelector && (
                <Card className="absolute top-full left-0 mt-2 w-96 z-50 shadow-lg border-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                      Choose a Problem
                    </h3>
                    
                    {/* Filters */}
                    <div className="space-y-3 mb-4">
                      {/* Difficulty Filter */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Difficulty
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {difficulties.map((difficulty) => (
                            <Button
                              key={difficulty}
                              variant={selectedDifficulty === difficulty ? "default" : "outline"}
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() => handleFilterChange('difficulty', difficulty)}
                            >
                              {difficulty}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Topic Filter */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Topic
                        </label>
                        <div className="grid grid-cols-2 gap-1">
                          {topics.map((topic) => (
                            <Button
                              key={topic}
                              variant={selectedTopic === topic ? "default" : "outline"}
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() => handleFilterChange('topic', topic)}
                            >
                              {topic}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters Button */}
                    {(selectedDifficulty !== "All" || selectedTopic !== "All") && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Showing: {selectedDifficulty !== "All" ? selectedDifficulty : "All"} • {selectedTopic !== "All" ? selectedTopic : "All"}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedDifficulty("All");
                              setSelectedTopic("All");
                            }}
                            className="text-xs bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Problem List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
                      </div>
                      {filteredProblems.length > 0 ? (
                        filteredProblems.map((problem) => (
                          <div
                            key={problem.id}
                            onClick={() => {
                              onProblemSelected(problem);
                              setShowProblemSelector(false);
                            }}
                            className={`p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all ${
                              currentProblem?.title === problem.title ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                  {problem.title}
                                  {currentProblem?.title === problem.title && (
                                    <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">✓ Current</span>
                                  )}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {problem.topic}
                                </p>
                              </div>
                              <Badge className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                          No problems found with the selected filters
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Generate Problem Button */}
            <div className="relative" ref={generatorRef}>
              <Button
                variant="outline"
                onClick={() => setShowProblemGenerator(!showProblemGenerator)}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <Sparkles className="w-4 h-4" />
                Generate Problem with AI
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {showProblemGenerator && (
                <Card className="absolute top-full left-0 mt-2 w-80 z-50 shadow-lg border-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                      Generate New Problem
                    </h3>
                    
                    {/* Step 1: Difficulty Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Step 1: Select Difficulty
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Easy", "Medium", "Hard"].map((difficulty) => (
                          <Button
                            key={difficulty}
                            variant={generatorDifficulty === difficulty ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                            onClick={() => setGeneratorDifficulty(difficulty)}
                          >
                            {difficulty}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Step 2: Topic Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Step 2: Select Topic
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {topics.slice(1, 9).map((topic) => (
                          <Button
                            key={topic}
                            variant={generatorTopic === topic ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                            onClick={() => setGeneratorTopic(topic)}
                          >
                            {topic}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerateProblem}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      size="sm"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating with AI...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Problem with AI
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Right side - Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            {isLoadingStats ? (
              <div className="flex items-center gap-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading stats...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Problems Solved: {codingStats.problemsSolved}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Time Spent: {Math.round(codingStats.timeSpentMinutes / 60)}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Streak: {codingStats.currentStreak} days</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProblemNavbar; 