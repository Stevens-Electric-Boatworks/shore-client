"use client";

export const BuildInfo = () => {
  return (
    <div className="border bg-white p-2">
      <p className="font-bold uppercase">Build Information</p>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Built At</td>
            <td className="text-end">
              {new Date(
                process.env.NEXT_PUBLIC_BUILD_TIME as string
              ).toLocaleString() || "dev"}
            </td>
          </tr>
          <tr>
            <td>Commit ID</td>
            <td className="text-end">
              {process.env.NEXT_PUBLIC_COMMIT_SHA || "dev"}
            </td>
          </tr>
          <tr>
            <td>Build ID</td>
            <td className="text-end">
              {process.env.NEXT_PUBLIC_BUILD_ID || "dev"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
