"use client"; // Ensures this component runs only in the browser

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet (only loads on the client)
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });


import L from "leaflet";

// Manually reference marker icons
const customIcon = new L.Icon({
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const LeafletMap: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Ensures Leaflet only loads after hydration
    }, []);

    if (!mounted) return <></>; // Prevents hydration mismatch

    return (
        <MapContainer center={[0, 0]} zoom={3} className="leafletMap">
            <TileLayer url={`map/tiles/{z}/{x}/{y}.png`} noWrap={true} />
        </MapContainer>
    );
};

export default LeafletMap;

