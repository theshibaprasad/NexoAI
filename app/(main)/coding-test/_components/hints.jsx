"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Eye } from "lucide-react";

const Hints = ({ hints = [], learningObjectives = [] }) => {
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);

  const handleRevealHint = (index) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Hints & Learning Objectives
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Learning Objectives */}
        {learningObjectives.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Learning Objectives</h4>
            <div className="space-y-2">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm">{objective}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hints */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Problem Hints</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
            >
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
          </div>
          
          {showHints && (
            <div className="space-y-3">
              {hints.map((hint, index) => {
                const isRevealed = revealedHints.includes(index);
                return (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Hint {index + 1}</Badge>
                      {!isRevealed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevealHint(index)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Reveal
                        </Button>
                      )}
                    </div>
                    
                    {isRevealed ? (
                      <div className="text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-500 inline mr-2" />
                        {hint}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
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