import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSendingProps ,postSendingProps } from '../Helpers/SendingProps'; 

import './userpage.css';

const URL = 'http://localhost:8080/users/user?userName=';
const URL_PASSWORD = 'http://localhost:8080/users/user/change_password?userID=';

const mapStateToProps = state => {
    return {
        userID: state.userID,
        userName: state.userName,
        isLogged: state.isLogged
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
}

class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            _password: '',
            showMenu: false,

            error: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        this.fetchSearchingData();
    }

    fetchSearchingData = (e) => {
        fetch(`${URL}${this.props.userName}${'&userID='}${this.props.userID}`, getSendingProps())
          .then(res => res.json())
          .then(json => {
            this.setState({
                email: json.Email,
                isActivate: json.isActivate,
                isActivationCodeSend: json.isActivationCodeSend
            });
          });
    }

    postData = () => {
        const { password, _password } = this.state;
        
        fetch(`${URL_PASSWORD}${this.props.userID}${'&oldPassword='}${password}${'&newPassword='}${_password}`, postSendingProps())
        .then(res => res.json())
        .then(json => {

            console.log(json);

            if (json.Response === "200") {
                this.setState({ 
                    error: false,
                    password: '',
                    _password: ''
                }); 
                 this.closeMenu();
                 console.log("  sss " )
                }
            else {
                console.log("  sdawsddss " )

                this.setState({ 
                    error: true,
                    password: '',
                    _password: ''
                }); 
            } 
        })
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({
            showMenu: true
        });
    }

    closeMenu() {
        this.setState({
            showMenu: false
        });
    }

    render() {
        const { error, showMenu, email, isActivate, isActivationCodeSend } = this.state;
        const { password, _password } = this.state;

        if(this.props.isLogged) {
            return (
            <div id='userpage' className='container'>
                <div className='card'>
                    <ul className='user_settings_list'>
                        <li><img className='user_settings_avatar'
                                    alt=''
                                    width='52px' 
                                    height='53px' 
                                    src='lol.png'/>
                            <div className='btn user_btn'>Change avatar</div></li>
                        <li className={isActivate ? ('user_info') : ('user_info error')}>{email}</li>
                        {!isActivate && !isActivationCodeSend ? (<li>
                            <div className='btn'>Send Activation Message</div>
                        </li>) : ('')}
                        <li><div onClick={this.showMenu} className="btn">Change Password</div></li>
                    </ul>
                </div>
               {showMenu ? ( <div id="change_password" className="change_password_form card">
                   <div className='exit' onClick={this.closeMenu}>x</div>
                    <input type="epassword" 
                            name="epassword" 
                            id="password" 
                            className={error ? ("password_input error") : ("password_input")}
                            value={password}
                            onChange={e => this.setState({password: e.currentTarget.value})} 
                            placeholder="old password"></input>
                    <input type="_password" 
                            name="_password" 
                            id="_password" 
                            className={error ? ("password_input error") : ("password_input")}
                            value={_password}
                            onChange={e => this.setState({_password: e.currentTarget.value})} 
                            placeholder="new password"></input>
                    <div className="btn" onClick={this.postData}>submit</div>
                </div>) : (null)}
            </div>
            )
        } else { 
            return <Redirect to='/' />
        }
        
    }
} 



export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

