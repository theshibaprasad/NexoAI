"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Code, AlertTriangle, CheckCircle } from "lucide-react";

const ProblemStatement = ({ problem }) => {
  const getDefaultFunctionSignature = (problem) => {
    if (!problem) return "function solve()";
    
    const problemId = problem.id || problem.title?.toLowerCase().replace(/\s+/g, '-');
    
    const signatures = {
      'two-sum': 'function twoSum(nums, target)',
      'palindrome-number': 'function isPalindrome(x)',
      'reverse-string': 'function reverseString(s)',
      'valid-parentheses': 'function isValid(s)',
      'maximum-subarray': 'function maxSubArray(nums)'
    };
    
    return signatures[problemId] || problem.functionSignature || "function solve()";
  };
  
  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Problem Description
          </h3>
        </div>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="whitespace-pre-line">{problem.description}</p>
        </div>
      </div>

      {/* Examples */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Examples
          </h3>
        </div>
        <div className="space-y-4">
          {problem.examples.map((example, index) => (
            <Card key={index} className="bg-gray-50 dark:bg-gray-800 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Example {index + 1}
                    </Badge>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm min-w-[50px]">Input:</span>
                        <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-200 font-mono">
                          {example.input}
                        </code>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm min-w-[50px]">Output:</span>
                        <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-200 font-mono">
                          {example.output}
                        </code>
                      </div>
                      {example.explanation && (
                        <div className="flex items-start gap-2 pt-1">
                          <span className="font-semibold text-gray-600 dark:text-gray-400 text-sm min-w-[80px]">Note:</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {example.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Constraints
          </h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-0">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="leading-relaxed">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Function Signature */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Function Signature
          </h3>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm border-0">
          <div className="flex items-center justify-between">
            <span className="text-green-400">{problem.functionSignature || getDefaultFunctionSignature(problem)}</span>
            <Badge variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-600">
              {problem.difficulty}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement; 