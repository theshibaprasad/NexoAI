"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import CodeEditor from "./_components/code-editor";
import ProblemStatement from "./_components/problem-statement";
import TestCases from "./_components/test-cases";
import ProblemGenerator from "./_components/problem-generator";
import ProblemSelector from "./_components/problem-selector";
import Hints from "./_components/hints";
import { toast } from "sonner";

const CodingTestPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [currentProblem, setCurrentProblem] = useState(null);

  const languages = [
    { id: "javascript", name: "JavaScript", extension: "js" },
    { id: "python", name: "Python", extension: "py" },
    { id: "java", name: "Java", extension: "java" },
    { id: "cpp", name: "C++", extension: "cpp" },
    { id: "csharp", name: "C#", extension: "cs" },
    { id: "go", name: "Go", extension: "go" },
    { id: "rust", name: "Rust", extension: "rs" },
    { id: "php", name: "PHP", extension: "php" },
    { id: "ruby", name: "Ruby", extension: "rb" },
    { id: "swift", name: "Swift", extension: "swift" },
  ];

  const defaultProblem = {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testCases: [
      { input: "[2,7,11,15]", target: 9, expected: "[0,1]" },
      { input: "[3,2,4]", target: 6, expected: "[1,2]" },
      { input: "[3,3]", target: 6, expected: "[0,1]" },
      { input: "[1,5,8,10,13]", target: 18, expected: "[2,4]" },
    ]
  };

  // Initialize with default problem
  useEffect(() => {
    setCurrentProblem(defaultProblem);
    setCode(generateCodeTemplate(defaultProblem, selectedLanguage));
  }, []);

  const defaultCode = {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`,
    python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
    csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your code here
    }
}`,
    go: `func twoSum(nums []int, target int) []int {
    // Your code here
}`,
    rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Your code here
    }
}`,
    php: `class Solution {
    function twoSum($nums, $target) {
        // Your code here
    }
}`,
    ruby: `def two_sum(nums, target)
    # Your code here
end`,
    swift: `class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        // Your code here
    }
}`
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first!");
      return;
    }

    setIsRunning(true);
    try {
      const response = await fetch("/api/coding-test/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          problem: currentProblem,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setResults(result);
        if (result.success) {
          toast.success("All test cases passed! 🎉");
        } else {
          toast.error("Some test cases failed. Check the results below.");
        }
      } else {
        toast.error(result.error || "Failed to run code");
      }
    } catch (error) {
      toast.error("Failed to run code. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(generateCodeTemplate(currentProblem, selectedLanguage));
    setResults(null);
  };

  // Function to generate appropriate code template based on problem
  const generateCodeTemplate = (problem, language) => {
    if (!problem) return defaultCode[language] || "";
    
    const problemId = problem.id || problem.title?.toLowerCase().replace(/\s+/g, '-');
    
    // If it's an AI-generated problem, create a generic template
    if (!problem.id && problem.title) {
      return createGenericTemplate(problem, language);
    }
    
    // Define templates for different problem types
    const templates = {
      'two-sum': {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`,
        python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
        csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your code here
    }
}`,
        go: `func twoSum(nums []int, target int) []int {
    // Your code here
}`,
        rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Your code here
    }
}`,
        php: `class Solution {
    function twoSum($nums, $target) {
        // Your code here
    }
}`,
        ruby: `def two_sum(nums, target)
    # Your code here
end`,
        swift: `class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        // Your code here
    }
}`
      },
      'palindrome-number': {
        javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Your code here
}`,
        python: `def isPalindrome(x):
    """
    :type x: int
    :rtype: bool
    """
    # Your code here
    pass`,
        java: `class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
    }
}`,
        cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Your code here
    }
};`,
        csharp: `public class Solution {
    public bool IsPalindrome(int x) {
        // Your code here
    }
}`,
        go: `func isPalindrome(x int) bool {
    // Your code here
}`,
        rust: `impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        // Your code here
    }
}`,
        php: `class Solution {
    function isPalindrome($x) {
        // Your code here
    }
}`,
        ruby: `def is_palindrome(x)
    # Your code here
end`,
        swift: `class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        // Your code here
    }
}`
      },
      'reverse-string': {
        javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Your code here
}`,
        python: `def reverseString(s):
    """
    :type s: List[str]
    :rtype: None Do not return anything, modify s in-place instead.
    """
    # Your code here
    pass`,
        java: `class Solution {
    public void reverseString(char[] s) {
        // Your code here
    }
}`,
        cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Your code here
    }
};`,
        csharp: `public class Solution {
    public void ReverseString(char[] s) {
        // Your code here
    }
}`,
        go: `func reverseString(s []byte) {
    // Your code here
}`,
        rust: `impl Solution {
    pub fn reverse_string(s: &mut Vec<char>) {
        // Your code here
    }
}`,
        php: `class Solution {
    function reverseString(&$s) {
        // Your code here
    }
}`,
        ruby: `def reverse_string(s)
    # Your code here
end`,
        swift: `class Solution {
    func reverseString(_ s: inout [Character]) {
        // Your code here
    }
}`
      },
      'valid-parentheses': {
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your code here
}`,
        python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Your code here
    pass`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
    }
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
    }
};`,
        csharp: `public class Solution {
    public bool IsValid(string s) {
        // Your code here
    }
}`,
        go: `func isValid(s string) bool {
    // Your code here
}`,
        rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        // Your code here
    }
}`,
        php: `class Solution {
    function isValid($s) {
        // Your code here
    }
}`,
        ruby: `def is_valid(s)
    # Your code here
end`,
        swift: `class Solution {
    func isValid(_ s: String) -> Bool {
        // Your code here
    }
}`
      },
      'maximum-subarray': {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Your code here
}`,
        python: `def maxSubArray(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
        java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
    }
}`,
        cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Your code here
    }
};`,
        csharp: `public class Solution {
    public int MaxSubArray(int[] nums) {
        // Your code here
    }
}`,
        go: `func maxSubArray(nums []int) int {
    // Your code here
}`,
        rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        // Your code here
    }
}`,
        php: `class Solution {
    function maxSubArray($nums) {
        // Your code here
    }
}`,
        ruby: `def max_sub_array(nums)
    # Your code here
end`,
        swift: `class Solution {
    func maxSubArray(_ nums: [Int]) -> Int {
        // Your code here
    }
}`
      }
    };

    // Return specific template if available, otherwise return default
    return templates[problemId]?.[language] || defaultCode[language] || "";
  };

  // Function to create generic template for AI-generated problems
  const createGenericTemplate = (problem, language) => {
    const functionName = problem.functionSignature?.match(/function\s+(\w+)/)?.[1] || 
                        problem.title?.toLowerCase().replace(/\s+/g, '_') || 
                        'solve';
    
    const templates = {
      javascript: `/**
 * @param {any} params
 * @return {any}
 */
function ${functionName}(params) {
    // Your code here
}`,
      python: `def ${functionName}(params):
    """
    :type params: any
    :rtype: any
    """
    # Your code here
    pass`,
      java: `class Solution {
    public any ${functionName}(any params) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    any ${functionName}(any params) {
        // Your code here
    }
};`,
      csharp: `public class Solution {
    public any ${functionName}(any params) {
        // Your code here
    }
}`,
      go: `func ${functionName}(params any) any {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn ${functionName}(params: any) -> any {
        // Your code here
    }
}`,
      php: `class Solution {
    function ${functionName}($params) {
        // Your code here
    }
}`,
      ruby: `def ${functionName}(params)
    # Your code here
end`,
      swift: `class Solution {
    func ${functionName}(_ params: Any) -> Any {
        // Your code here
    }
}`
    };
    
    return templates[language] || defaultCode[language] || "";
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(generateCodeTemplate(currentProblem, language));
    setResults(null);
  };

  const handleProblemGenerated = (newProblem) => {
    setCurrentProblem(newProblem);
    setCode(generateCodeTemplate(newProblem, selectedLanguage));
    setResults(null);
  };

  const handleProblemSelected = (problem) => {
    setCurrentProblem(problem);
    setCode(generateCodeTemplate(problem, selectedLanguage));
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Coding Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Practice coding problems with AI-powered evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Statement */}
          <div className="space-y-6">
            {currentProblem && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{currentProblem.title}</CardTitle>
                    <Badge variant={currentProblem.difficulty === "Easy" ? "default" : "destructive"}>
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ProblemStatement problem={currentProblem} />
                </CardContent>
              </Card>
            )}

            {/* Problem Selector */}
            <ProblemSelector onProblemSelected={handleProblemSelected} />

            {/* Problem Generator */}
            <ProblemGenerator onProblemGenerated={handleProblemGenerated} />

            {/* Hints */}
            {currentProblem && currentProblem.hints && (
              <Hints 
                hints={currentProblem.hints} 
                learningObjectives={currentProblem.learningObjectives}
              />
            )}

            {/* Language Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select Language</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.id}
                      variant={selectedLanguage === lang.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLanguageChange(lang.id)}
                      className="justify-start"
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      disabled={isRunning}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      size="sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={selectedLanguage}
                  placeholder="Write your code here..."
                />
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {results.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TestCases results={results} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingTestPage; 