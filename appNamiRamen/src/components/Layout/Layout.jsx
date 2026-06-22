// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';
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
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            py: 2,
            pb: '5.5rem',
          }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}