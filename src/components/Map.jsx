/**
 * @typedef {google.maps.Map} Map
 * @typedef {google.maps.MapOptions} MapOptions
 */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useJsApiLoader, Marker, GoogleMap } from '@react-google-maps/api'
import {
   AmbientLight,
   DirectionalLight,
   Matrix4,
   PerspectiveCamera,
   Scene,
   WebGLRenderer
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ThreeJSOverlayView } from '@googlemaps/three'
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

   const birmingham = useMemo(() => ({ lat: 52.483726, lng: -1.892682 }), [])
   const [displayControls, setDisplayControls] = useState(false)
   const [coordinates, setCoordinates] = useState({ lat: 52.483726, lng: -1.892682 })
   
   /** @type {MapOptions} */
   const mapOptions = useMemo(
      () => ({
         mapId: MAP_ID,
         disableDefaultUI: true,
         fullscreenControl: true,
         streetViewControl: true,
         center: birmingham,
         zoom: 18,
         tilt: 0,
         heading: 0
      }),
      []
   )

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

      // const scene = new Scene()
      // const ambientLight = new AmbientLight(0xffffff, 0.75)
      // const directionalLight = new DirectionalLight(0xffffff, 0.25)
      // directionalLight.position.set(0, 10, 50)
      // scene.add(ambientLight)
      // scene.add(directionalLight)

      // const gltfLoader = new GLTFLoader()
      // const url = 'https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf'

      // gltfLoader.load(url, gltf => {
      //    gltf.scene.scale.set(10, 10, 10)
      //    gltf.scene.rotation.x = Math.PI / 2
      //    scene.add(gltf.scene)
      // })

      // new ThreeJSOverlayView({
      //    map,
      //    scene,
      //    anchor: { ...coordinates, altitude: 100 },
      //  });

   }, [])

   const handleClick = () => {
      setCoordinates({ lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 })
   }

   if (loadError) {
      return <div>Error loading maps</div>
   }

   if (!isLoaded) {
      return <div>Loading...</div>
   }

   return (
      <div className='map__wrapper'>
         <button onClick={() => handleClick()}> CHANGE CENTER</button>
         <GoogleMap
            mapContainerClassName='map__container'
            options={mapOptions}
            onLoad={onMapLoad}
            center={coordinates}
         >
            {displayControls && (
               <>
                  <Marker position={coordinates} />
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
