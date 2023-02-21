import React from 'react';
import {Outlet} from 'react-router-dom';
import {Box, Container} from "@mui/material";
import {Header} from "./header/Header";

export const Layout: React.FC = () => {
  return (
    <Container>
      <Header/>
      <Box component={"main"}>
        <Outlet/>
      </Box>
    </Container>
  );
}