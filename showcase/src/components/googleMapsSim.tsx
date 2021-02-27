import React from 'react'
import '../App.css';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '15px'
};

const center = {
  lat: 40.737344,
  lng: -73.992677
};

function GoogleMapsSim() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAgoecKIEYU9ADNWQJTXfXNMeo8JzCcKEY"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className={'App'}>
      <h1>Google-Sim</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}

export default GoogleMapsSim