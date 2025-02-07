"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg transition-all duration-200 
      bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
      disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 
      group-hover:opacity-100 bg-green-400/20 blur-md" />

      {/* Button Content */}
      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white/80" />
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 text-white/90 transition-transform hover:scale-110" />
            <span className="text-sm font-medium text-white/90 hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </button>
  );
}

export default RunButton;
