"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { ComponentType, useEffect, useRef, useState } from "react";
import { useSocketStore } from "@/store/useSocketStore";
import { Map as LeafletMap } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

let DefaultIcon;
if (typeof window !== "undefined") {
  import("leaflet").then((L) => {
    DefaultIcon = new L.Icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  });
}

export const Map = () => {
  const { data } = useSocketStore();
  const mapRef = useRef<LeafletMap | null>(null);

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    const lat = data.get("lat")?.value || 0;
    const long = data.get("long")?.value || 0;
    setLat(lat);
    setLong(long);

    mapRef.current?.setView([lat, long], mapRef.current.getZoom(), {
      animate: false,
    });
  }, [data]);

  return (
    <div className="rounded-md border overflow-hidden">
      <MapContainer
        center={[lat, long]}
        zoom={15}
        style={{ height: "200px", width: "100%" }}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //   attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, long]} />
      </MapContainer>
    </div>
  );
};
