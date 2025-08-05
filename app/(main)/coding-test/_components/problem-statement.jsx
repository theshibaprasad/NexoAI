"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Problem Description
        </h3>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
          <p className="whitespace-pre-line">{problem.description}</p>
        </div>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Examples
        </h3>
        <div className="space-y-4">
          {problem.examples.map((example, index) => (
            <Card key={index} className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Example {index + 1}:
                    </span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">Input: </span>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-800 dark:text-gray-200">
                        {example.input}
                      </code>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="font-semibold text-gray-900 dark:text-white">Output: </span>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-800 dark:text-gray-200">
                        {example.output}
                      </code>
                    </div>
                    {example.explanation && (
                      <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Explanation: </span>
                        {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Constraints
        </h3>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Function Signature */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Function Signature
        </h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="flex items-center justify-between">
            <span>{problem.functionSignature || getDefaultFunctionSignature(problem)}</span>
            <Badge variant="outline" className="text-xs">
              {problem.difficulty}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement; 