import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm.jsx";
import SpecificArticle from "./components/SpecificArticle.jsx";
import axios from "./helpers/axiosService";
import { getToken } from "./helpers/localStorage";
import Settings from "./components/Settings";

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
  }
  useEffect(()=>{
    checkUser()
  },[state.currentUser.isSignedIn])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <ArticleList />} />
        <Route path="/signup" render={() => <RegistrationForm />} />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/article/:slug" render={() => <SpecificArticle />} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
