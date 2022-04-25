const forms = require('@tailwindcss/forms')

const hsl = variable => ({ opacityValue }) => {
   if (!opacityValue) 
      return `hsl(var(${variable}))`
   return `hsl(var(${variable}) / ${opacityValue})`
}

module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         boxShadow: {
            center: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
         },
         colors: {
            gmap: {
               base: hsl('--gmap-color-base'),
               hover: hsl('--gmap-color-hover'),
               active: hsl('--gmap-color-active'),
            }   
         },
         fontFamily: {
            gineso: 'gineso-condensed'
         }
      }
   },
   plugins: [forms]
}
