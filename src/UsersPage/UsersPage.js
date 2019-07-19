import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSendingProps, postSendingProps } from '../Helpers/SendingProps';
import { getAllUsers,
         getUserFriends } from '../Helpers/API';
import { userProfile } from '../Helpers/Animations';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';

import './userspage.css';

const mapStateToProps = state => {
  return {
    userName: state.userName,
    movieid: state.movieid,
    isLogged: state.isLogged,
    userID: state.userID
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setupMovieId: (movieid) => dispatch(setupMovieId(movieid)),
  };
}

class UsersPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
      return(
          <div id='userspage'></div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);