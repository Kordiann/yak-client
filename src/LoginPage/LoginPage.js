import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/reducer';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './loginform.css';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isLoginPending: false,
      isLoginSuccess: false,
      loginError: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let {isLoginPending, isLoginSuccess, loginError} = this.props;

    if (this.props.isLoginSuccess) {
        return <Redirect to="/" />
    }

    return (
      <div className="form container flex-container">
        <div className="form card login">
          <div className="content">
            <label>Sign in</label>

            <form className="form login_form" onSubmit={this.onSubmit}>

              <div className="form-group">
                  <label className={loginError == null ? 
                        ("") :
                        ("error")}>login</label>
                  <input type=""
                        className="form-control"
                        name="name" 
                        onChange={e => this.setState({name: e.target.value})} />
              </div> 

              <div className="form-group">
                  <label className={loginError == null ? 
                        ("") :
                        ("error")}>password</label>
                  <input type="password" 
                        className="form-control"
                        name="password" 
                        onChange={e => this.setState({password: e.target.value})} />
              </div> 

              <div className="form-group">
                  <input type="submit" className="btn btn-primary btn-block" value="Login" />
              </div>  

              <div className="message">
              { isLoginPending && <div>Please wait...</div> }
              { isLoginSuccess && <div>Success.</div> }
              { loginError && <div className="error">{loginError.message}</div> }
              </div>
            </form>
          </div>
          <Link to='/register'>
            <div className="registration_content">
              <i className="fas fa-registered"></i>
              <label>egister</label>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    let { name, password } = this.state;
    this.props.login(name, password);
    this.setState({
      name: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError,
    isLogged: true,
    userName: state.userName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (name, password) => dispatch(login(name, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);