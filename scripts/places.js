const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

const coords = { lat: 52.483726, lng: -1.892682 }

const types = ['bar', 'cafe', 'lodging', 'airport', 'train_station', 'bus_station', 'restaurant']

const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY

const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=5000&type=`

const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference='

const jsonDir = './src/data/places'
const imgDir = './public/images/places'

const getJson = async () => {
   try {
      fs.existsSync(jsonDir) && fs.rmSync(jsonDir, { recursive: true })
      fs.existsSync(imgDir) && fs.rmSync(imgDir, { recursive: true })

      fs.mkdirSync(jsonDir)
      fs.mkdirSync(imgDir)

      await Promise.all(
         types.map(async type => {
            const { data } = await axios.get(`${url}${type}&key=${API_KEY}`)
            const res = await Promise.all( data.results.slice(0, 6).map(async place => {
               if (!place.photos || !place.photos[0].photo_reference) {
                  console.log('no photo for ' + place.name)
                  return { ...place }
               }

               const { data } = await axios.get(
                  `${photoUrl}${place.photos[0].photo_reference}&key=${API_KEY}`,
                  { responseType: 'arraybuffer' }
               )

               const imgName = `${type}--${place.name.toLowerCase().replaceAll(' ', '_')}.jpg`

               await fs.promises.writeFile(`${imgDir}/${imgName}`, data)

               return { ...place, imgName }
            }))

            await fs.promises.writeFile(`${jsonDir}/${type}.json`, JSON.stringify(res))
         })
      )
   } catch (err) {
      console.log(err)
   }
}

getJson()
