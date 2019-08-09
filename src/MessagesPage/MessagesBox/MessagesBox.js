import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Message from './Message/Message';
import MessageUser from './Message/MessageUser';
import { postMessage } from '../../Helpers/API';
import { postSendingProps } from '../../Helpers/SendingProps';

import './messagesbox.css';

class MessagesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: '',
    };
  }

  componentDidMount() {
    console.log(this.props.recipientID);
    console.log(this.props.userID);
  }

  sendMessage = (e) => {
    e.preventDefault();

    const { message } = this.state;
    const { recipientID, userID } = this.props;

    const postMessageAPI = postMessage(userID, recipientID, message);

    const newMessage = {
      content: message,
    }

    fetch(postMessageAPI, postSendingProps())
        .then(res => res.json())
        .then(json => {
          if(json.response === "200") {
            this.setState({
              message: '',
            });
          }
        });
  }

  render() {
    const { userName } = this.props;
    const { message } = this.state;

    console.log(this.props.messages);

    const listMessages = this.props.messages.map((message, i) => {
      if(message.sender === userName) {
        return <MessageUser key={i} content={message.content} date={message.timeSend} />
      } else {
        return <Message key={i} content={message.content} date={message.timeSend} />
      }
    })

    return (
      <div id='messagesbox' className="userbar_container">
          <div className='scrollbar_container'>
            <Scrollbars>
              { listMessages }
            </Scrollbars>
          </div>
          <div className='message_input_container'>
              <span>Message</span>
              <input className='message_input'
                 type="text"
                 name="message"
                 value={message}
                 onChange={e => this.setState({ message: e.currentTarget.value })}
                 placeholder='Say hello...'/>
                 <i onClick={e => this.sendMessage(e)} className="btn fas fa-paper-plane"></i>
          </div>
      </div>
    )
  }
}

export default MessagesBox;