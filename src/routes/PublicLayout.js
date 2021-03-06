import React from "react";
import { Route, Switch } from "react-router";

// PAGES
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import GalleryPage from "../pages/GalleryPage";
import SinglePage from "../pages/SinglePage";
import EditPage from "../pages/EditPage";
import NotFoundPage from "../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <div id="main">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/gallery" component={GalleryPage} />
        <Route exact path="/gallery/:id" component={SinglePage} />
        <Route exact path="/edit/:id" component={EditPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default PublicLayout;
