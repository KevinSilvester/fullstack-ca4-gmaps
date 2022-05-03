import { useRef, useEffect } from 'react'
import { useGoogleMap } from '@react-google-maps/api'

/**
 * @param {{ 
 *    children: React.ReactNode, 
 *    position: keyof typeof google.maps.ControlPosition, 
 *    onClick: () => void, 
 *    className: string }}
 */
const MapControl = ({ children, position, onClick, className = 'map__control' }) => {
   const map = useGoogleMap()
   const ref = useRef()

   useEffect(() => {
      if (map && ref && position) map.controls[google.maps.ControlPosition[position]].push(ref.current)
   }, [map, ref])

   return (
      <div ref={ref} className=''>
            <button className={className} onClick={onClick}>
               <div className='map__control-btn-inner'>{children}</div>
            </button>
      </div>
   )
}

export default MapControl
