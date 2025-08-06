"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Eye, Target, Sparkles } from "lucide-react";

const Hints = ({ hints = [], learningObjectives = [] }) => {
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);

  const handleRevealHint = (index) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1 bg-yellow-100 dark:bg-yellow-900/20 rounded">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          Hints & Learning Objectives
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Learning Objectives */}
        {learningObjectives.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Learning Objectives</h4>
            </div>
            <div className="space-y-3">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{objective}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hints */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Problem Hints</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="text-xs"
            >
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
          </div>
          
          {showHints && (
            <div className="space-y-4">
              {hints.map((hint, index) => {
                const isRevealed = revealedHints.includes(index);
                return (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        Hint {index + 1}
                      </Badge>
                      {!isRevealed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevealHint(index)}
                          className="text-xs"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Reveal
                        </Button>
                      )}
                    </div>
                    
                    {isRevealed ? (
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{hint}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Click to reveal this hint
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Hints; 