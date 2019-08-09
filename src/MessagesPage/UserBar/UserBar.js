import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupRecipientID } from '../../redux/reducer';

import './userbar.css';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    recipientID: state.recipientID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setupRecipientID: (recipientID) => dispatch(setupRecipientID(recipientID)),
  };
}

class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  setRecipientID = () => {
    this.props.setupRecipientID(this.props.recipientIDD);
  }

  render() {
    const { userName } = this.props;
    const { recipientIDD, recipientID } = this.props;

    console.log("USerBar   " + recipientIDD)
    console.log("NOUSerBar   " + recipientID)

    return (
      <div id={userName} 
      onClick={this.setRecipientID} 
      className={ recipientIDD === recipientID ? ("userbar_container selected_userbar") : ("userbar_container") }>
          <div className="photo">
              <img alt='' width="60px" height="60px" src="lol.png" />
          </div>
          <div className="name">
              {userName}
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);