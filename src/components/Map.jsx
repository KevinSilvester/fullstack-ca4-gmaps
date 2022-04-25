/**
 * @typedef {google.maps.Map} Map
 * @typedef {google.maps.MapOptions} MapOptions
 */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useJsApiLoader, Marker, GoogleMap } from '@react-google-maps/api'
import MapControl from './MapControl'
import { MAP_ID, MAP_LIBRARIES } from '../config/constants'

const Map = () => {
   const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'beta',
      libraries: MAP_LIBRARIES
   })

   /** @type {React.Ref<Map>} */
   const mapRef = useRef()

   /** @type {MapOptions} */
   const mapOptions = useMemo(
      () => ({
         mapId: MAP_ID,
         disableDefaultUI: true,
         fullscreenControl: true,
         streetViewControl: true
      }),
      []
   )

   const [displayControls, setDisplayControls] = useState(false)

   const birmingham = useMemo(() => ({ lat: 52.483726, lng: -1.892682 }), [])

   /**
    * @param {'tilt' | 'rotate'} mode
    * @param {number} amount
    */
   const adjustMap = function (mode, amount) {
      switch (mode) {
         case 'tilt':
            mapRef.current.setTilt(mapRef.current.getTilt() + amount)
            break
         case 'rotate':
            mapRef.current.setHeading(mapRef.current.getHeading() + amount)
            break
         default:
            break
      }
   }

   const onMapLoad = useCallback(map => {
      mapRef.current = map
      setDisplayControls(true)
   }, [])

   if (loadError) {
      return <div>Error loading maps</div>
   }

   if (!isLoaded) {
      return <div>Loading...</div>
   }

   return (
      <div className='map__wrapper'>
         <GoogleMap
            mapContainerClassName='map__container'
            zoom={10}
            center={birmingham}
            options={mapOptions}
            onLoad={onMapLoad}
         >
            {displayControls && (
               <>
                  <Marker position={birmingham} />
                  <MapControl position='TOP_CENTER' onClick={() => adjustMap('tilt', -10)}>
                     Tilt Up
                  </MapControl>
                  <MapControl position='BOTTOM_CENTER' onClick={() => adjustMap('tilt', 10)}>
                     Tilt Down
                  </MapControl>
                  <MapControl position='LEFT_CENTER' onClick={() => adjustMap('rotate', 45)}>
                     Rotate Left
                  </MapControl>
                  <MapControl position='RIGHT_CENTER' onClick={() => adjustMap('rotate', -45)}>
                     Rotate Right
                  </MapControl>
               </>
            )}
         </GoogleMap>
      </div>
   )
}

export default Map
