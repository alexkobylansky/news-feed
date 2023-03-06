import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from "@mui/material";
import {Header} from "./header/Header";

export const Layout: React.FC = () => {
  return (
    <Container>
      <Header/>
      <Outlet/>
    </Container>
  );
}