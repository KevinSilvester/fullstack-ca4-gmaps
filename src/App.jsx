import { useState } from 'react'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { useJsApiLoader } from '@react-google-maps/api'
import { AnimatePresence } from 'framer-motion'
import shallow from 'zustand/shallow'
import useStore from './hooks/useStore'
import Map from './components/Map/Map'
import Navbar from './components/Navbar'
import SideMenuLg from './components/SideMenuLg'
import SideMenuSm from './components/SideMenuSm'
import { MAP_LIBRARIES } from './config/constants'
import Search from './components/Search'

function App() {
   const { isLoaded: isScriptLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'beta',
      libraries: MAP_LIBRARIES
   })
   const isMedium = useMediaQuery({ query: '(max-width: 767px)' })

   const [displaySideMenu, setDisplaySideMenu] = useStore(
      state => [state.displaySideMenu, state.setDisplaySideMenu],
      shallow
   )

   return (
      <>
         <Navbar />
         <div className='h-full w-full'>
            {isMedium ? <SideMenuSm /> : <SideMenuSm />}
            {/* <AnimatePresence>
               <Search />
            </AnimatePresence> */}
            {loadError && <div>Error loading maps</div>}
            {isScriptLoaded && <Map />}
         </div>
      </>
   )
}

export default App
