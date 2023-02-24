import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from '../../store/AuthSlice';
import {signInFormClose} from "../../store/SignInModalSlice";
import {Notification} from "../Notification";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  AlertColor
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [usernameErrorText, setUsernameErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');

  const [rememberMe, setRememberMe] = useState<boolean>(true);
  
  const [isValid, setIsValid] = useState<boolean>(false);

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const [notificationSeverity, setNotificationSeverity] = useState<AlertColor | undefined>(undefined);

  const dispatch = useDispatch();

  const showNotification = (message: string, severity: AlertColor) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleBlurUsername = (value: string) => {
    if (!value) {
      setUsernameErrorText("Це поле не повинне бути порожнім");
    } else setUsernameErrorText("");
  };

  const handleChangeUsername = (value: string) => {
    setUsername(value);
    handleBlurUsername(value);
  };

  const handleBlurPassword = (value: string) => {
    if (!value) {
      setPasswordErrorText("Це поле не повинне бути порожнім");
    } else setPasswordErrorText("");
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
    handleBlurPassword(value);
  };

  useEffect(() => {
    if ((username && !usernameErrorText) && (password && !passwordErrorText) && rememberMe) {
      setIsValid(true);
    } else setIsValid(false);
  }, [username, usernameErrorText, password, passwordErrorText, rememberMe]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/db/users.json');
      if (response.status === 200) {
        const users = await response.json();
        const user = await users.find((item: IUser) => item.username === username && item.password === password);
        if (user) {
          dispatch(login({user: user}));
          setUsername('');
          setPassword('');
          dispatch(signInFormClose({signInFormIsOpen: false}));
          navigate('/profile', {replace: true});
        } else showNotification("Ім'я користувача або пароль введено неправильно", "warning");
      } else if (response.status >= 400 && response.status <= 500) {
        return new Error("Something went wrong")
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(event) => handleChangeUsername(event.target.value)}
            onBlur={(event) => handleBlurUsername(event.target.value)}
            onFocus={() => setUsernameErrorText("")}
            autoComplete="username"
            autoFocus
            helperText={usernameErrorText}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => handleChangePassword(event.target.value)}
            onBlur={(event) => handleBlurPassword(event.target.value)}
            onFocus={() => setPasswordErrorText("")}
            autoComplete="current-password"
            helperText={passwordErrorText}
          />
          <FormControlLabel
            control={<Checkbox value="remember" 
                               checked={rememberMe} 
                               onChange={(event) => setRememberMe(event.target.checked)}
                               color="primary"/>}
            label="Remember me"
          />
          <Button
            type="submit"
            disabled={!isValid}
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Notification notificationOpen={notificationOpen}
                    handleNotificationClose={handleNotificationClose}
                    notificationSeverity={notificationSeverity}
                    notificationMessage={notificationMessage}/>
    </Container>
  );
}