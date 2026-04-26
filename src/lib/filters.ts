import { LogEntry } from "@/slices/logsSlice";

export interface LogFilter {
  name: string;
  label: string;
  fn: (log: LogEntry) => boolean;
}

export const LOG_FILTERS: LogFilter[] = [
  {
    name: "hide_rosbridge",
    label: "Hide Rosbridge Logs",
    fn: (log) => {
      if (log.file) return !log.file.includes("rosbridge");
      else return true;
    },
  },
  {
    name: "errors_only",
    label: "Errors Only",
    fn: (log) => log.level >= 40,
  },
  {
    name: "warnings_only",
    label: "Warnings Only",
    fn: (log) => log.level < 40 && log.level >= 30,
  },
];
