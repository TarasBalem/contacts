import React, {lazy, Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import Navigation from "components/Navigation";
import Spinner from "components/Spinner";

const ContactsPage = lazy(() => import("pages/ContactsPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const PageNotFound = lazy(() => import("components/PageNotFound"));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="container">
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/contacts">
            <ContactsPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route default>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Suspense>
  );
};

export default App;
