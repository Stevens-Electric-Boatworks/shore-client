"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { NavButton } from "../ui/nav-button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 chars")
    .max(20, "Username too long")
    .regex(/^[a-z0-9_]+$/, "Only lowercase, numbers, underscores"),

  password: z
    .string()
    .min(8, "Password must be at least 8 chars")
    .regex(/[A-Z]/, "Needs one uppercase letter")
    .regex(/[0-9]/, "Needs one number"),
});

type LoginData = z.infer<typeof loginSchema>;

export const LoginCard = () => {
  const {
    register, // connects inputs to the form
    handleSubmit, // wraps your submit handler
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    // errors fire on submit by default
    // change with mode: "onChange" | "onBlur"
  });

  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    // only called if Zod validation passes
    try {
      await login(data.username, data.password);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const res = err.response;
        setError(res.data.error);
        return;
      }
      setError("An unknown error has occurred. Try again.");
    }
  };

  // errors.username?.message → string | undefined
  // isSubmitting → true while onSubmit is running

  return (
    <div className="border bg-white w-80">
      <div className="border-b bg-gradient-to-b from-zinc-100 to-zinc-300 px-2">
        <p>Login</p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              {...register("username")}
              className={cn("border", errors.username && "border-red-700")}
            />
            {errors.username && (
              <p className="text-red-700">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              className={cn("border", errors.password && "border-red-700")}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="border p-2 border-red-800/50 bg-red-200 text-red-800">
              <p>{error}</p>
            </div>
          )}

          <NavButton>SUBMIT</NavButton>
        </form>
      </div>
    </div>
  );
};
