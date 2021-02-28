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
  const center = { lat: 40.736300, lng: -73.99267  }

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
      setMarkers(currentPoints.map((coordinat, i) => createMarker({ lat: coordinat.currentLocation.x, lng: coordinat.currentLocation.y }, map, coordinat.isFine)))
    }
  }

  const createMarker = (position: any, map: any, isFine: boolean) => {
    const svgMarker = {
      path:
        "m -0.01694917,-32.135593 c -5.52200003,0 -9.99999983,4.478 -9.99999983,10 0,9.999999 9.99999983,22.00000017 9.99999983,22.00000017 0,0 9.99999997,-12.00000117 9.99999997,-22.00000017 0,-5.522 -4.4780002,-10 -9.99999997,-10 z m 0,15.999999 c -3.31400003,0 -6.00000003,-2.686 -6.00000003,-5.999999 0,-3.314 2.686,-6 6.00000003,-6 3.31399997,0 5.99999977,2.686 5.99999977,6 0,3.313999 -2.6859998,5.999999 -5.99999977,5.999999 z",
      fillColor: isFine ? 'green' : 'red',
      fillOpacity: 0.8,
      strokeWeight: 0,
      rotation: 0,
      scale: 1.5,
      anchor: new google.maps.Point(0, 0),
    };
    return new window.google.maps.Marker({
      position: position,
      map: map,
      icon: svgMarker
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
      <h1>Google Maps Simulation Save Ride</h1>
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
