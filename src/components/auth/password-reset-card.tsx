"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { NavButton } from "../ui/nav-button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import { useAuth } from "../contexts/AuthContext";

import StopSvg from "@assets/stop.svg";
import Image from "next/image";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 chars")
      .regex(/[A-Z]/, "Needs one uppercase letter")
      .regex(/[0-9]/, "Needs one number"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords must match",
    path: ["password2"], // attach error to specific field
  });

type FormData = z.infer<typeof formSchema>;

export const PasswordResetCard = () => {
  const {
    register, // connects inputs to the form
    handleSubmit, // wraps your submit handler
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // errors fire on submit by default
    // change with mode: "onChange" | "onBlur"
  });

  const { resetPassword } = useAuth();

  const onSubmit = async (data: FormData) => {
    resetPassword(data.password);
  };

  // errors.username?.message → string | undefined
  // isSubmitting → true while onSubmit is running

  return (
    <div className="border bg-white w-80">
      <div className="border-b bg-gradient-to-b from-zinc-100 to-zinc-300 px-2">
        <p>Reset Password</p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex gap-2 items-center">
          <Image src={StopSvg} alt="Stop icon" width={60} />
          <p>You need to reset your password to continue.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold">
              New Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={cn("border", errors.password && "border-red-700")}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password2" className="font-bold">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("password2")}
              className={cn("border", errors.password2 && "border-red-700")}
            />
            {errors.password2 && (
              <p className="text-red-700">{errors.password2.message}</p>
            )}
          </div>

          {/*{mutation.isError && (
            <div className="border p-2 border-red-800/50 bg-red-200 text-red-800">
              <p>{mutation.error.message}</p>
            </div>
          )}*/}

          <NavButton>SUBMIT</NavButton>
        </form>
      </div>
    </div>
  );
};
