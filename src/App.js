import './'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import Spinner from './components/Spinner'

export default class App extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        
     <News pageSize={3}></News>
      </div>
    )
  }
}
