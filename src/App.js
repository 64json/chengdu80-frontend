import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import FacultyList from './FacultyList';
import './App.scss';
import SignIn from './SignIn';
import CorporateDetail from './CorporateDetail';
import logoPic from './img/logo.png';
import Logo from './Logo';
import Trending from './Trending';
import Search from './Search';
import FacultyDetail from './FacultyDetail';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/sign-in">
          </Route>
          <Route>
            <div className="userSection">
              {
                signedIn ? (
                  <Link className="user" to="/corporate/goldman-sachs">
                    <div className="picture" style={{ backgroundImage: `url(${logoPic})` }}/>
                    <div className="name">
                      Goldman Sachs
                    </div>
                  </Link>
                ) : (
                  <Link className="signIn" to="/sign-in">Sign In</Link>
                )
              }
            </div>
            <div className="header">
              <Logo/>
              <Search/>
            </div>
          </Route>
        </Switch>
        <div className="main">
          <Switch>
            <Route path="/sign-in">
              <SignIn onSignIn={() => setSignedIn(true)}/>
            </Route>
            <Route path="/corporate">
              <CorporateDetail/>
            </Route>
            <Route path="/search">
              <FacultyList/>
            </Route>
            <Route path="/faculty/:id">
              <FacultyDetail expanded signedIn={signedIn}/>
            </Route>
          </Switch>
        </div>
        <Trending className="trending"/>
      </div>
    </Router>
  );
}

export default App;
