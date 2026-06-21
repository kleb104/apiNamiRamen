// eslint-disable-next-line no-unused-vars
import React from 'react'; 
import PropTypes from 'prop-types'; 
import { Container } from '@mui/material'; 
import Header from './Header'; 
import { Footer } from './Footer'; 
import { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
 
Layout.propTypes = { children: PropTypes.node.isRequired }; 
 
export function Layout({ children }) { 
  return ( 
    <> 
      <Header /> 
      <Box sx={{
    px: 2,
    pt: 2,
    pb: 8,
    minHeight: '100vh'
  }}
      > 
      <Toaster position='bottom-right' />
        {children} 
      </Box> 
      <Footer /> 
    </> 
  ); 
}
