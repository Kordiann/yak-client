import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMovieId } from '../redux/reducer';
import { getSendingProps } from '../Helpers/SendingProps'; 

import './moviepage.css';

var URL = 'http://localhost:8080/movies/movie?id=';

const mapStateToProps = state => {
  return {
    movieid: state.movieid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setupMovieId: (movieid) => dispatch(setupMovieId(movieid)),
  };
}

class MoviePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      results: [],
    };
  }

  componentWillUnmount() {
    this.props.setupMovieId(null);
  }

  componentDidMount() {
    this.fetchSearchingData();
  }

  fetchSearchingData = (e) => {
    fetch(`${URL}${this.props.movieid}`, getSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          results: json
        })
      });
  }

  render() {
      return (
        <div id="moviepage" className="movie">
            <div className="card movie_card">
                <span>{this.state.results.title}</span>
                <img className='movie_card_img' alt='' width='200px' height='300px' src={this.state.results.poster}/>
                <ul className='movie_card_element'>
                    <li>Type : {this.state.results.type}</li>
                    <li>Year : {this.state.results.year}</li>
                    <li>Plot : {this.state.results.plot}</li>
                </ul>
            </div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);