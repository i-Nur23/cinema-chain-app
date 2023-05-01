import React, {useState} from "react";
import {load} from "@2gis/mapgl";

const MapWrapper = React.memo(
  () => {
    return <div id="map-container" style={{ width: '100%', height: '100%'}} className='cont'></div>;
  },
  () => true,
);

export const AdminMap = ({lat, lng, setLngLat, setFullAddress}) => {
  const [longitude, setLng] = useState(0);
  const [latitude, setLat] = useState(0);

  React.useEffect(() => {
    (
      () => {

        load().then((mapgl) => {
          const map = new mapgl.Map("map-container", {
            center: [lat, lng],
            zoom: 13,
            key: process.env.REACT_APP_MAP_API_KEY,
          });

          let marker = new mapgl.Marker(map, {
            coordinates: [lat, lng],
          });

          map.on('click', (e) => {
            try {
              var id = e.target.id;
              fetch(`https://catalog.api.2gis.com/3.0/items/byid?id=${id}&key=${process.env.REACT_APP_CATALOG_API_KEY}`)
                .then(c => c.json())
                .then(data => {
                  var full_address = data.result.items[0].full_name;
                  var ind = full_address.indexOf(', ');
                  setFullAddress(full_address.substr(ind + 2),
                    full_address.substring(0, ind))
                });
              setLngLat(e.lngLat[1], e.lngLat[0] );
              marker.destroy();
              marker = new mapgl.Marker(map, {
                coordinates: [e.lngLat[0], e.lngLat[1]],
              });
            } catch (e) {

            }
          })

          // Destroy the map, if Map component is going to be unmounted
          return () => map.destroy();
        })
      }
    )()
  }, [])

  return (
    <div className='h-full w-full'>
      <MapWrapper/>
    </div>
  );
}