import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.jsx';
import { Xmjs } from './components/Xmjs/index.js';
import { Qwzs } from './components/Qwzs/index.js';


function App() {

  

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar></NavigationBar>
        <Switch>
          <Route path="/" exact component={Xmjs}></Route>
          <Route path="/Qwzs" exact component={Qwzs}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
