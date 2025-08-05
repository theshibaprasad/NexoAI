import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { code, language, problem } = await request.json();

    if (!code || !language || !problem) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create test cases from the problem
    const testCases = problem.testCases.map((testCase, index) => ({
      input: testCase.input,
      target: testCase.target,
      expected: testCase.expected,
      index: index + 1,
    }));

    // Prepare the prompt for Gemini AI
    const prompt = `
You are an expert code execution and testing system. Please execute and test the following code with detailed analysis:

PROBLEM: ${problem.title}
DESCRIPTION: ${problem.description}

CODE (${language}):
${code}

TEST CASES:
${testCases.map(tc => `Test Case ${tc.index}: Input: ${tc.input}, Target: ${tc.target}, Expected Output: ${tc.expected}`).join('\n')}

Please provide a comprehensive analysis:

1. **Code Analysis**: Check for syntax errors, logical errors, and potential issues
2. **Execution**: Run the code for each test case
3. **Performance**: Estimate execution time and memory usage
4. **Feedback**: Provide detailed explanations for any failures
5. **Suggestions**: If code fails, suggest improvements

Return your response in the following JSON format:
{
  "success": boolean,
  "error": "error message if any",
  "executionTime": number,
  "memoryUsage": "memory usage string",
  "passedTests": number,
  "totalTests": number,
  "analysis": "detailed analysis of the code",
  "suggestions": "improvement suggestions if any",
  "testCases": [
    {
      "index": number,
      "status": "passed|failed|error",
      "input": string,
      "expected": string,
      "output": string,
      "error": "error message if any",
      "explanation": "detailed explanation of the result"
    }
  ]
}

Important Guidelines:
- If there are syntax errors, set success to false and provide clear error message
- If the code runs but fails test cases, set success to false but provide detailed test case results
- Only set success to true if ALL test cases pass
- Provide realistic execution time and memory usage estimates
- Be strict with output format matching (spaces, brackets, etc.)
- Give constructive feedback and suggestions for improvement
- Explain why each test case passed or failed
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    let parsedResult;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", text);
      
      // Fallback response
      parsedResult = {
        success: false,
        error: "Failed to parse AI response. Please try again.",
        executionTime: 0,
        memoryUsage: "N/A",
        passedTests: 0,
        totalTests: testCases.length,
        testCases: testCases.map(tc => ({
          index: tc.index,
          status: "error",
          input: tc.input,
          expected: tc.expected,
          output: "N/A",
          error: "Failed to execute test case"
        }))
      };
    }

    // Ensure the response has the required structure
    const finalResult = {
      success: parsedResult.success || false,
      error: parsedResult.error || null,
      executionTime: parsedResult.executionTime || 0,
      memoryUsage: parsedResult.memoryUsage || "N/A",
      passedTests: parsedResult.passedTests || 0,
      totalTests: parsedResult.totalTests || testCases.length,
      analysis: parsedResult.analysis || "No analysis available",
      suggestions: parsedResult.suggestions || "No suggestions available",
      testCases: parsedResult.testCases || testCases.map(tc => ({
        index: tc.index,
        status: "error",
        input: tc.input,
        expected: tc.expected,
        output: "N/A",
        error: "Failed to execute test case",
        explanation: "Test case execution failed"
      }))
    };

    return NextResponse.json(finalResult);

  } catch (error) {
    console.error("Error in coding test API:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        success: false,
        executionTime: 0,
        memoryUsage: "N/A",
        passedTests: 0,
        totalTests: 0,
        testCases: []
      },
      { status: 500 }
    );
  }
} 