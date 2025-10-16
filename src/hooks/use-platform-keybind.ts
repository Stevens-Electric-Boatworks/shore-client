import { useCallback, useEffect } from "react";

const usePlatformSpecificKeybind = (
  keyCombination: string,
  callback: () => void
) => {
  const isMac =
    typeof window !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Determine the correct modifier key based on the OS
      const modifierPressed = isMac ? event.metaKey : event.ctrlKey;

      // Check if the specified key and the correct modifier are pressed
      if (
        modifierPressed &&
        event.key.toLowerCase() === keyCombination.toLowerCase()
      ) {
        event.preventDefault(); // Prevent default browser behavior (e.g., saving page)
        callback();
      }
    },
    [keyCombination, callback, isMac]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default usePlatformSpecificKeybind;
