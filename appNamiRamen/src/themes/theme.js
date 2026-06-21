import { createTheme } from '@mui/material/styles'; 
export const appTheme= createTheme  ({ 
  palette: { 
    mode: 'light', 
    primary: { 
      main: '#250000', 
    }, 
    secondary: { 
      main: '#ff4545', 
    }, 
    primaryLight: { 
        main: "#95C7DE", 
        contrastText: "#F3AA60"  
      } 
  }, 
});
