import React from 'react';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import ControlPanel from './control-panel.tsx';

const API_KEY = 'AIzaSyDkzO6s6YGwc3GuJIuADmZoM2xyyZrvAiE'
// const API_KEY =
// globalThis.GOOGLE_MAPS_API_KEY ?? (process.meta.env.GOOGLE_MAPS_API_KEY as string);
export const DetailsMap = ({ lat, lng }) => {
    // const latToRender = (+lat > -90 && +lat < 90) ? +lat : 89
    // const lngToRender = (+lng > -180 && +lng < 180) ? +lng : 89
    return < APIProvider apiKey={API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
            style={{ width: '100%', height: '480px' }}
            defaultZoom={13}
            // defaultCenter={{ lat: latToRender, lng: lngToRender }}
            defaultCenter={{ lat, lng }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
        </Map>
        <ControlPanel />
    </APIProvider >
};
// export default DetailsMap;
