import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { refreshToken } from "../features/api/user";
import { TIME_FOR_UPDATE_JWT } from "../utils/constant";
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import Header from "./Header";
import { logOut } from "../features/slice/userSlice";
const MainTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!user.login) {
      navigate(routes.LOG_IN);
    } else {
      const interval = setInterval(() => {
        dispatch(refreshToken(user.response.token)).catch(() => {
          dispatch(logOut());
          navigate(routes.LOG_IN);
        });
      }, TIME_FOR_UPDATE_JWT);
      return () => clearInterval(interval);
    }

  }, [dispatch, user.login]);

  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default MainTemplate;
