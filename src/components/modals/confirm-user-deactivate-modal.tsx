import { useModal } from "@/hooks/use-modal";
import { apiClient } from "@/lib/auth/apiClient";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { LineSpinner } from "ldrs/react";
import { useRouter } from "next/navigation";

import QuestionSvg from "@assets/question.svg";
import Image from "next/image";

interface DataProps {
  id?: string;
}

export const ConfirmUserDeactivateModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "confirmUserDeactivation";

  const mutation = useMutation({
    mutationFn: async () => {
      if (!data) return;
      const id = (data as DataProps).id;
      if (!id) return;
      await apiClient.post(`/admin/user/${id}`, {
        active: false,
      });
    },
    onSuccess: () => {
      router.push("/access");
      onClose();
    },
  });

  const getErrorString = (err: Error) => {
    if (axios.isAxiosError(err)) {
      if (err.response) return err.response.data.error;
      else return err.message;
    }

    return err.message;
  };

  if (!isModalOpen) return null;

  return (
    <div className="absolute z-30 h-screen w-screen bg-black/40 flex items-center justify-center">
      <div className="border bg-white w-[40%]">
        <div className="bg-gradient-to-b from-zinc-100 to-zinc-300 border-b px-2 flex items-center">
          <p className="font-bold">Confirm User Deactivation</p>
        </div>
        <div className="p-4 flex gap-4 items-center">
          {mutation.isError ? (
            <p>{getErrorString(mutation.error)}</p>
          ) : (
            <>
              <Image
                src={QuestionSvg}
                alt="Question mark icon"
                width={100}
                draggable={false}
              />
              <p>
                Are you sure you want to deactivate this user? This action can
                only be undone by manually editing the database (which is
                dangerous).
              </p>
            </>
          )}
        </div>
        <div className="p-2 bg-zinc-200 border-t-zinc-100 border-t-2 flex gap-2 justify-end">
          {mutation.isError ? (
            <button
              className="button button-blue min-w-30"
              onClick={() => {
                mutation.reset();
                onClose();
              }}
            >
              Ok
            </button>
          ) : (
            <>
              <button className="button button-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="button button-red"
                onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? (
                  <LineSpinner size={24} stroke={2} color="white" />
                ) : (
                  "Deactivate"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
