import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import logo from '../../assets/NamiRamenLogo.png';

const pages = ['Productos', 'Combos', 'Sobre Nosotros', 'Contacto'];
const settings = ['Perfil', 'Cuenta', 'Cerrar Sesión'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid rgba(27,42,74,0.12)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>

          {/* ── LOGO desktop ── */}
          <Box
            component="img"
            src={logo}
            alt="Nami Ramen"
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1.5,
              height: 56,
              width: 'auto',
              objectFit: 'contain',
            }}
          />

          {/* ── Nombre desktop ── */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mr: 4 }}>
            <Typography
              component="a"
              href="/"
              sx={{
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.12em',
                color: '#1B2A4A',
                textDecoration: 'none',
                lineHeight: 1.1,
              }}
            >
              NAMI
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 300,
                fontSize: 10,
                letterSpacing: '0.25em',
                color: '#C0392B',
                textTransform: 'uppercase',
              }}
            >
              Ramen &amp; Sushi
            </Typography>
          </Box>

          {/* ── Separador vertical desktop ── */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 3, borderColor: 'rgba(27,42,74,0.12)' }}
          />

          {/* ── Nav links desktop ── */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  fontFamily: '"Noto Serif JP", serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#1B2A4A',
                  letterSpacing: '0.04em',
                  px: 1.5,
                  py: 1,
                  borderRadius: '2px',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 6,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: '1.5px',
                    bgcolor: '#C0392B',
                    transition: 'width 0.2s ease',
                  },
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#C0392B',
                  },
                  '&:hover::after': {
                    width: '60%',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* ── Menú hamburguesa mobile ── */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: '#1B2A4A' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              PaperProps={{
                sx: {
                  mt: 0.5,
                  border: '0.5px solid rgba(27,42,74,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderRadius: '4px',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ py: 1.5, px: 2.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Noto Serif JP", serif',
                      fontSize: 14,
                      color: '#1B2A4A',
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* ── Logo mobile (centrado) ── */}
          <Box
            component="img"
            src={logo}
            alt="Nami Ramen"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: { xs: 'flex', md: 'none' },
              height: 44,
              width: 'auto',
              flexGrow: 1,
              objectFit: 'contain',
            }}
          />

          {/* ── Avatar / usuario ── */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Mi cuenta">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: '#1B2A4A',
                    fontSize: 14,
                    fontFamily: '"Noto Serif JP", serif',
                  }}
                >
                  U
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '48px' }}
              id="menu-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  border: '0.5px solid rgba(27,42,74,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderRadius: '4px',
                  minWidth: 160,
                },
              }}
            >
              {settings.map((setting, index) => (
                <Box key={setting}>
                  {index === settings.length - 1 && (
                    <Divider sx={{ borderColor: 'rgba(27,42,74,0.1)' }} />
                  )}
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{ py: 1.25, px: 2.5 }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: index === settings.length - 1 ? '#C0392B' : '#1B2A4A',
                        fontWeight: index === settings.length - 1 ? 500 : 400,
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                </Box>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;