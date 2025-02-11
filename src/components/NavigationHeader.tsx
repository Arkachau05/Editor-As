import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Code2, Laptop, Rocket, } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group relative">
       

      {/* Logo Container with Background */}
      <div className="relative flex items-center gap-2 px-4 py-1 rounded-full bg-[#0a0a0f] shadow-[0_0_0_2px_#000000_inset] dark:shadow-[0_0_0_2px_#ffffff_inset] transition-all">
        
        {/* Laptop Icon */}
        <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-1 rounded-lg ring-1
          ring-white/10 group-hover:ring-white/20 transition-all">
          <Laptop className="size-5 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
        </div>

        {/* Logo Text */}
        <div className="flex flex-col">
          <span className="block text-sm font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
          ᴇᴅɪᴛᴏʀ-ᴀs
          </span>
          <span className="block text-[10px] text-blue-400/60 font-medium">
            Interactive Editor
          </span>
        </div>
      </div>
    </Link>

            {/* snippets Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
      hover:bg-blue-500/10 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 
      shadow-lg overflow-hidden"
    >
      {/* Background Hover Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
        to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Icon */}
      <Code2 className="w-4 h-4 relative z-10 text-blue-400 transition-transform duration-300 group-hover:rotate-6 group-hover:text-purple-400" />

      {/* Gradient Text */}
      <span
        className="text-sm font-semibold relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
        text-transparent bg-clip-text transition-colors duration-300 group-hover:from-blue-300 
        group-hover:via-purple-300 group-hover:to-pink-300"
      >
        Snippets
      </span>
            </Link>
          </div>

          {/* right rection */}
          <div className="flex items-center gap-4">
            <SignedOut >
            <Link
              href="/pricing"
              className="relative flex items-center gap-2 px-5 py-2 rounded-lg border border-indigo-500/40 
              bg-gradient-to-r from-indigo-700/20 to-blue-700/20 text-indigo-300 text-sm font-medium 
              transition-all duration-300 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-blue-600/30"
            >
              {/* Rocket Icon */}
              <Rocket className="w-4 h-4 text-indigo-300 transition-all duration-300 group-hover:rotate-12 group-hover:text-indigo-200" />
        
              {/* Text */}
              <span className="text-sm font-semibold transition-all duration-300 group-hover:text-indigo-200">
                Upgrade to Pro
              </span>

            </Link>
            </SignedOut>

            {/* profile button */}
            
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;