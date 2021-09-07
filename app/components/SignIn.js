import React from 'react';
export class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    this.props.signIn({
      username,
      password,
    });
  }
  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input value={username} onChange={this.onChange} name='username' />
        <input value={password} onChange={this.onChange} name='password' />
        <button>Sign In</button>
      </form>
    );
  }
}
