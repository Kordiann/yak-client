import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSendingProps } from '../Helpers/SendingProps';

import './userprofile.css';

const URL = 'http://localhost:8080/users/all';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

class MoviePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
        results: [],
    };
  }

  componentDidMount() {
    this.fetchSearchingData();
  }

  fetchSearchingData = (e) => {
    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          results: json
        });
    });

  }

  render() {

    const searchResult = this.state.results.map((result) => { 
        return (
            <div key={result.userName} className='card profile'>
                <div className='avatar'>
                    <img width='80px'alt='' height='80px' src='lol.png'/>
                    <span>{result.userName}</span>
                </div>
            </div>
          );
      });
   

    return (
        <div className="justify">
            <div className="parent">
                {searchResult}
            </div>
        </div>
    );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);