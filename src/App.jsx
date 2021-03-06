import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleListContainer from "./components/article-display/ArticleListContainer";
import RegistrationForm from "./components/forms/auth/RegistrationForm";
import LoginForm from "./components/forms/auth/LoginForm.jsx";
import SpecificArticle from "./components/article-display/SpecificArticle";
import axios from "./helpers/axiosService";
import { getToken } from "./helpers/localStorage";
import Settings from "./components/forms/Settings";
import ArticleManagementForm from "./components/forms/ArticleManagementForm";
import Profile from "./components/user/Profile";

const App = () => {
  const [state, setState] = useContext(AppContext);
  const checkUser = async () => {
    const token = getToken();
    if (token) {
      const response = await axios.getUser();
      setState(state => ({
        ...state,
        currentUser: { isSignedIn: true, ...response.data.user }
      }));
    }
  };
  useEffect(() => {
    checkUser();
  }, [state.currentUser.isSignedIn]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <ArticleListContainer />} />
        <Route exact path="/profile/:username" render={() => <Profile />} />
        <Route exact path="/signup" render={() => <RegistrationForm />} />
        <Route exact path="/login" render={() => <LoginForm />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/article/:slug" render={() => <SpecificArticle />} />
        <Route exact path="/:action" render={() => <ArticleManagementForm />} />
        <Route exact path="/:action/:slug" render={() => <ArticleManagementForm />} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
