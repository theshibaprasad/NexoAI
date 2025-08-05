"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ value, onChange, language, placeholder }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    onChange(value || "");
  };

  const getMonacoLanguage = (language) => {
    const languageMap = {
      javascript: "javascript",
      python: "python",
      java: "java",
      cpp: "cpp",
      csharp: "csharp",
      go: "go",
      rust: "rust",
      php: "php",
      ruby: "ruby",
      swift: "swift",
    };
    return languageMap[language] || "javascript";
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="bg-gray-900 text-gray-300 p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm text-gray-400">
            {language.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="h-96">
        <Editor
          height="100%"
          defaultLanguage={getMonacoLanguage(language)}
          language={getMonacoLanguage(language)}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            glyphMargin: true,
            fixedOverflowWidgets: true,
          }}
        />
      </div>
    </Card>
  );
};

export default CodeEditor; 