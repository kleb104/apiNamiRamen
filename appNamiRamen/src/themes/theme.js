import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(255, 255, 255)',      // azul marino → header y elementos principales
    },
    secondary: {
      main: '#1B2A4A',      // rojo carmesí → footer y acentos
    },
  },
});