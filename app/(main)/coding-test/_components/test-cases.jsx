"use client";

import { CheckCircle, XCircle, AlertCircle, Clock, Timer, Zap, TrendingUp, BarChart3 } from "lucide-react";
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
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {results.success ? (
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-900 dark:text-white text-lg">
                {results.success ? "All Tests Passed" : "Some Tests Failed"}
              </span>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {results.passedTests} / {results.totalTests} tests passed
              </div>
            </div>
          </div>
        </div>
        {results.executionTime && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Timer className="w-4 h-4" />
            {results.executionTime}ms
          </div>
        )}
      </div>

      {/* Error Message */}
      {results.error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Compilation Error
              </h4>
              <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono bg-red-100 dark:bg-red-900/20 p-3 rounded">
                {results.error}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Test Cases */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Test Cases
          </h4>
        </div>
        {results.testCases?.map((testCase, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-0 shadow-sm ${
              testCase.status === "passed"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : testCase.status === "failed"
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded ${
                  testCase.status === "passed" ? "bg-green-100 dark:bg-green-900/20" :
                  testCase.status === "failed" ? "bg-red-100 dark:bg-red-900/20" :
                  "bg-gray-100 dark:bg-gray-900/20"
                }`}>
                  {getStatusIcon(testCase.status)}
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Test Case {index + 1}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {testCase.status === "passed" ? "✓ Passed" : 
                     testCase.status === "failed" ? "✗ Failed" : "⏳ Pending"}
                  </div>
                </div>
              </div>
              <Badge className={`${getStatusColor(testCase.status)} text-xs`}>
                {testCase.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                  Input
                </span>
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
                  {testCase.input}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                  Expected
                </span>
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
                  {testCase.expected}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide">
                  Output
                </span>
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
                  {testCase.output || "N/A"}
                </div>
              </div>
            </div>

            {/* Explanation */}
            {testCase.explanation && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Explanation: </span>
                  {testCase.explanation}
                </div>
              </div>
            )}

            {testCase.error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
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
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">
              Code Analysis
            </h4>
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
            {results.analysis}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {results.suggestions && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-green-800 dark:text-green-200">
              Improvement Suggestions
            </h4>
          </div>
          <div className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
            {results.suggestions}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {results.memoryUsage && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">
              Performance Metrics
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-700 dark:text-blue-300">Memory Usage:</span>
              <span className="font-mono bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
                {results.memoryUsage}
              </span>
            </div>
            {results.executionTime && (
              <div className="flex items-center gap-2">
                <span className="text-blue-700 dark:text-blue-300">Execution Time:</span>
                <span className="font-mono bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
                  {results.executionTime}ms
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCases; 