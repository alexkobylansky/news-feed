import React, {useState, useEffect} from 'react';
import './Header.scss';
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../store/AuthSlice";
import {signInFormOpen} from "../../store/SignInModalSlice";
import {Link, NavLink} from 'react-router-dom';
import {useLanguage} from "../hook/useLanguage";
import {useTranslation} from 'react-i18next';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Button,
  ButtonGroup,
  Tooltip,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

interface IPages {
  title: string;
  link: string
}

interface ISettings {
  title: string;
  link: string
}

export const Header: React.FC = () => {
  const {lang} = useLanguage();
  const {t} = useTranslation();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pages, setPages] = useState<IPages[]>([]);
  const [settings, setSettings] = useState<ISettings[]>([]);

  // @ts-ignore
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

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

  const getData = async (link: string, dispatch: React.Dispatch<React.SetStateAction<IPages[] | ISettings[]>>): Promise<void> => {
    try {
      const res = await fetch(link);
      if (res.status === 200) {
        const req = await res.json();
        dispatch(req);
      } else throw new Error('Something went wrong')
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    void getData('/db/main-menu.json', setPages);
    void getData('/db/user-menu.json', setSettings);
  }, []);

  const handleOpen = () => {
    dispatch(signInFormOpen({signInFormIsOpen: true}))
  }

  const handleLogout = async () => {
    dispatch(logout({user: null}));
  };

  useEffect(() => {
    document.documentElement.lang = `${lang}`
  }, [lang]);

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
                    {t(`${page.title}`)}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
            <LanguageButtons/>
          </Box>
          <Box sx={{flexGrow: 1, justifyContent: "space-between", display: {xs: 'none', md: 'flex'}}}>
            <Box className={"appbar-menu-navlink-wrapper"}>
              {!!pages.length && pages.map((page) => (
                <NavLink to={page.link}
                         key={page.title}
                         className={"main-menu_link"}
                         onClick={handleCloseNavMenu}
                >
                  {t(`${page.title}`)}
                </NavLink>
              ))}
            </Box>
            <Box>
              <LanguageButtons/>
            </Box>
          </Box>
          {!!user ? <Box sx={{display: 'flex', flexGrow: 0, minWidth: '100px', justifyContent: 'center'}}>
            <Tooltip title={t('openUserMenu')}>
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt={`${user.name} ${user.surname}`} src={`${user.avatar}`}/>
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
              {!!settings.length && settings.map((setting) => {
                return (
                  <MenuItem key={setting.title}
                            onClick={handleCloseUserMenu}
                            className={"appbar-menu_item"}
                  >
                    <Link to={setting.link}
                          className={"appbar-menu_link"}>
                      {t(`${setting.title}`)}
                    </Link>
                  </MenuItem>
                )
              })}
              <MenuItem onClick={handleCloseUserMenu}
                        className={"appbar-menu_item"}
              >
                <Button onClick={handleLogout}
                        className={"appbar-menu_button"}
                >
                  {t(`logout`)}
                  <LogoutIcon className={"appbar-menu_logout-icon"}/>
                </Button>
              </MenuItem>
            </Menu>
          </Box> : <Box sx={{display: 'flex', flexGrow: 0, minWidth: '100px', justifyContent: 'center'}}>
            <Button color="inherit" onClick={handleOpen}>{t('login')}</Button>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const LanguageButtons: React.FC = () => {
  const {lang, handleChangeLang} = useLanguage();

  return (
    <ButtonGroup color={"inherit"} variant="text" aria-label="text button group">
      <Button className={`change-lang-button ${lang === 'uk' ? 'active' : ''}`} onClick={() => handleChangeLang("uk")}>
        Ук
      </Button>
      <Button className={`change-lang-button ${lang === 'en' ? 'active' : ''}`} onClick={() => handleChangeLang("en")}>
        En
      </Button>
    </ButtonGroup>
  )
};