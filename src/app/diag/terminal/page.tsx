import { Terminal } from "@/components/terminal";

export default function TerminalPage() {
  return (
    <div className="flex flex-col h-full">
      <title>Terminal</title>
      <p className="text-xl font-bold mb-4">Terminal</p>
      <Terminal />
    </div>
  );
}
