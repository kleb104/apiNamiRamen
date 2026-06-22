// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Header from './Header';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toaster position="bottom-right" />
        {children}
      </Box>
      <Footer />
    </Box>
  );
}