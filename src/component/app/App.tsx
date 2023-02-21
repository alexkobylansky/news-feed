import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Layout} from "../Layout";
import {HomePage} from "../../pages/HomePage";
import {NewsPage} from "../../pages/NewsPage";
import {ProfilePage} from "../../pages/ProfilePage";
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={"news"} element={<NewsPage/>}/>
          <Route path={"profile"} element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}