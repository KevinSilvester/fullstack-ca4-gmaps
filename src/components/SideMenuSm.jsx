import { useState } from 'react'
import { motion } from 'framer-motion'
import shallow from 'zustand/shallow'
import useStore from '../hooks/useStore'
import { useEffect } from 'react'

const SideMenuSm = () => {
   const [display, setDisplay] = useStore(
      state => [state.displaySideMenu, state.setDisplaySideMenu],
      shallow
   )

   const [markerTypes, setMarkerTypes] = useStore(
      state => [state.markerTypes, state.setMarkerTypes],
      shallow
   )

   const markers = ['bar', 'cafe', 'lodging', 'airport', 'train_station', 'bus_station', 'restaurant', 'game_venues']

   const handleSubmit = e => {
      e.preventDefault()
      const arr = markers.filter(marker => e.target[marker].checked)
      setMarkerTypes(arr)
      setDisplay(false)
   }

   const capitalize = str => {
      const strArr = str.split('_')
      const result = strArr.map(word => word.charAt(0).toUpperCase() + word.slice(1))
      return result.join(' ')
   }

   const clearFilter = e => {
      e.preventDefault()
      setMarkerTypes([])
      markers.forEach(marker => {
         document.getElementById(marker).checked = false
      })
   }

   

   return (
      <>
         <motion.div
            initial={{ opacity: 0, zIndex: -1 }}
            animate={{ opacity: display ? 100 : 0, zIndex: display ? 40 : -1 }}
            transition={{ duration: 0.15 }}
            onClick={() => display && setDisplay(!display)}
            className='menu__backdrop'
         />
         <motion.div
            initial={{ translateX: '-100%' }}
            animate={{ translateX: display ? '0%' : '-100%' }}
            transition={{ duration: 0.15 }}
            className='bg-white menu__container'
         >
            {/* <motion.button layout onClick={() => setDisplay(!display)} className='menu__toggle'>
                  <motion.svg
                     initial={{ rotate: 0, originX: '50%', originY: '50%' }}
                     animate={{ rotate: display ? 180 : 0, originX: '50%', originY: '50%' }}
                     transition={{ duration: 0.15 }}
                     className='menu__toggle-icon'
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 256 512'
                  >
                     <path d='M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z' />
                  </motion.svg>
            </motion.button> */}
            <div className='flex items-center mb-3 gap-3'>
               <span className='font-gineso text-sky-500 text-xl font-bold underline-offset-1 underline'>
                  Show Place Types
               </span>
            </div>
            <form onSubmit={handleSubmit}>
               <div className='flex flex-col gap-2'>
                  {markers.map(marker => (
                     <div className='flex gap-x-2 items-center w-44 p-1 rounded-md' key={marker}>
                        <div className='grid place-items-center'>
                           <input
                              className='rounded-sm'
                              type='checkbox'
                              name={marker}
                              id={marker}
                           />
                        </div>
                        <label htmlFor={marker}>{capitalize(marker)}</label>
                     </div>
                  ))}
               </div>
               <div className='flex items-center justify-evenly'>
                  <button className='px-3 py-2 my-3 font-bold bg-sky-400 text-white rounded-lg shadow-center'>
                     Apply Filter
                  </button>
                  <button
                     onClick={clearFilter}
                     className='px-3 py-2 my-3 font-bold bg-red-400 text-white rounded-lg shadow-center'
                  >
                     Clear Filter
                  </button>
               </div>
            </form>
         </motion.div>
      </>
   )
}

export default SideMenuSm
