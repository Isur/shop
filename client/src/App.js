// React
import React from 'react';
// Components
import MainMenu from './Components/MainMenu';
// Router
import Router from './Components/Router';
// utilities
import axios from 'axios';
import cookie from 'react-cookies';
// images, css
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      token : ``,
      logged: false
    }
  }
  
  componentDidMount(){
    this.isLogged();
    cookie.load('token');
  }

  Logout = () => {
    cookie.remove('token');
    this.isLogged();
  }

  login = () => {
      this.isLogged();
  }

  
  isLogged = () => {
    console.log(cookie.load('token'));
    axios({method: 'get', url:'user/logged', headers: {'Authorization' : cookie.load('token')}})
      .then(() => this.setState({logged: true}))
      .catch((() => this.setState({logged: false})));
  }
  
  render() {
    return (
      <div className="App">
        <MainMenu token={this.state.token} setToken={this.setToken} logged={this.state.logged} logout={this.Logout} />
        <Router login={this.login} logout={this.Logout} logged={this.state.logged} token={this.state.token}/>
      </div>
    );
  }
}
export default App;