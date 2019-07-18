import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';

import './userprofilepage.css';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

class UserProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return(
        <div id='userprofilepage'></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);