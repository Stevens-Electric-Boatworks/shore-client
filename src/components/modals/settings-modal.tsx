import { useModal } from "@/hooks/use-modal";
import { AudioSettings } from "../settings/audio-settings";

export const SettingsModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "settings";

  if (!isModalOpen) return null;
  return (
    <div className="absolute z-30 h-screen w-screen bg-black/40 flex items-center justify-center">
      <div className="border bg-white min-w-xl">
        <div className="bg-gradient-to-b from-zinc-100 to-zinc-300 border-b px-2 flex items-center">
          <p>Settings</p>
          <button
            className="ml-auto hover:cursor-pointer hover:saturate-150 hover:brightness-110 active:brightness-75 py-[1px] select-none"
            onClick={onClose}
          >
            <img src={"/close.gif"} alt="Close" draggable={false} />
          </button>
        </div>
        <div className="p-2">
          <p className="text-xl">Audio</p>
          <div className="border-b border-neutral-400 mb-3" />
          <AudioSettings />
        </div>
      </div>
    </div>
  );
};
