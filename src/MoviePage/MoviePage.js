import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';
import { getSendingProps } from '../Helpers/SendingProps'; 

import './moviepage.css';

var URL = 'http://localhost:8080/movies/movie?id=';

const mapStateToProps = state => {
  return {
    movieid: state.movieid,
    isLogged: state.isLogged
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
      toRedirect: false,
    };
  }

  componentDidMount() {
    this.fetchSearchingData();
    this.props.setupMovieId(null);
  }

  fetchSearchingData = (e) => {
    fetch(`${URL}${this.props.movieid}`, getSendingProps())
      .then(res => res.json())
      .then(json => {
        if(json.hasOwnProperty('status')) {
          this.setState({
            toRedirect: true,
          });
        } else {
          this.setState({
            isLoaded: true,
            results: json
          });
        } 
        console.log(json)
      });
  }

  render() {
    if (!this.state.toRedirect) {
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
    } else {
        return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);