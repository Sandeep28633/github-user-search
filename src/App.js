import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard, Error, Login, PrivateRoute, AuthWrapper } from "./pages";

const App = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact>
            <Dashboard />
          </PrivateRoute>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="*" exact>
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthWrapper>
  );
};

export default App;
