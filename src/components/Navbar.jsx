import { Container, Navbar as Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import shallow from 'zustand/shallow'
import useStore from '../hooks/useStore'
import SvgBars from './Svg/SvgBars'
import SvgSearch from './Svg/SvgSearch'

const Navbar = () => {
   const [displaySideMenu, setDisplaySideMenu] = useStore(
      state => [state.displaySideMenu, state.setDisplaySideMenu],
      shallow
   )

   const [displaySearch, setDisplaySearch] = useStore(
      state => [state.displaySearch, state.setDisplaySearch],
      shallow
   )
   
   return (
      <>
         <nav className='fixed z-10 bg-white rounded-lg h-14 w-[90vw] max-w-4xl top-3 left-1/2 -translate-x-1/2 flex items-center justify-around shadow-center'>
            <button onClick={() => setDisplaySideMenu(!displaySideMenu)} className='nav__button'>
               <SvgBars className='h-5 fill-sky-500' />
            </button>
            <a href='/'>
               <img
                  src='logo.png'
                  alt='Commonwealth Games 2022 Logo'
                  title='Commonwealth Games 2022 Logo'
                  width='45'
                  height='47'
                  className='h-[47px] w-[45px] object-cover object-top'
               />
            </a>
            <button onClick={() => setDisplaySearch(!displaySearch)} className='nav__button'>
               <SvgSearch className='h-5 fill-sky-500' />
            </button>
         </nav>
      </>
   )
}

export default Navbar
