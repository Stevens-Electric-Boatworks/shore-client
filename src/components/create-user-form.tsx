"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/auth/apiClient";
import { LineSpinner } from "ldrs/react";
import { useRouter } from "next/navigation";
import getErrorString from "@/lib/get-error-string";
import StopSvg from "@assets/stop.svg";
import Image from "next/image";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["USER", "ADMIN"]),
});

type FormData = z.infer<typeof schema>;

export const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (user: {
      username: string;
      password: string;
      role: string;
    }) => {
      return apiClient.put("/admin/user", {
        username: user.username,
        password: user.password,
        role: user.role,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: () => router.push("/access"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex flex-col">
        <label className="font-bold">Username</label>
        <input {...register("username")} className="border px-1"></input>
        {errors.username && (
          <span className="text-red-700">{errors.username.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Temporary Password</label>
        <p className="text-sm">
          The user will be required to set their own password when they log in
          for the first time.
        </p>
        <input
          {...register("password")}
          className="border px-1"
          type="password"
        ></input>

        {errors.password && (
          <span className="text-red-700">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Role</label>
        {schema.shape.role.options.map((role) => (
          <label key={role} className="flex items-center gap-1">
            <input {...register("role")} type="radio" value={role} />
            {role}
          </label>
        ))}
        {errors.role && (
          <span className="text-red-700">{errors.role.message}</span>
        )}
      </div>
      {mutation.isError && (
        <div className="border p-2 bg-red-200 text-red-800 flex gap-2 items-center">
          <Image src={StopSvg} alt="" className="w-8" />
          {getErrorString(mutation.error)}
        </div>
      )}
      <button
        className="bg-blue-600 text-white font-bold border-t-blue-400 border-l-blue-400 border-b-blue-700 border-r-blue-700 hover:bg-blue-700 p-2 border-2 cursor-pointer min-w-30 flex items-center justify-center"
        type="submit"
      >
        {mutation.isPending ? (
          <LineSpinner color="white" size={24} stroke={2} />
        ) : (
          "SUBMIT"
        )}
      </button>
    </form>
  );
};
