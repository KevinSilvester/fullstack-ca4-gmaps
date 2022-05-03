const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY

const venues = [
   'Alexander Stadium',
   'ARENA BIRMINGHAM',
   'CANNOCK CHASE FOREST',
   'COVENTRY ARENA AND STADIUM',
   'Edgbaston Stadium',
   'LEE VALLEY VELOPARK',
   'THE NEC',
   'Sandwell Aquatics Centre',
   'SMITHFIELD',
   'SUTTON PARK',
   'LEE VALLEY VELOPARK',
   'University of Birmingham Hockey and Squash Centre',
   'VICTORIA PARK',
   'VICTORIA SQUARE',
   'WARWICK',
   'West Park'
]

const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='

const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference='

const jsonDir = './src/data/venues'
const imgDir = './public/images/venues'

let arr = []

const getJson = async () => {
   try {
      fs.existsSync(jsonDir) && fs.rmSync(jsonDir, { recursive: true })
      fs.existsSync(imgDir) && fs.rmSync(imgDir, { recursive: true })

      fs.mkdirSync(jsonDir)
      fs.mkdirSync(imgDir)

      await Promise.all(
         venues.map(async venue => {
            const { data } = await axios.get(`${url}${venue},Birmingham&key=${API_KEY}`)


            if (!data.results[0].photos || !data.results[0].photos[0].photo_reference) {
               console.log('no photo for ' + venue)
               return { ...data.results[0] }
            }

            const { data: img } = await axios.get(
               `${photoUrl}${data.results[0].photos[0].photo_reference}&key=${API_KEY}`,
               { responseType: 'arraybuffer' }
            )

            const imgName = `${venue.toLowerCase().replaceAll(' ', '_')}.jpg`

            await fs.promises.writeFile(`${imgDir}/${imgName}`, img)

            arr.push({ ...data.results[0], imgName })
         })
      )
      await fs.promises.writeFile(`${jsonDir}/venues.json`, JSON.stringify(arr))
   } catch (err) {
      console.log(err)
   }
}

getJson()
