import { UsersTable } from "@/components/users-table";
import Link from "next/link";

export default function AccessPage() {
  return (
    <div className="flex gap-2">
      <UsersTable />
      <div className="flex flex-col flex-1">
        <div className="border bg-white">
          <div className="sticky top-0 border-b bg-gradient-to-b from-zinc-100 to-zinc-300 px-2">
            Quick Actions
          </div>
          <div className="p-2">
            <Link
              href={"/access/create"}
              className="text-blue-700 underline hover:cursor-pointer hover:text-blue-800"
            >
              Add a new user
            </Link>
            <p>Revoke all sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
