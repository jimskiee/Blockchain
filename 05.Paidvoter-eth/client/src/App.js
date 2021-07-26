import './assets/votestyle.css';
import NavHeader from './NavHeader';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VoteHome from './VoteHome';


class App extends React.Component {

  render() { //render
    return (

    <BrowserRouter>
          <NavHeader/>
          <Switch>
              <Route path="/" component={VoteHome}/>
         </Switch>
    </BrowserRouter>
    );
  }
} ///render
export default App;
