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
      logged: false,
      id: '',
    }
  }
  
  componentDidMount(){
    cookie.load('token')
    cookie.load('id');
    this.isLogged();
    
    if(!cookie.load('language')){
      cookie.save('language', 'pol');
    }
  }

  Logout = () => {
    cookie.remove('token');
    this.isLogged();
  }

  login = (token, id, type) => {
    cookie.save(
      'token', 
      `Bearer ${token}`, 
    );
    cookie.save('id', id);
    cookie.save('type', type);    
    this.isLogged();
  }
  changeLanguage = () =>{
    const language = cookie.load('language');
    if(language === 'eng')
      cookie.save('language', 'pol');
    else if(language === 'pol')
      cookie.save('language', 'eng');
    else 
      cookie.save('language', 'eng');
      
    window.location.reload();
  }

  
  isLogged = () => {
    axios({method: 'get', url:'/user/logged', headers: {'Authorization' : cookie.load('token')}})
      .then(() => this.setState({logged: true}))
      .catch((() => this.setState({logged: false})));
  }
  
  render() {
    return (
      <div className="App">
        <MainMenu changeLanguage={this.changeLanguage} token={this.state.token} setToken={this.setToken} logged={this.state.logged} logout={this.Logout} />
        <Router id={cookie.load('id')} login={this.login} logout={this.Logout} logged={this.state.logged} token={this.state.token}/>
      </div>
    );
  }
}
export default App;