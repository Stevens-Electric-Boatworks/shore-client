"use client";

import { Triangle, User } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import { useState } from "react";

export const UsernameStatusBar = () => {
  const { user, logout } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="relative" onClick={() => setDropdownVisible((s) => !s)}>
      <div className="flex gap-2 items-center hover:cursor-pointer hover:bg-black/20 px-2">
        <User className="w-4 h-4" />
        <p className="underline select-none">{user?.username}</p>
      </div>
      {isDropdownVisible && (
        <div className="absolute top-full border p-2 bg-white z-50 space-y-2">
          <p className="font-bold text-lg">Options</p>
          <button
            className="border-2 p-2
        cursor-pointer flex justify-center items-center bg-red-600 text-white font-bold
        border-t-red-400 border-l-red-400 border-b-red-700
        border-r-red-700 hover:bg-red-700 uppercase "
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
