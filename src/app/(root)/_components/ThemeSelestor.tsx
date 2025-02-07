"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative text-xs" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-36 flex items-center gap-2 px-3 py-2 bg-[#1e1e2e] border border-white 
        hover:bg-[#262637] rounded-md transition-all duration-150"
      >
        <Palette className="w-3 h-3 text-gray-400" />
        <span className="text-gray-300 min-w-[60px] text-left">{currentTheme?.label}</span>
        <div
          className="w-3 h-3 rounded-full border border-white"
          style={{ background: currentTheme?.color }}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-full min-w-[180px] bg-[#1e1e2e] 
            border border-white rounded-md py-1 z-50"
          >
            {/* Header */}
            <div className="px-2 pb-1 mb-1 border-b border-white">
              <p className="text-[10px] text-gray-400">Select Theme</p>
            </div>

            {/* Theme Options */}
            <div className="space-y-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-gray-300 text-left transition-all duration-150 
                  border border-white
                  ${currentTheme?.id === t.id ? "bg-blue-500/10 text-blue-400" : ""}
                  hover:bg-[#262637]`}
                  onClick={() => setTheme(t.id)}
                >
                  {/* Icon */}
                  <div className="w-5 h-5 flex items-center justify-center rounded-md bg-gray-800 text-gray-400">
                    {THEME_ICONS[t.id] || <CircleOff className="w-3 h-3" />}
                  </div>

                  {/* Label */}
                  <span className="flex-1">{t.label}</span>

                  {/* Color Indicator */}
                  <div
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ background: t.color }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
