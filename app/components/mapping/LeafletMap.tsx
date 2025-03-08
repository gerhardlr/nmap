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
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

// Manually reference marker icons
const customIcon = new L.Icon({
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const LeafletMap: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        setMounted(true); // Ensures Leaflet only loads after hydration
    }, []);




    if (!mounted) return <></>; // Prevents hydration mismatch

    return (
        <>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Map Type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="" control={<Radio />} label="OpenStreet" />
                    <FormControlLabel value="2" control={<Radio />} label="Pioneer" />
                    <FormControlLabel value="3" control={<Radio />} label="WaterColour" />
                </RadioGroup>
            </FormControl>
            <MapContainer center={[0, 0]} zoom={3} className="leafletMap">
                <TileLayer url={`map/tiles${value}/{z}/{x}/{y}.png`} noWrap={true} />
                <Marker position={[0, -0]} icon={customIcon}>
                    <Popup>Dummy Popup</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default LeafletMap;

