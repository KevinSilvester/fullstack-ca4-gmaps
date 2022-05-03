import { Marker } from '@react-google-maps/api'
import { faHotel, faUtensils, faBeerMugEmpty, faMugSaucer, faPlaneDeparture, faTrainSubway, faBus, faMedal } from '@fortawesome/free-solid-svg-icons'

const MapMarker = ({ className, coordinates, type, label, title, onClick }) => {
   let icon = {
      strokeOpacity: 0.95,
      strokeWeight: 0.5,
      scale: 0.045,
      title,
   }

   switch (type) {
      case 'lodging':
         icon = {
            ...icon,
            path: faHotel.icon[4],
            fillColor: '#38bef8',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faHotel.icon[0] / 2, faHotel.icon[1])
         }
         break
      case 'restaurant':
        icon = {
            ...icon,
            path: faUtensils.icon[4],
            fillColor: '#3872f8',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faUtensils.icon[0] / 2, faUtensils.icon[1])
         } 
         break
      case 'bar':
        icon = {
            ...icon,
            path: faBeerMugEmpty.icon[4],
            fillColor: '#389bf8',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faBeerMugEmpty.icon[0] / 2, faBeerMugEmpty.icon[1])
         } 
         break
      case 'cafe':
        icon = {
            ...icon,
            path: faMugSaucer.icon[4],
            fillColor: '#3862f8',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faMugSaucer.icon[0] / 2, faMugSaucer.icon[1])
         } 
         break
      case 'airport':
        icon = {
            ...icon,
            path: faPlaneDeparture.icon[4],
            fillColor: '#4658fa',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faPlaneDeparture.icon[0] / 2, faPlaneDeparture.icon[1])
         } 
         break
      case 'train_station':
        icon = {
            ...icon,
            path: faTrainSubway.icon[4],
            fillColor: '#384bf8',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faTrainSubway.icon[0] / 2, faTrainSubway.icon[1])
         } 
         break
      case 'bus_station':
        icon = {
            ...icon,
            path: faBus.icon[4],
            fillColor: '#5b46fa',
            fillOpacity: 0.95,
            strokeColor: '#000000',
            anchor: new google.maps.Point(faBus.icon[0] / 2, faBus.icon[1])
         } 
         break
         case 'game_venues':
        icon = {
            ...icon,
            path: faMedal.icon[4],
            fillColor: '#113342',
            fillOpacity: 0.95,
            strokeColor: '#38bdf8',
            anchor: new google.maps.Point(faMedal.icon[0] / 2, faMedal.icon[1])
         } 
         break
   }

   return (
      <Marker
         className={className}
         position={coordinates}
         onClick={onClick}
         icon={icon}
         title={title}
      />
   )
}

export default MapMarker
