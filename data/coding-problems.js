export const codingProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
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
    ],
    hints: [
      "Think about using a hash map to store numbers you've seen",
      "For each number, check if its complement (target - current) exists in the hash map",
      "If complement exists, return current index and complement's index. If not, add current number and its index to hash map"
    ],
    learningObjectives: [
      "Hash map data structure usage",
      "Two-pass algorithm optimization",
      "Time complexity O(n) vs O(n²) approaches"
    ]
  },
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    topic: "Math",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.`,
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    testCases: [
      { input: "121", target: null, expected: "true" },
      { input: "-121", target: null, expected: "false" },
      { input: "10", target: null, expected: "false" },
      { input: "12321", target: null, expected: "true" },
    ],
    hints: [
      "Consider converting the number to a string to check if it reads the same forwards and backwards",
      "Think about extracting digits from the number and building the reversed number",
      "You can also solve this without converting to string by using mathematical operations to extract digits"
    ],
    learningObjectives: [
      "String manipulation techniques",
      "Mathematical digit extraction",
      "Palindrome detection algorithms"
    ]
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    topic: "Strings",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: "The string is reversed in-place."
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        explanation: "The string is reversed in-place."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    testCases: [
      { input: '["h","e","l","l","o"]', target: null, expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', target: null, expected: '["h","a","n","n","a","H"]' },
      { input: '["a"]', target: null, expected: '["a"]' },
      { input: '["a","b","c"]', target: null, expected: '["c","b","a"]' },
    ],
    hints: [
      "Use two pointers - one at the beginning and one at the end of the array",
      "Swap the characters at the two pointers, then move the pointers towards the center",
      "Continue until the pointers meet in the middle"
    ],
    learningObjectives: [
      "Two-pointer technique",
      "In-place array manipulation",
      "String reversal algorithms"
    ]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses."
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "The string contains valid parentheses."
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "The string contains invalid parentheses."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'"
    ],
    testCases: [
      { input: '"()"', target: null, expected: "true" },
      { input: '"()[]{}"', target: null, expected: "true" },
      { input: '"(]"', target: null, expected: "false" },
      { input: '"([)]"', target: null, expected: "false" },
      { input: '"{[]}"', target: null, expected: "true" },
    ],
    hints: [
      "Use a stack to keep track of opening brackets",
      "When you encounter an opening bracket, push it onto the stack",
      "When you encounter a closing bracket, check if it matches the top of the stack"
    ],
    learningObjectives: [
      "Stack data structure",
      "Bracket matching algorithms",
      "Parentheses validation"
    ]
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous part of an array.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", target: null, expected: "6" },
      { input: "[1]", target: null, expected: "1" },
      { input: "[5,4,-1,7,8]", target: null, expected: "23" },
      { input: "[-1]", target: null, expected: "-1" },
    ],
    hints: [
      "Use Kadane's algorithm - keep track of current sum and maximum sum seen so far",
      "If current sum becomes negative, reset it to 0 and start fresh",
      "Update maximum sum whenever current sum exceeds it"
    ],
    learningObjectives: [
      "Dynamic programming concepts",
      "Kadane's algorithm",
      "Subarray sum optimization"
    ]
  }
];

export const getProblemById = (id) => {
  return codingProblems.find(problem => problem.id === id);
};

export const getProblemsByDifficulty = (difficulty) => {
  return codingProblems.filter(problem => problem.difficulty === difficulty);
};

export const getProblemsByTopic = (topic) => {
  return codingProblems.filter(problem => problem.topic === topic);
}; 