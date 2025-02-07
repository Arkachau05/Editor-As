"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Lock } from "lucide-react";
import useMounted from "@/hooks/useMounted";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();

  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;

    setLanguage(langId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-3 py-2 bg-[#1e1e2e]/80 
        rounded-md transition-all border border-white/50 hover:border-white 
        ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="size-5 rounded-md bg-gray-800/50 p-0.5">
          <Image
            src={currentLanguageObj.logoPath}
            alt="programming language logo"
            width={20}
            height={20}
            className="w-full h-full object-contain"
          />
        </div>

        <span className="text-white text-sm min-w-[70px] text-left">
          {currentLanguageObj.label}
        </span>

        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-[#1e1e2e]/95 backdrop-blur-xl
           rounded-md border border-white/50 shadow-lg py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-700">
              <p className="text-xs font-medium text-gray-400">Select Language</p>
            </div>

            <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400">
              {Object.values(LANGUAGE_CONFIG).map((lang) => {
                const isLocked = !hasAccess && lang.id !== "javascript";

                return (
                  <div key={lang.id} className="relative px-2">
                    <button
                      className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-md transition-all text-sm
                      ${language === lang.id ? "bg-white/10 text-white" : "text-gray-300 hover:bg-[#262637]"}
                      ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => handleLanguageSelect(lang.id)}
                      disabled={isLocked}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative size-6 rounded bg-gray-800/50 p-1">
                          <Image width={18} height={18} src={lang.logoPath} alt={lang.label} className="w-full h-full" />
                        </div>
                        <span className="text-left">{lang.label}</span>
                      </div>

                      {isLocked && <Lock className="size-4 text-gray-500" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
