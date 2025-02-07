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
        <SignInButton />
      </SignedOut>
    </div>
    </>
  );
}
export default HeaderProfileBtn;