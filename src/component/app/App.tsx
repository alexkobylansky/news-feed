import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {RequireAuth} from "../hoc/RequireAuth";
import {Layout} from "../Layout";
import {HomePage} from "../../pages/HomePage";
import {NewsPage} from "../../pages/news-spage/NewsPage";
import {ProfilePage} from "../../pages/ProfilePage";

import {BasicModal} from "../basic-modal/BasicModal";
import {useSelector, useDispatch} from "react-redux";
import {signInFormClose} from "../../store/SignInModalSlice";

import {SignIn} from "../signIn/SignIn";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const signInFormIsOpen = useSelector((state) => state.signInFormState.signInFormIsOpen);
  const handleSignInFormClose = () => dispatch(signInFormClose({signInFormIsOpen: false}));

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={"news"} element={<NewsPage/>}/>
          <Route path={"profile"} element={<RequireAuth>
            <ProfilePage/>
          </RequireAuth>}/>
        </Route>
      </Routes>
      <BasicModal handleClose={handleSignInFormClose} open={signInFormIsOpen}>
        <SignIn/>
      </BasicModal>
    </div>
  );
}