import React from "react";
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const RequireAuth = ({children}) => {
  const location = useLocation();
  const user = useSelector(state => state.user.user);
  if (!user) {
    return <Navigate to="/" replace={true} state={{from: location}}/>
  } return children
}