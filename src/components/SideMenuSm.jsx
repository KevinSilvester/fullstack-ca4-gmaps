import { useState } from 'react'
import { motion } from 'framer-motion'

const SideMenuSm = () => {
   const [display, setDisplay] = useState(false)

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
            className='bg-dark menu__container'
         >
            <motion.button layout onClick={() => setDisplay(!display)} className='menu__toggle'>
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
            </motion.button>
            <div className='flex items-center mb-3 gap-3'>
               <img
                  src='logo.png'
                  alt='Commonwealth Games 2022 Logo'
                  title='Commonwealth Games 2022 Logo'
                  width='60'
                  height='60'
                  className='bg-white p-1 rounded-lg'
               />
               <span className='font-gineso text-white text-xl font-bold underline-offset-1 underline'>
                  Search for a location
               </span>
            </div>
         </motion.div>
      </>
   )
}

export default SideMenuSm
