import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "./components/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component = {Dashboard} />
          <Route exact path='/register' component = {Register} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
