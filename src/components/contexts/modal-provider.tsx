import { useEffect, useState } from "react";
import { SettingsModal } from "../modals/settings-modal";
import { ConfirmUserDeactivateModal } from "../modals/confirm-user-deactivate-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <ConfirmUserDeactivateModal />
    </>
  );
};
