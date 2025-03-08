"use client"; // Ensures this runs in the browser

import { useEffect, useState } from "react";

// Lazy load LeafletMap to prevent SSR errors
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

// Use a static fallback map (e.g., Google Static Map or Mapbox Static API)
//import StaticMap from "./StaticMap";
import dynamic from "next/dynamic";

export default function MapWrapper() {
    const [showInteractive, setShowInteractive] = useState(false);

    useEffect(() => {
        setShowInteractive(true);
    }, []);

    return showInteractive ? <LeafletMap /> : <></>;
}
