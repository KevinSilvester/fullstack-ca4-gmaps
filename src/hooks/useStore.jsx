import create from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(devtools(set => ({
   isStreetView: false,
   displaySmallNav: true,
   displaySideMenu: false,
   displayMarkers: false,
   markerTypes: [],
   displaySearch: false,
   coordinates: undefined,
   setIsStreetView: state => set({ isStreetView: state }),
   setDisplaySmallNav: state => set({ displaySmallNav: state }),
   setDisplaySideMenu: state => set({ displaySideMenu: state }),
   setDisplayMarkers: state => set({ displayMarkers: state }),
   setMarkerTypes: state => set({ markerTypes: state }),
   setDisplaySearch: state => set({ displaySearch: state }),
   setCoordinates: state => set({ coordinates: state }),
})))

export default useStore