import React, { Component } from 'react';
import { saveMovie } from '../Helpers/API';
import { postSendingProps } from '../Helpers/SendingProps';

class SaveMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  saveMe = (e) => {
    e.preventDefault();
    const { movieIMDBID, userID } = this.props;

    var URL = saveMovie(movieIMDBID, userID);

    e.currentTarget.classList.add('hidden');

    fetch(URL, postSendingProps())
      .then()
  }

  render() {
    return (
        <button type="button " onClick={(e) => this.saveMe(e)}  className="btn ">Save</button>
    )
  }
}

export default SaveMovie;