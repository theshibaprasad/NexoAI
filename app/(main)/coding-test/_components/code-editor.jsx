"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ value, onChange, language, onLanguageChange, placeholder }) => {
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

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg">
      <div className="bg-gray-900 text-gray-300 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              Code Editor
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Language:</span>
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-32 h-8 bg-gray-800 border-gray-700 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {languages.map((lang) => (
                    <SelectItem 
                      key={lang.id} 
                      value={lang.id}
                      className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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