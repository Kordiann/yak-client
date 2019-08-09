import React, { Component } from 'react';
import Moment from 'react-moment';

import './message.css';

class MessageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { content, date } = this.props;

    return (
      <div className="message_chat_user">
          <div className='user_avatar_user'><img alt='' src='lol.png' height='53px' width='52px' /></div>
          <div className='user_message_user'>
          { content }
            <span className='message_date'><Moment format="YYYY/MM/DD HH:mm">{ date }</Moment></span>
          </div>
      </div>
    )
  }
}

export default MessageUser;