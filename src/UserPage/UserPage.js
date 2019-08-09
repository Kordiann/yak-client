import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSendingProps, postSendingProps } from '../Helpers/SendingProps'; 
import { changePassword,
        getUserByUserName } from '../Helpers/API';

import './userpage.css';

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
        if(this.props.isLogged) {
            this.fetchSearchingData();
        }
    }

    fetchSearchingData = (e) => {
        const URL = getUserByUserName(this.props.userName, this.props.userID);

        fetch(URL, getSendingProps())
          .then(res => res.json())
          .then(json => {
              console.log(json)
            this.setState({
                email: json.user.email,
                isActivate: json.user.ativate,
                isActivationCodeSend: json.user.activationCodeSend
            });
          });
    }

    postData = () => {
        const { password, _password } = this.state;
        const URL = changePassword(this.props.userID, password, _password);
        
        fetch(URL, postSendingProps())
        .then(res => res.json())
        .then(json => {
            if (json.Response === "200") {
                this.setState({ 
                    error: false,
                    password: '',
                    _password: ''
                }); 
                 this.closeMenu();
                }
            else {
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
        const { isLogged } = this.props;

        if(isLogged) {
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

