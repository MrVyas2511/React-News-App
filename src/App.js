import './'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  APIkey = process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>


        <Router>
        <Navbar />

        <LoadingBar
        height={5}
        color='#f11946'
        progress={this.state.progress}
      />
        
        <Switch>

        <Route exact path="/">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="general" country="in" category="general"></News>
          </Route>
          <Route exact path="/sport">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="sport" country="in" category="sport"></News>
          </Route>
          <Route exact path="/business">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="business" country="in" category="business"></News>
          </Route>
          <Route exact path="/entertainment">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="entertainment" country="in" category="entertainment"></News>
          </Route>
          <Route exact path="/health">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="health" country="in" category="health"></News>
          </Route>
           <Route exact path="/science">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="science"  country="in" category="science"></News>
          </Route>
           <Route exact path="/technology">
          <News API = {this.APIkey}  setProgress={this.setProgress} key="technology"  country="in" category="technology"></News>
          </Route>
         
        
        </Switch>
        
        </Router>
      </div>
    )
  }
}
