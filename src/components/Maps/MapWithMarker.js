import React from "react";
import {load} from "@2gis/mapgl";

const MapWrapper = React.memo(
  ({ind, upInd}) => {
    return <div id={`map-container-${upInd}-${ind}`} style={{ width: '100%', height: '100%'}}></div>;
  },
  () => true,
);

export const MapWithMarker = ({lat, lng, ind, upInd}) => {
    React.useEffect(() => {
      (
        async () => {
          load().then((mapgl) => {
            const map = new mapgl.Map(`map-container-${upInd}-${ind}`, {
              center: [lat, lng],
              zoom: 13,
              key: process.env.REACT_APP_MAP_API_KEY,
            });

            let marker = new mapgl.Marker(map, {
              coordinates: [lat, lng],
            });

            // Destroy the map, if Map component is going to be unmounted
            return () => map.destroy();
          })
        }
      )()
    }, [])

    return (
      <div className='h-full w-full'>
        <MapWrapper ind={ind} upInd={upInd}/>
      </div>
    );
}