import { Container, Navbar as Nav } from 'react-bootstrap'

const Navbar = () => {
   return (
      <>
         <Nav bg='light' className='shadow-xl'>
            <Container>
               <Nav.Brand href='/' className='flex items-center justify-around gap-3'>
                  <img
                     src='logo.png'
                     alt='Commonwealth Games 2022 Logo'
                     title='Commonwealth Games 2022 Logo'
                     width='45'
                     height='45'
                  />
                  <span className='h-full font-gineso text-md md:text-lg lg:text-xl font-bold'>
                     Commonwealth Games 2022 Guide &amp; Map
                  </span>
               </Nav.Brand>
            </Container>
         </Nav>
      </>
   )
}

export default Navbar
