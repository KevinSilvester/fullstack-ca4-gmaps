import { useMemo, useState } from 'react'
import { useJsApiLoader, Marker, GoogleMap } from '@react-google-maps/api'

const Map = () => {
   /**
    * @type {[google.maps.Map, React.Dispatch<React.SetStateAction<google.maps.Map>>]}
    */
   const [map, setMap] = useState(null)

   const libraries = useMemo(() => ['places'], [])

   const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries
   })

   const coordinates = { lat: 53.981, lng: -6.392 }

   if (loadError) {
      return <div>Error loading maps</div>
   }

   if (!isLoaded) {
      return <div>Loading...</div>
   }

   return (
      <div style={{ height: '100vh', width: '100%' }}>
         <GoogleMap
            mapContainerStyle={{
               height: '100%',
               width: '100%',
            }}
            zoom={16}
            center={coordinates}
            onLoad={(map) => setMap(map)}
         >
            <Marker position={coordinates} />
         </GoogleMap>
      </div>
   )
}

export default Map