"use client";

import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TestCases = ({ results }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "error":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {results.success ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-semibold text-gray-900 dark:text-white">
              {results.success ? "All Tests Passed" : "Some Tests Failed"}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {results.passedTests} / {results.totalTests} tests passed
        </div>
      </div>

      {/* Execution Time */}
      {results.executionTime && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Execution time: {results.executionTime}ms
        </div>
      )}

      {/* Error Message */}
      {results.error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                Compilation Error
              </h4>
              <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono">
                {results.error}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Test Cases */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          Test Cases
        </h4>
        {results.testCases?.map((testCase, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              testCase.status === "passed"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : testCase.status === "failed"
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(testCase.status)}
                <span className="font-medium text-gray-900 dark:text-white">
                  Test Case {index + 1}
                </span>
              </div>
              <Badge className={getStatusColor(testCase.status)}>
                {testCase.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Input:
                </span>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono">
                  {testCase.input}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Expected:
                </span>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono">
                  {testCase.expected}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Output:
                </span>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono">
                  {testCase.output || "N/A"}
                </div>
              </div>
            </div>

            {/* Explanation */}
            {testCase.explanation && (
              <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Explanation: </span>
                  {testCase.explanation}
                </div>
              </div>
            )}

            {testCase.error && (
              <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/20 rounded">
                <div className="text-sm text-red-700 dark:text-red-300 font-mono">
                  {testCase.error}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Code Analysis */}
      {results.analysis && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
            Code Analysis
          </h4>
          <div className="text-sm text-purple-700 dark:text-purple-300">
            {results.analysis}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {results.suggestions && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Improvement Suggestions
          </h4>
          <div className="text-sm text-green-700 dark:text-green-300">
            {results.suggestions}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {results.memoryUsage && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Performance Metrics
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 dark:text-blue-300">Memory Usage:</span>
              <span className="ml-2 font-mono">{results.memoryUsage}</span>
            </div>
            {results.executionTime && (
              <div>
                <span className="text-blue-700 dark:text-blue-300">Execution Time:</span>
                <span className="ml-2 font-mono">{results.executionTime}ms</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCases; 