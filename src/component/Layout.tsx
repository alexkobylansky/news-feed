import React from 'react';
import {Outlet} from 'react-router-dom';
import {Box, Container} from "@mui/material";

export const Layout: React.FC = () => {
  return (
    <Container>
      <Box component={"main"}>
        <Outlet/>
      </Box>
    </Container>
  );
}