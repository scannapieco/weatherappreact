import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ lat, lon }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (lat && lon && !mapRef.current) {
            const map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);
            L.marker([lat, lon]).addTo(map).bindPopup('Ubicación actual').openPopup();

            mapRef.current = map;
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [lat, lon]);

    return <div id="map" style={{ height: '300px', width: '100%', margin: '20px auto', borderRadius: '8px' }}></div>;
};

export default Map;