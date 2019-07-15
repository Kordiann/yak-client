import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSendingProps } from '../Helpers/SendingProps'; 

import './userpage.css';

const URL = 'http://localhost:8080/users/user?userName=';

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
        }
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
            console.log(json)
          });
    }

    render() {
        const { email, isActivate, isActivationCodeSend } = this.state;

        if(this.props.isLogged) {
            return (
            <div id='userpage' className='container'>
                <div className='card'>
                    <ul className='user_settings_list'>
                        <li></li>
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
                    </ul>
                </div>
            </div>
            )
        } else { 
            return <Redirect to='/' />
        }
        
    }
} 



export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

