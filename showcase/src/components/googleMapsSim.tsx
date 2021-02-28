import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { useCreatWebSocket } from '../hooks/useCreatWebSocket';
import { VehicleInterface } from '../types/base';

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
  const center = { lat: 40.737344, lng: -73.99267 }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAgoecKIEYU9ADNWQJTXfXNMeo8JzCcKEY"
  })

  const [map, setMap] = useState()
  const [vehicle, setVehicle] = useState<VehicleInterface>()
  const [currentPoints, setCurrentPoints] = useState<VehicleInterface[]>([])
  const [markers, setMarkers] = useState<google.maps.Marker[]>()

  useCreatWebSocket(setVehicle)

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const updateMarker = () => {
    if (map) {
      clearMarkers(markers)
      setMarkers(currentPoints.map((coordinat, i) => createMarker({ lat: coordinat.currentLocation.x, lng: coordinat.currentLocation.y }, map)))
    }
  }

  const createMarker = (position: any, map: any) => {
    return new window.google.maps.Marker({
      position: position,
      map: map
    });
  }

  const clearMarkers = (markers: any) => {
    markers?.map((marker: { setMap: (arg0: null) => any; }) => marker.setMap(null))
  }

  useEffect(() => {
    if (vehicle?.id !== undefined) {
      if (currentPoints.indexOf(vehicle) === -1) {
        setCurrentPoints((oldPoints) => {
          oldPoints[vehicle.id] = vehicle
          return oldPoints
        })
      } else {
        setCurrentPoints([...currentPoints, vehicle])
      }
      updateMarker()
    }
  }, [vehicle, currentPoints])

  return isLoaded ? (
    <div className={'App'}>
      <h1>Google-Sim</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        options={{
          disableDefaultUI: true, styles: customMapOptions
        }}>
      </GoogleMap>
    </div>
  ) : <></>
}

export default GoogleMapsSim
