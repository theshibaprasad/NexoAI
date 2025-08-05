import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { difficulty = "Easy", topic = "Arrays", language = "javascript" } = await request.json();

    const prompt = `
Generate a comprehensive coding problem with the following specifications:
- Difficulty: ${difficulty}
- Topic: ${topic}
- Primary Language: ${language}

Please create a complete coding problem including:

1. A clear and engaging problem title
2. Detailed problem description with step-by-step explanation
3. Multiple examples with input/output and detailed explanations
4. Clear constraints and edge cases
5. Comprehensive test cases with inputs and expected outputs
6. A function signature appropriate for the language
7. THREE SOLID HINTS to help solve the problem (in order of increasing helpfulness)

The problem should be:
- Original and engaging
- Appropriate for the specified difficulty level
- Well-structured with clear examples
- Testable with multiple test cases
- Educational with clear learning objectives

Return your response in the following JSON format:
{
  "title": "Problem Title",
  "difficulty": "${difficulty}",
  "description": "Detailed problem description with step-by-step explanation...",
  "examples": [
    {
      "input": "input description",
      "output": "expected output",
      "explanation": "detailed explanation of the example"
    }
  ],
  "constraints": [
    "constraint 1",
    "constraint 2"
  ],
  "testCases": [
    {
      "input": "input array/values",
      "target": "target value if applicable",
      "expected": "expected output"
    }
  ],
  "functionSignature": "function functionName(params)",
  "hints": [
    "First hint - general approach",
    "Second hint - specific technique",
    "Third hint - detailed solution strategy"
  ],
  "learningObjectives": [
    "What the user will learn from this problem"
  ]
}

IMPORTANT: The functionSignature should be a clear JavaScript-style function signature like "function twoSum(nums, target)" or "function isValid(s)".

Make sure the problem is:
- Solvable within reasonable time complexity
- Has clear edge cases
- Provides good learning value
- Is suitable for the specified difficulty level
- Includes educational hints that guide without giving away the solution
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    let parsedResult;
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", text);
      
      // Fallback problem
      parsedResult = {
        title: "Array Sum",
        difficulty: difficulty,
        description: "Given an array of integers, find the sum of all elements. This problem teaches basic array iteration and accumulation.",
        examples: [
          {
            input: "nums = [1, 2, 3, 4, 5]",
            output: "15",
            explanation: "1 + 2 + 3 + 4 + 5 = 15"
          }
        ],
        constraints: [
          "1 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9"
        ],
        testCases: [
          { input: "[1,2,3,4,5]", target: null, expected: "15" },
          { input: "[0,0,0]", target: null, expected: "0" },
          { input: "[-1,1]", target: null, expected: "0" }
        ],
        functionSignature: "function arraySum(nums)",
        hints: [
          "Think about how to iterate through an array",
          "Consider using a variable to keep track of the running sum",
          "Remember to initialize your sum variable to 0"
        ],
        learningObjectives: [
          "Array iteration",
          "Variable accumulation",
          "Basic arithmetic operations"
        ]
      };
    }

    // Ensure the response has the required structure
    const finalResult = {
      title: parsedResult.title || "Array Problem",
      difficulty: parsedResult.difficulty || difficulty,
      description: parsedResult.description || "A coding problem",
      examples: parsedResult.examples || [],
      constraints: parsedResult.constraints || [],
      testCases: parsedResult.testCases || [],
      functionSignature: parsedResult.functionSignature || "function solve()",
      hints: parsedResult.hints || [
        "Think about the problem step by step",
        "Consider different approaches",
        "Test your solution with examples"
      ],
      learningObjectives: parsedResult.learningObjectives || [
        "Problem-solving skills",
        "Algorithm design",
        "Code implementation"
      ]
    };

    return NextResponse.json(finalResult);

  } catch (error) {
    console.error("Error in problem generation API:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        title: "Fallback Problem",
        difficulty: "Easy",
        description: "A simple coding problem",
        examples: [],
        constraints: [],
        testCases: [],
        functionSignature: "function solve()"
      },
      { status: 500 }
    );
  }
} 