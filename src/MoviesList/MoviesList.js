import React, { Component } from 'react';
import { getSendingProps } from '../Helpers/getSendingProps';

import './movieslist.css';

class MoviesList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        results: [],
        letters: ['a','b','c'],
    }

    this.fetchSearchingData = this.fetchSearchingData.bind(this);
  }

  componentDidMount() {
    this.fetchSearchingData();
  }

  fetchSearchingData = () => {
    fetch(URL, getSendingProps)
      .then(res => res.json())
      .then(json => {
            this.setState({
                results: json
              })
      });
  }

  render() {
    return (
        <div id="moviesList">
            <div className="sorted_letters_container">
                <ul className="sorted_letters">
                    {this.state.letters.map((letter, i) => {
                        return(<li key={i}>{letter}</li>)
                    })}
                </ul>
            </div>
        </div>
    );
  }
}

export default MoviesList;