"use client";

import { isResolvedLazyResult } from "next/dist/server/lib/lazy-result";

type NavButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  errorFlash?: boolean;
  disabled?: boolean;
  size?: "regular" | "small";
};

export const NavButton = ({
  children,
  onClick,
  disabled,
  size = "regular",
}: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${size == "small" && "min-w-[60px] px-2 text-sm"} ${size == "regular" && "min-w-[100px] p-2"} border-2
      cursor-pointer flex justify-center items-center bg-blue-600 text-white font-bold
      border-t-blue-400 border-l-blue-400 border-b-blue-700
      border-r-blue-700 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
