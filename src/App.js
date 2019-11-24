import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import { AppContextProvider } from "./AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <ArticleList />} />
          <Route path="/signup" render={() => <RegistrationForm />} />
          <Route path="/login" render={() => <LoginForm />} />
        </Switch>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;
