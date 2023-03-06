import React from 'react';
import {useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

export const ProfilePage: React.FC = () => {
  // @ts-ignore
  const user = useSelector(state => state.user.user);

  return (
    <Box className="profile-page">
      <Typography component="h1" variant="h2">Profile Page</Typography>
    <Box component="main">
      <Box className="profile-info">
        <Box className="main-info_block">
          {user.avatar ? <img src={user.avatar} alt={`${user.name} ${user.surname}`} className="user-avatar"/> : <AccountCircle/>}
          <Typography>Full name: {user.name} {user.surname}</Typography>
          <Typography>Username: {user.username}</Typography>
        </Box>
      </Box>
    </Box>
    </Box>
  );
}