import { CreateUserForm } from "@/components/create-user-form";

export default function CreateUserPage() {
  return (
    <div>
      <p className="text-xl font-bold">Create User</p>
      <div className="border p-2 bg-white max-w-125">
        <CreateUserForm />
      </div>
    </div>
  );
}
