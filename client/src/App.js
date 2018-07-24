// React
import React from 'react';
// Components
import MainMenu from './Components/MainMenu';
// Router
import Router from './Components/Router';
// utilities

// images, css
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MainMenu />
        <Router />
      </div>
    );
  }
}
export default App;