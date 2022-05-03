import { useRef } from 'react'
import { useGoogleMap, Autocomplete } from '@react-google-maps/api'
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
// import {
//    Combobox,
//    ComboboxInput,
//    ComboboxPopover,
//    ComboboxList,
//    ComboboxOption
// } from '@reach/combobox'
// import '@reach/combobox/styles.css'
import SvgAdd from './Svg/SvgAdd'
import shallow from 'zustand/shallow'
import { motion } from 'framer-motion'
import useStore from '../hooks/useStore'

const Search = ({ setDirection }) => {
   const autocompleteRef = useRef()
   const map = useGoogleMap()

   const [coordinates, setCoordinates] = useStore(
      state => [state.coordinates, state.setCoordinates],
      shallow
   )

   const [displaySearch, setDisplaySearch] = useStore(
      state => [state.displaySearch, state.setDisplaySearch],
      shallow
   )

   return (
      <motion.div
         className='fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm grid place-items-center z-[70]'
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.15 }}
         onClick={() => setDisplaySearch(false)}
      >
         <motion.div
            onClick={e => e.stopPropagation()}
            className='w-80 h-11 bg-white rounded-lg shadow-lg relative -translate-y-[25vh]'
         >
            <Autocomplete
               bounds={map && map.getBounds()}
               onLoad={e => (autocompleteRef.current = e)}
               onPlaceChanged={() => {
                  const place = autocompleteRef.current.getPlace()
                  map.panTo({
                     lat: place.geometry.location.lat(),
                     lng: place.geometry.location.lng()
                  })
                  setCoordinates({
                     lat: place.geometry.location.lat(),
                     lng: place.geometry.location.lng()
                  })
                  setDisplaySearch(false)
               }}
            >
               <input
                  type='text'
                  placeholder='Search Places'
                  className='w-full max-h-full rounded-md border-sky-100 border-2 focus:ring-0'
                  id='search'
               />
            </Autocomplete>
            <button
               onClick={() => {
                  setCoordinates(null)
                  setDirection(null)
                  document.getElementById('search').value = ''
               }}
               style={{
                  transform: 'translateY(-45%)'
               }}
               className='h-5 w-5 rounded-full bg-sky-400/70 grid place-items-center absolute right-2 top-1/2'
            >
               <SvgAdd className='h-1/2 fill-white rotate-45' />
            </button>
         </motion.div>
      </motion.div>
   )
}

export default Search
