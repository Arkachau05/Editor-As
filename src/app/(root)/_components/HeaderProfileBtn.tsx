"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <>
<div className="flex justify-center items-center space-x-4">
      {/* User Button with Profile Picture Border */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "border-2 border-gray-500 hover:border-blue-400 transition-all duration-300 rounded-full",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-6" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      {/* Signed Out State */}
      
    
  

      <SignedOut>
      <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        <SignInButton />
        </span>
      </div>
      </SignedOut>
      
    </div>
    </>
  );
}
export default HeaderProfileBtn;