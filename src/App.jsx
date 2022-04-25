import { useState } from 'react'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import Map from './components/Map'
import Navbar from './components/Navbar'
import SideMenuLg from './components/SideMenuLg'
import SideMenuSm from './components/SideMenuSm'

function App() {
   const isMedium = useMediaQuery({ query: '(max-width: 767px)' })

   return (
      <>
         <Navbar />
         <div className='h-full w-full'>
            {isMedium ? <SideMenuSm /> : <SideMenuLg />}
            <Map />
         </div>
      </>
   )
}

export default App
