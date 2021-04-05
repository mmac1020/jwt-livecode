import React from 'react';
import axios from 'axios';
import {SignIn} from './SignIn'
export class App extends React.Component{
  constructor(){
    super();
    this.state = {
      auth: {}
    };
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout(){
    window.localStorage.removeItem('token');
    this.setState({ auth: {}});
  }
  async attemptTokenLogin(){
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      this.setState({ auth: response.data });
    }
  }
  componentDidMount(){
    this.attemptTokenLogin();
  }
  async signIn(credentials){
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    this.attemptTokenLogin();
  }
  render(){
    const { auth } = this.state;
    const { signIn, logout } = this;
    if(!auth.id){
      return <SignIn signIn={ signIn }/>
    }
    else {
      return (
        <div>
          Welcome { auth.username }
          <button onClick={ logout }>Logout</button>
        </div>
      );
    }
  }
}
