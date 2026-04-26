"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store";
import MapLibre, { Marker, type MapRef } from "react-map-gl/maplibre";

export const Map = () => {
  const data = useStore((s) => s.data);
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    setLat((data.get("lat")?.value as number) ?? 0);
    setLong((data.get("long")?.value as number) ?? 0);
  }, [data]);

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  return (
    <div className="rounded-md border overflow-hidden w-full aspect-square">
      <MapLibre
        initialViewState={{ longitude: -74, latitude: 40.7, zoom: 6 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={
          "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        }
        ref={mapRef}
      >
        <Marker latitude={lat} longitude={long} />
      </MapLibre>
    </div>
  );
};
