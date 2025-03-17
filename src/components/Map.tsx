import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
    locationX: string;
    locationY: string;
}

const Map: React.FC<MapProps> = ({ locationX, locationY }) => {
    const center = {
        lat: parseFloat(locationX) || -3.745,
        lng: parseFloat(locationY) || -38.523
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={15}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
