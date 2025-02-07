import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { CodeEditorState } from "./../types/index";
import { Monaco } from "@monaco-editor/react";


const getInitialState = ()=>{
    //if we are on the server return default values
    if(typeof window =="undefined"){
        return {
            language:"javascript",
            fontSize:14,
            theme:"vs-dark",
    }
}
//if we are on the client, get the values from local storage bc localstorage is the browser api only
const savedLanguage=localStorage.getItem("editor-language")||"javascript";
const savedtheme=localStorage.getItem("editor-theme")||"vs-dark";
const savedFontSize=localStorage.getItem("editor-font-size")||14;
return {
    language:savedLanguage,
    theme:savedtheme,
    fontSize: Number(savedFontSize),
}
}

export const useCodeEditorStore = create<CodeEditorState>((set,get) =>{
    const initialState=getInitialState();
    return {
       ...initialState,
         output:"",
            isRunning:false,
            error:null,
            editor:null,
            executionResult:null,
            getCode:()=>get().editor?.getValue()||"",
            setEditor:(editor:Monaco)=>{
                const savedCode=localStorage.getItem(`editor-code-${get().language}`) 
                if(savedCode)editor.setValue(savedCode);
                set({editor});
            },
            setTheme: (theme: string) => {
                localStorage.setItem("editor-theme", theme);
                set({ theme });
              },
              setFontSize: (fontSize: number) => {
                localStorage.setItem("editor-font-size", fontSize.toString());
                set({ fontSize });
              }, 
              setLanguage: (language: string) => {
                // Save current language code before switching
                const currentCode = get().editor?.getValue();
                if (currentCode) {
                  localStorage.setItem(`editor-code-${get().language}`, currentCode);
                }
          
                localStorage.setItem("editor-language", language);
          
                set({
                  language,
                  output: "",
                  error: null,
                });
              },

              runCode: async () => {
                
              },
    }
})
