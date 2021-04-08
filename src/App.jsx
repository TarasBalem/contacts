import React from "react";
import {Switch, Route} from "react-router-dom";
import Navigation from "components/Navigation";
import ContactsPage from "pages/ContactsPage";
import HomePage from "pages/HomePage";

const App = () => {
  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/contacts">
          <ContactsPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
