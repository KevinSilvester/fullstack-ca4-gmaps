/**
 * @typedef {google.maps.Map} Map
 * @typedef {google.maps.MapOptions} MapOptions
 */

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { useJsApiLoader, Marker, GoogleMap, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import shallow from 'zustand/shallow'
import { AnimatePresence } from 'framer-motion'
import useStore from '../../hooks/useStore'
import MapControl from './MapControl'
import { MAP_ID, MAP_LIBRARIES } from '../../config/constants'
import Places from '../Search'
import SvgAdd from '../Svg/SvgAdd'
import SvgMinus from '../Svg/SvgMinus'
import SvgRotateLeft from '../Svg/SvgRotateLeft'
import SvgRotateRight from '../Svg/SvgRotateRight'
import SvgGrid from '../Svg/SvgGrid'
import SvgLocationDot from '../Svg/SvgLocationDot'
import airport from '../../data/places/airport.json'
import bar from '../../data/places/bar.json'
import cafe from '../../data/places/cafe.json'
import lodging from '../../data/places/lodging.json'
import restaurant from '../../data/places/restaurant.json'
import train_station from '../../data/places/train_station.json'
import bus_station from '../../data/places/bus_station.json'
import game_venues from '../../data/venues/venues.json'
import MapMarker from './MapMarker'
import { InfoWindow } from '@react-google-maps/api'
import Search from '../Search'

const Map = () => {
   /** @type {React.Ref<Map>} */
   const mapRef = useRef()
   const autocompleteRef = useRef()

   const birmingham = useMemo(() => ({ lat: 52.483726, lng: -1.892682 }), [])
   const [isMapLoaded, setIsMapLoaded] = useState(false)
   const [tilt, setTilt] = useState(false)
   const [displayPoi, setDisplayPoi] = useState(false)
   const [id, setId] = useState('')
   const [direction, setDirection] = useState()
   const [searchValue, setSearchValue] = useState('')

   const [coordinates, setCoordinates] = useStore(
      state => [state.coordinates, state.setCoordinates],
      shallow
   )

   const [markerTypes, setMarkerTypes] = useStore(
      state => [state.markerTypes, state.setMarkerTypes],
      shallow
   )

   const [displaySearch, setDisplaySearch] = useStore(
      state => [state.displaySearch, state.setDisplaySearch],
      shallow
   )

   const places = {
      bar,
      cafe,
      lodging,
      restaurant,
      train_station,
      airport,
      bus_station,
      game_venues
   }

   /** @type {google.maps.places.PlacesService} */
   // let service

   /** @type {MapOptions} */
   const mapOptions = useMemo(
      () => ({
         disableDefaultUI: true,
         streetViewControl: true,
         center: birmingham,
         zoom: 15,
         tilt: 0,
         heading: 0,
         rotateControl: true
      }),
      []
   )

   /**
    * @param {'tilt' | 'rotate' | 'zoom'} mode
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
         case 'zoomin':
            mapRef.current.setZoom(mapRef.current.getZoom() + amount)
            break
         case 'zoomout':
            mapRef.current.setZoom(mapRef.current.getZoom() - amount)
            break
         default:
            break
      }
   }

   const styles = {
      default: [],
      hide: [
         {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
         }
      ]
   }

   const onLoad = useCallback(map => {
      mapRef.current = map
      // service = new google.maps.places.PlacesService(map)
      // setService(new google.maps.places.PlacesService(map))
      setIsMapLoaded(true)
   }, [])

   const onUnmount = useCallback(() => {
      setIsMapLoaded(false)
      mapRef.current = null
   }, [])

   const tiltMap = () => {
      mapRef.current.getTilt() > 0 ? mapRef.current.setTilt(0) : mapRef.current.setTilt(80)
      setTilt(!tilt)
   }

   const togglePoi = () => {
      if (displayPoi) mapRef.current.setOptions({ styles: styles.default })
      else mapRef.current.setOptions({ styles: styles.hide })
      setDisplayPoi(!displayPoi)
   }

   const handleMarkerClick = (coords, id) => {
      const { lat, lng } = coords
      setCoordinates(coords)
      setId(id)
   }

   const fetchDirections = coords => {
      const service = new google.maps.DirectionsService()
      service.route(
         {
            origin: coords,
            destination: coordinates,
            travelMode: google.maps.TravelMode.DRIVING
         },
         (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
               setDirection(result)
               setDisplaySearch(false)
               console.log(result)
            }
         }
      )
   }

   return (
      <div className='map__wrapper'>
         <GoogleMap
            mapContainerClassName='map__container'
            options={mapOptions}
            onLoad={onLoad}
            center={birmingham}
            onUnmount={onUnmount}
         >
            <AnimatePresence>
               {displaySearch && <Search setDirection={setDirection} />}
            </AnimatePresence>

            {coordinates && <Marker position={coordinates} />}

            {direction && (
               <DirectionsRenderer
                  directions={direction}
                  options={{
                     polylineOptions: {
                        strokeColor: '#00ff62',
                        strokeWeight: 7
                     }
                  }}
               />
            )}

            {isMapLoaded && (
               <>
                  {markerTypes.map(type =>
                     places[type].map(place => (
                        <>
                           <MapMarker
                              coordinates={place.geometry.location}
                              label={place.name}
                              title={place.name}
                              onClick={() => {
                                 handleMarkerClick(place.geometry.location, place.place_id)
                                 fetchDirections(place.geometry.location)
                              }}
                              key={place.place_id}
                              type={type}
                           />
                           {id === place.place_id && (
                              <InfoWindow position={coordinates} key={place.place_id + 1}>
                                 <div className='p-2'>
                                    <div className='h-28 w-44 overflow-hidden rounded-md grid place-items-center mx-auto'>
                                       <img
                                          className='w-full h-full object-cover'
                                          src={
                                             type === 'game_venues'
                                                ? `images/venues/${place.imgName}`
                                                : `images/places/${place.imgName}`
                                          }
                                          alt=''
                                       />
                                    </div>
                                    <h3 className='font-bold'>{place.name}</h3>
                                    <div>{place.vicinity}</div>
                                    {direction && (
                                       <div className='flex justify-between flex-col'>
                                          <div className='flex gap-x-4'>
                                             <div className='font-bold'>Distance</div>
                                             <div>{direction.routes[0].legs[0].distance.text}</div>
                                          </div>
                                          <div className='flex gap-x-4'>
                                             <div className='font-bold'>Duration</div>
                                             <div>{direction.routes[0].legs[0].duration.text}</div>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              </InfoWindow>
                           )}
                        </>
                     ))
                  )}

                  <div className='map__control-group bottom-[90px]'>
                     <MapControl
                        className='map__control-btn map__control--top'
                        onClick={() => adjustMap('zoomin', 0.5)}
                     >
                        <SvgAdd className='h-3/5 fill-sky-400' />
                     </MapControl>
                     <MapControl
                        className='map__control-btn map__control--bottom'
                        onClick={() => adjustMap('zoomout', 0.5)}
                     >
                        <SvgMinus className='h-3/5 fill-sky-400' />
                     </MapControl>
                  </div>

                  <div className='map__control-group bottom-[195px]'>
                     <MapControl
                        className='map__control-btn map__control--top'
                        onClick={() => adjustMap('rotate', 45)}
                     >
                        <SvgRotateLeft className='h-3/5 fill-sky-400' />
                     </MapControl>
                     <MapControl
                        className='map__control-btn map__control--bottom'
                        onClick={() => adjustMap('rotate', -45)}
                     >
                        <SvgRotateRight className='h-3/5 fill-sky-400' />
                     </MapControl>
                  </div>

                  <MapControl
                     className='map__control-btn map__control-single bottom-[300px]'
                     onClick={tiltMap}
                  >
                     <SvgGrid
                        className={`h-[1.4rem] w-[1.4rem] gap-[0.15rem] fill-sky-400 ${
                           !tilt && 'map__control--tilt'
                        }`}
                     />
                  </MapControl>

                  <MapControl
                     className='map__control-btn map__control-single bottom-[355px]'
                     onClick={togglePoi}
                  >
                     <SvgLocationDot
                        className={`h-[1.4rem] w-[1.4rem] gap-[0.15rem] fill-sky-400 ${
                           displayPoi && '!fill-gray-400'
                        }`}
                     />
                  </MapControl>
               </>
            )}
         </GoogleMap>
      </div>
   )
}

export default Map
