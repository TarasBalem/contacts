import React, {useState, useEffect, lazy, Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import Navigation from "components/Navigation";
import Spinner from "components/Spinner";
import HomePage from "pages/HomePage";
import api, {getAuthUser} from "api";
import UserContext from "contexts/UserContext";

const ContactsPage = lazy(() => import("pages/ContactsPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const PageNotFound = lazy(() => import("components/PageNotFound"));

const App = () => {
  const [userAuth, setUserAuth] = useState({
    id: null,
    email: null,
  });

  useEffect(() => {
    if (localStorage.userUid) {
      let user = JSON.parse(localStorage.userUid);
      setUserAuth({id: user.uid, email: user.email});
    }
  }, []);

  const loginApp = (currentUser) => {
    setUserAuth({...userAuth, email: currentUser.email, id: currentUser.uid});
    localStorage.userUid = JSON.stringify(currentUser);
    getAuthUser(currentUser);
  };

  const logout = () => {
    api.users
      .logout()
      .then(() => {
        console.log("Logout Success");
        setUserAuth({...userAuth, email: null, id: null});
        delete localStorage.userUid;
      })
      .catch((error) => {
        console.log("logoutError", error);
      });
  };

  return (
    <Suspense fallback={<Spinner />}>
      <UserContext.Provider value={{userAuth}}>
        <div className="container">
          <Navigation logout={logout} />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/contacts">
              <ContactsPage />
            </Route>
            <Route path="/login">
              <LoginPage loginApp={loginApp} />
            </Route>
            <Route path="/signup">
              <SignupPage loginApp={loginApp} />
            </Route>
            <Route default>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Suspense>
  );
};

export default App;
