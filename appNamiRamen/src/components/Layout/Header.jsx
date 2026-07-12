import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import logo from '../../assets/NamiRamenLogo.png';

export default function Header() {
  // Gestión menú usuario
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // Gestión menú principal móvil
  const [anchorElPrincipal, setAnchorElPrincipal] = React.useState(null);
  // Gestión menú opciones móvil
  const [mobileOpcionesAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileOpcionesMenuOpen = Boolean(mobileOpcionesAnchorEl);

  const handleUserMenuOpen = (e) => setAnchorElUser(e.currentTarget);
  const handleUserMenuClose = () => { setAnchorElUser(null); handleOpcionesMenuClose(); };
  const handleOpenPrincipalMenu = (e) => setAnchorElPrincipal(e.currentTarget);
  const handleClosePrincipalMenu = () => setAnchorElPrincipal(null);
  const handleOpcionesMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);
  const handleOpcionesMenuClose = () => setMobileMoreAnchorEl(null);

  // Enlaces menú usuario
  const userItems = [
    { name: 'Iniciar sesión', link: '/usuario/login' },
    { name: 'Registrarse',    link: '/usuario/crear'  },
    { name: 'Cerrar sesión',  link: '/usuario/logout' },
  ];

  // Enlaces menú principal
  const navItems = [
    { name: 'Menú',         link: '/productos'  },
    { name: 'Combos',       link: '/combos'     },
    { name: 'Mis pedidos',  link: '/pedidos'    },
    { name: 'Administración', link: '/admin'    },
  ];

  const menuIdPrincipal = 'menu-principal';
  const userMenuId      = 'user-menu';
  const menuOpcionesId  = 'opciones-menu-mobile';

  // Menú principal desktop
  const menuPrincipal = (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navItems.map((item, index) => (
        <Button
          key={index}
          component={Link}
          to={item.link}
          sx={{ color: '#1B2A4A', fontFamily: '"Noto Serif JP", serif', fontSize: 13 }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );

  // Menú principal móvil
  const menuPrincipalMobile = navItems.map((item, index) => (
    <MenuItem key={index} component={Link} to={item.link} onClick={handleClosePrincipalMenu}>
      <Typography sx={{ fontFamily: '"Noto Serif JP", serif', color: '#1B2A4A' }}>
        {item.name}
      </Typography>
    </MenuItem>
  ));

  // Menú usuario
  const userMenu = (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        size="large"
        edge="end"
        aria-controls={userMenuId}
        aria-haspopup="true"
        onClick={handleUserMenuOpen}
        sx={{ color: '#1B2A4A' }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        sx={{
          mt: '45px',
          '& .MuiPaper-root': {
            border: '0.5px solid rgba(27,42,74,0.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: '4px',
            minWidth: 160,
          },
        }}
        id={userMenuId}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleUserMenuClose}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Mi cuenta
          </Typography>
        </MenuItem>
        {userItems.map((item, index) => (
          <MenuItem key={index} component={Link} to={item.link} onClick={handleUserMenuClose}>
            <Typography sx={{ fontSize: 13, color: index === userItems.length - 1 ? '#C0392B' : '#1B2A4A' }}>
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  // Menú opciones móvil (carrito + usuario)
  const menuOpcionesMobile = (
    <Menu
      anchorEl={mobileOpcionesAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuOpcionesId}
      keepMounted
      open={isMobileOpcionesMenuOpen}
      onClose={handleOpcionesMenuClose}
    >
      <MenuItem>
        <IconButton size="large" sx={{ color: '#1B2A4A' }}>
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrito</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid rgba(27,42,74,0.12)' }}
      >
        <Toolbar>
          {/* Hamburguesa móvil */}
          <IconButton
            size="large"
            sx={{ color: '#1B2A4A', mr: 1 }}
            aria-controls={menuIdPrincipal}
            aria-haspopup="true"
            onClick={handleOpenPrincipalMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id={menuIdPrincipal}
            anchorEl={anchorElPrincipal}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorElPrincipal)}
            onClose={handleClosePrincipalMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {menuPrincipalMobile}
          </Menu>

          {/* Logo + nombre */}
          <Tooltip title="Nami Ramen">
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 2 }}>
              <Box component="img" src={logo} alt="Nami Ramen" sx={{ height: 48, width: 'auto', mr: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
                <Typography sx={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.12em', color: '#1B2A4A', lineHeight: 1.1 }}>
                  NAMI
                </Typography>
                <Typography sx={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 300, fontSize: 9, letterSpacing: '0.25em', color: '#C0392B', textTransform: 'uppercase' }}>
                  Ramen &amp; Sushi
                </Typography>
              </Box>
            </Box>
          </Tooltip>

          {/* Nav desktop */}
          {menuPrincipal}

          <Box sx={{ flexGrow: 1 }} />

          {/* Carrito desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" sx={{ color: '#1B2A4A' }} component={Link} to="/carrito">
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* Menú usuario */}
          {userMenu}

          {/* Más opciones móvil */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls={menuOpcionesId}
              aria-haspopup="true"
              onClick={handleOpcionesMenuOpen}
              sx={{ color: '#1B2A4A' }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {menuOpcionesMobile}
    </Box>
  );
}