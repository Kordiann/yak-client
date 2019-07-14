import React from 'react';
import { connect } from 'react-redux';

import './userpage.css';

const mapStateToProps = state => {
    return {
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

        }
    }

    render() {
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
                        <li>Email: </li>
                    </ul>
                </div>
            </div>
            )
        } else { 
            return( <div className='container'>Error 505</div> )
        }
        
    }

    logout = () => {
        this.props.deleteUser();
        window.location.reload();
    }
} 



export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

