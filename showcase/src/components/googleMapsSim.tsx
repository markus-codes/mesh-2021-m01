import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import '../App.css';
import * as coordinates from '../mock/coordinates.json';

const containerStyle = {
  width: '800px',
  height: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '15px'
};

const customMapOptions: google.maps.MapTypeStyle[] =
  [
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ]

function GoogleMapsSim() {
  let markers: google.maps.Marker[]
  const center = { lat: 40.737344, lng: -73.99267 }

  const [map, setMap] = useState()
  let currentPoints: { x: number, y: number }[]

  for (let i = 0; i < coordinates[0].length; i++) {
    setTimeout(() => {
      currentPoints = [coordinates[0][i], coordinates[0][i + 1]]
      updateMarker()
    }, 2000 * i)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAgoecKIEYU9ADNWQJTXfXNMeo8JzCcKEY"
  })

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const updateMarker = () => {
    if (map) {
      typeof (markers) !== 'undefined' && clearMarkers(markers)
      markers = currentPoints.map((coordinat, i) => createMarker({ lat: coordinat?.x, lng: coordinat?.y }, map))
    }
  }

  function createMarker(position: any, map: any) {
    return new window.google.maps.Marker({
      position: position,
      map: map
    });
  }

  function clearMarkers(markers: any) {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  return isLoaded ? (
    <div className={'App'}>
      <h1>Google-Sim</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        options={{
          disableDefaultUI: true, styles: customMapOptions
        }}>
      </GoogleMap>
    </div>
  ) : <></>
}

export default GoogleMapsSim
