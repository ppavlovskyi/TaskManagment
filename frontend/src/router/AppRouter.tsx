import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LogIn from "../pages/LogIn";
import { routes } from "../routes/routes";
import SignUp from "../pages/SignUp";
import MainTemplate from "../components/MainTemplate";

import NotFound from "../pages/NotFound";
import TasksList from "../pages/TasksList";

export const AppRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LogIn />} />
        <Route path={routes.SIGN_UP} element={<SignUp />} />
        <Route path={routes.HOME} element={<MainTemplate />}>
          <Route path={routes.TASKS} element={<TasksList />} />
        </Route>
          <Route path={routes.NOT_FOUND} element={<NotFound />} />
      </Route>
    )
  );
