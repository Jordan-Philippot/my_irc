import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Channel from './components/Channel';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/tchat/:username/:roomId">
          <Channel />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
