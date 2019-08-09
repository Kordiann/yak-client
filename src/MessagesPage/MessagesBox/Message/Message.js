import React, { Component } from 'react';
import Moment from 'react-moment';

import './message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { content, date } = this.props;

    return (
      <div className="message_chat">
          <div className='user_avatar'><img alt='' src='lol.png' height='53px' width='52px' /></div>
          <div className='user_message'>
             { content }
             <span className='message_date'><Moment format="YYYY/MM/DD HH:mm">{ date }</Moment></span>
          </div>
      </div>
    )
  }
}

export default Message;