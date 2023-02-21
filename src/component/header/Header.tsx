import React, {useState, useEffect} from 'react';
import './Header.scss';
import {Link, NavLink} from 'react-router-dom';
import {AppBar, Box, Toolbar, IconButton, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {

}

interface IPages {
  title: string;
  link: string
}
interface ISettings {
  title: string;
  link: string
}

export const Header: React.FC<HeaderProps> = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pages, setPages] = useState<IPages[]>([]);
  const [settings, setSettings] = useState<ISettings[]>([]);
  const [isAuth, setIsAuth] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getData = async (link: string, dispatch:  React.Dispatch<React.SetStateAction<IPages[] | ISettings[]>>) => {
    try {
      const res = await fetch(link);
      if (res.status === 200) {
        const req = await res.json();
        dispatch(req);
      } else return new Error('Something went wrong')
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
  getData('/db/main-menu.json', setPages);
  getData('/db/user-menu.json', setSettings);
  }, []);

  const appbarMenuLink = {
    justifyContent: 'flex-start',
    fontWeight: '400',
    fontSize: '1rem',
    padding: 0,
    textDecoration: 'none',
    textTransform: 'none',
    color: 'inherit'
  };

  const login = async () => {
    setIsAuth(true);
  };

  const logout = async (link: string) => {
    setIsAuth(false);
    console.log(link);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {!!pages.length && pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <NavLink to={page.link}
                           className={"main-menu_link"}
                  >
                    {page.title}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {!!pages.length && pages.map((page) => (
              <NavLink to={page.link}
                       key={page.title}
                       className={"main-menu_link"}
                       onClick={handleCloseNavMenu}
              >
                {page.title}
              </NavLink>
            ))}
          </Box>
          {isAuth ? <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!!settings.length && settings.map((setting, index) => {
                if (index < settings.length - 1) {
                  return (
                    <MenuItem key={setting.title}
                              onClick={handleCloseUserMenu}
                              className={"appbar-menu_item"}
                    >
                      <Link to={setting.link}
                            className={"appbar-menu_link"}>
                        {setting.title}
                      </Link>
                    </MenuItem>
                  )
                } else if (index === settings.length - 1) {
                  return (
                    <MenuItem key={setting.title}
                              onClick={handleCloseUserMenu}
                              className={"appbar-menu_item"}
                    >
                      <Button onClick={() => logout(setting.link)}
                              sx={appbarMenuLink}
                      >
                        {setting.title}
                        <LogoutIcon className={"appbar-menu_logout-icon"}/>
                      </Button>
                    </MenuItem>
                  )
                } else return null
              })}
            </Menu>
          </Box> : <Button color="inherit" onClick={login}>Login</Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}