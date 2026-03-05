"use client";

export const GNSSStatus = () => {
  return (
    <div className="border bg-white flex-1">
      <div className="border-b bg-linear-to-b from-zinc-100 to-zinc-300 px-2">
        <p className="font-bold">Status</p>
      </div>
      <div className="flex flex-col">
        <table>
          <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold [&>tr>td]:px-2">
            <tr>
              <td>Time</td>
              <td></td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td></td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td></td>
            </tr>
            <tr>
              <td>Alt</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Track</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Climb</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
