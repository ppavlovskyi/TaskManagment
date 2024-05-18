import { Fragment } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

function App() {
  const browserRouter = AppRouter();

  return (
    <Fragment>
      <RouterProvider router={browserRouter} />
    </Fragment>
  );
}

export default App;
