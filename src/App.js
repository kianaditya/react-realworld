import React from 'react';
import {Switch, Route} from "react-router-dom"
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' render={() => <ArticleList/>}/>
        <Route path='/signup' render={() =><RegistrationForm/>}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
