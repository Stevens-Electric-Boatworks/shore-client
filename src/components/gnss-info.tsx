import { parseNmeaSentence } from "nmea-simple";

const rows = [
  {
    sat_id: 1,
    prn: 2,
    elev: 30.49,
    azim: 44.13,
    snr: 23.5,
    use: true,
  },
  {
    sat_id: 2,
    prn: 5,
    elev: 45.12,
    azim: 102.34,
    snr: 35.7,
    use: true,
  },
  {
    sat_id: 3,
    prn: 8,
    elev: 12.76,
    azim: 210.89,
    snr: 18.2,
    use: false,
  },
  {
    sat_id: 4,
    prn: 11,
    elev: 67.33,
    azim: 305.44,
    snr: 41.9,
    use: true,
  },
  {
    sat_id: 5,
    prn: 14,
    elev: 25.58,
    azim: 150.22,
    snr: 27.6,
    use: true,
  },
  {
    sat_id: 6,
    prn: 17,
    elev: 9.84,
    azim: 78.65,
    snr: 12.4,
    use: false,
  },
  {
    sat_id: 7,
    prn: 20,
    elev: 53.91,
    azim: 189.73,
    snr: 38.1,
    use: true,
  },
  {
    sat_id: 8,
    prn: 23,
    elev: 38.47,
    azim: 267.18,
    snr: 29.3,
    use: true,
  },
  {
    sat_id: 9,
    prn: 26,
    elev: 72.15,
    azim: 15.92,
    snr: 45.0,
    use: true,
  },
  {
    sat_id: 10,
    prn: 29,
    elev: 18.62,
    azim: 332.47,
    snr: 21.8,
    use: false,
  },
  {
    sat_id: 11,
    prn: 31,
    elev: 59.28,
    azim: 120.56,
    snr: 33.4,
    use: true,
  },
];

const sentences = [
  "$GPGSV,3,1,11,10,63,137,17,07,61,098,15,05,59,290,20,08,54,157,30*70",
  // "$GPGSV,2,1,08,02,67,123,45,05,45,067,42,12,34,305,40,15,12,078,38*70",
  // "$GPGSV,2,2,08,17,56,210,43,19,23,150,39,24,10,320,35,28,75,250,47*71",
];

export const GNSSInfo = () => {
  const packet = parseNmeaSentence(sentences[0]);
  if (packet.sentenceId == "GSV") {
  }

  return (
    <div className="flex gap-2">
      <div>
        <p>Status</p>
        <table className="border bg-white">
          <colgroup>
            <col
              span={1}
              className="bg-gradient-to-l from-zinc-100 to-zinc-300 w-[180px] border-r"
            />
            <col span={1} className="w-[300px]" />
          </colgroup>
          <tbody>
            <tr>
              <td>Time</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>10</td>
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
      <div>
        <p>Space Vehicles</p>
        <table className="border bg-white">
          <colgroup>
            <col span={1} className="w-[100px]" />
            <col span={1} className="w-[60px]" />
            <col span={1} className="w-[100px]" />
            <col span={1} className="w-[100px]" />
            <col span={1} className="w-[100px]" />
            <col span={1} className="w-[40px]" />
          </colgroup>
          <thead className="sticky top-0 bg-gradient-to-b from-zinc-100 to-zinc-300 text-left border-b">
            <tr>
              <td>GNSS</td>
              <td>PRN</td>
              <td>Elev</td>
              <td>Azim</td>
              <td>SNR</td>
              <td>Use</td>
            </tr>
          </thead>
          <tbody>
            {rows
              .sort((a, b) => (b.use ? 1 : 0) - (a.use ? 1 : 0))
              .map((e, idx) => (
                <tr key={idx}>
                  <td>{e.sat_id}</td>
                  <td>{e.prn}</td>
                  <td>{e.elev}</td>
                  <td>{e.azim}</td>
                  <td>{e.snr}</td>
                  <td>{e.use ? "Y" : "N"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
