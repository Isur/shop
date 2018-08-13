// React
import React from 'react';
// Components
import MainMenu from './Components/MainMenu';
// Router
import Router from './Components/Router';
// utilities
import axios from 'axios';
import cookie from 'react-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
// images, css
import './App.css';
import lang from './Components/language/lang';

const socket = io('http://localhost:5000');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      logged: false,
      id: '',
    }
  }
  
  componentDidMount(){
    socket.on('addProduct', (data) => {
      this.notify(data.message);
    })
    cookie.load('token')
    cookie.load('id');
    this.isLogged();
    
    if(!cookie.load('language')){
      cookie.save('language', 'pol');
    }
  }
  notify = (text) => toast(text);

  Logout = () => {
    cookie.remove('token');
    this.notify(lang.notifications.onLogout);
    this.isLogged();
  }

  login = (token, id, type) => {
    cookie.save(
      'token', 
      `Bearer ${token}`, 
    );
    cookie.save('id', id);
    cookie.save('type', type);    
    if(id) this.notify(lang.notifications.onLogin);
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
      <ToastContainer />
        <MainMenu changeLanguage={this.changeLanguage} token={this.state.token} setToken={this.setToken} logged={this.state.logged} logout={this.Logout} />
        <Router notify={this.notify}id={cookie.load('id')} login={this.login} logout={this.Logout} logged={this.state.logged} token={this.state.token}/>
      </div>
    );
  }
}
export default App;