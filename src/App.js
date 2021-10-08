import './'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default class App extends Component {

  render() {
    return (
      <div>


        <Router>
        <Navbar />
        
        
        <Switch>

        <Route exact path="/">
          <News key="general" pageSize={3} country="in" category="general"></News>
          </Route>
          <Route exact path="/sport">
          <News key="sport" pageSize={3} country="in" category="sport"></News>
          </Route>
          <Route exact path="/business">
          <News key="business" pageSize={3} country="in" category="business"></News>
          </Route>
          <Route exact path="/entertainment">
          <News key="entertainment" pageSize={3} country="in" category="entertainment"></News>
          </Route>
          <Route exact path="/health">
          <News key="health" pageSize={3} country="in" category="health"></News>
          </Route>
           <Route exact path="/science">
          <News key="science" pageSize={3} country="in" category="science"></News>
          </Route>
           <Route exact path="/technology">
          <News key="technology" pageSize={3} country="in" category="technology"></News>
          </Route>
         
        
        </Switch>
        
        </Router>
      </div>
    )
  }
}
