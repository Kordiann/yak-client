import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import { postSendingProps } from '../Helpers/SendingProps';

import './registerpage.css';

var URL_WITHOUT_PARAMS = "http://localhost:8080/users/add?";

function validate(login, email, password) {
  // True means invalid
  let isEmail = validator.isEmail(email);

  return {
    login: login.length === 0,
    password: password.length === 0,
    email: email.length === 0,
    isEmail: !isEmail
  };
}

class RegisterPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      email: '',
      toRedirect: false,

      everFocusedLogin: false,
      everFocusedPassword: false,
      everFocusedEmail: false,

      inFocus: "",
    }
  }

  handleLoginChange = evt => {
    this.setState({ login: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handleSubmit = evt => {
    const { login, email, password } = this.state;
    this.postNewUser(login, email, password);
    this.setState({
      toRedirect:true,
    });
  };

  canBeSubmitted() {
    const errors = validate(this.state.login, this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    return isDisabled;
  }

  postNewUser = (login, email, password) => {
    var URL = `${URL_WITHOUT_PARAMS}${"userName="}${login}${"&password="}${password}${"&email="}${email}`;

    fetch(URL, postSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          results: json,
          toRedirect: true,
        })
    });
  }

  render() {
    const errors = validate(this.state.login, this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    if (this.state.toRedirect === true) return <Redirect to="/" />;

    return (
       <div className="register_form container">
        <div className="form card register">
          <div className="content">
            <label>Register</label>

            <form className="form login_form" onSubmit={this.handleSubmit}>

              <div className={errors.login ? ("error form-group") : ("form-group")}>
                                    <label>login</label>
                                    <input type=""
                                    className="form-control"
                                    name="login" 
                                    value={this.state.login}
                                    onChange={this.handleLoginChange}
                                    required />
                                </div> 

              <div className={errors.password ? ("password form-group") : ("form-group")}>
                                    <label>password</label>
                                    <input type="password" 
                                    className="form-control"
                                    value={this.state.password}
                                    name="password"
                                    onChange={this.handlePasswordChange} 
                                    required />
              </div> 

              <div className={errors.email ? ("error form-group") : ("form-group")}>
                                    <label>email</label>
                                    <input type=""
                                    className="form-control"
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    required />
              </div> 

              <div className="form-group">
                <input disabled={isDisabled} type="submit" className="btn btn-primary btn-block" value="Register" />
              </div> 
              
            </form>
          </div>
        </div>
       </div>
    );
  }
}

export default RegisterPage;