import React, {useEffect, useState} from "react";
import {load} from "@2gis/mapgl";

export const Test = () => {

  const [c, setC] = React.useState(0);
  const [address, setAddress] = React.useState('fdsfdsf');

  const MapWrapper = React.memo(
    () => {
      return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
  );
  const MapGL = ({setc, set_address}) => {
    React.useEffect(() => {
      (
        async () => {
          load().then((mapgl) => {
            const map = new mapgl.Map('map-container', {
              center: [55.31878, 25.23584],
              zoom: 13,
              key: process.env.REACT_APP_MAP_API_KEY,
            });

            let marker = new mapgl.Marker(map, {
              coordinates: [],
            });

            map.on('click', (e) => {
              var id = e.target.id;
              fetch(`https://catalog.api.2gis.com/3.0/items/byid?id=${id}&key=${process.env.REACT_APP_CATALOG_API_KEY}`)
                .then(c => c.json())
                .then(data => set_address(data.result.items[0].address_name));
              setc(e.lngLat[0]);
              marker.destroy();
              marker = new mapgl.Marker(map, {
                coordinates: [e.lngLat[0], e.lngLat[1]],
              });
            })

            // Destroy the map, if Map component is going to be unmounted
            return () => map.destroy();
          })
        }
      )()
    }, [])

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <MapWrapper />
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '60%' }}>
      <MapGL setc={(a) => setC(a)} set_address={(b) => setAddress(b)}/>
      <button onClick={(a) => {setC(c + 1)}}>{c}</button>
      <p>{address}</p>
    </div>
  )
}


/*
const MapWrapper = React.memo(
  () => {
    return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
  },
  () => true,
);
const MapGL = ({setc, set_address}) => {
  React.useEffect(() => {
    (
      async () => {
        const map = new mapgl.Map('map-container', {
          center: [55.31878, 25.23584],
          zoom: 13,
          key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
        });

        let marker = new mapgl.Marker(map, {
          coordinates: [],
        });

        map.on('click', (e) => {
          var id = e.target.id;
          fetch(`https://catalog.api.2gis.com/3.0/items/byid?id=${id}&key=rueotq8357`)
            .then(c => c.json())
            .then(data => set_address(data.result.items[0].address_name));
          setc(e.lngLat[0]);
          marker.destroy();
          marker = new mapgl.Marker(map, {
            coordinates: [e.lngLat[0], e.lngLat[1]],
          });
        })

        // Destroy the map, if Map component is going to be unmounted
        return () => map.destroy();
      }
    )()
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapWrapper />
    </div>
  );
};
const App = () => {


  return (
    <div style={{ width: '100%', height: '60%' }}>
      <MapGL setc={(a) => setC(a)} set_address={(b) => setAddress(b)}/>
      <button onClick={(a) => {setC(c + 1)}}>{c}</button>
      <p>{address}</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));*/
