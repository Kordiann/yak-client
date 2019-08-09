import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserMessages } from '../Helpers/API';
import { getSendingProps } from '../Helpers/SendingProps';
import { Scrollbars } from 'react-custom-scrollbars';
import MessagesBox from './MessagesBox/MessagesBox';
import  UserBar  from './UserBar/UserBar';

import './messagespage.css';

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    recipientID: state.recipientID,
    userID: state.userID,
    isLogged: state.isLogged
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

class MessagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,

      isLoaded: false,
      messages: [],
    };

    this.selectMessages = this.selectMessages.bind(this);
  }

  componentDidMount() {
    if(this.props.isLogged) {
      this.fetchUsersMessages();
    }
  }

  fetchUsersMessages = (e) => {
    var userMessagesAPI = getUserMessages(this.props.userID);

    fetch(userMessagesAPI, getSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          messages: json.messages,
        })
      });
  }

  selectMessages = () => {
    const { messages } = this.state;
    const { recipientID } = this.props;

    let userMessages = [];
      
    messages.forEach((message) => {
      if(message.userID === recipientID) {
        userMessages = message.messages
      }
    });

    return userMessages;
  }
  
  render() {
    const { messages } = this.state;
    const { userID, recipientID, userName, isLogged } = this.props; 

    if (!isLogged) return <Redirect to="/" />

    const messagesList = messages.map((message, i) => {
      return <UserBar key={i} userName={message.userName} recipientIDD={message.userID}/>;
    });

    return (
      <div id='messagespage' className="form container flex-container">
        <Scrollbars className='usersList' style={{ width: 250 }}>
          { messages.length === 0 ? ("Select friends to show messages, or write a new one.") : (messagesList) }
        </Scrollbars>
        <MessagesBox userID={userID} recipientID={recipientID} userName={userName} messages={ this.selectMessages() }/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);