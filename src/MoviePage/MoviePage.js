import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';
import { getSendingProps } from '../Helpers/SendingProps'; 
import { getMovieById,
        getUserFriends } from '../Helpers/API';

import './moviepage.css';

const mapStateToProps = state => {
  return {
    userID: state.userID,
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
      friends: [],
      friendsToShow: [],

      toRedirect: false,
    };
  }

  componentDidMount() {
    if(this.props.movieid !== null) {
      this.fetchSearchingData();
      this.props.setupMovieId(null);
    }
  }

  validateIfSaved = (friends, movieValidate) => {
    const validatedFriends = [];

    friends.forEach(friend => {
      if(friend.SavedMovies !== null) {
        friend.SavedMovies.slice(0, 4).forEach(movie => {
          console.log('movieValidate ' + movieValidate);

          if(movie.imdbID === movieValidate) {
            validatedFriends.push(friend);
          }
        });

        this.setState({
          friendsToShow: validatedFriends
        });
      }
    });

    console.log('validatedFriends ' + validatedFriends);
  }

  fetchSearchingData = (e) => {
    const movieid = this.props.movieid;
    const Movies = getMovieById(movieid);
    const Friends = getUserFriends(this.props.userID);

    fetch(Movies, getSendingProps())
      .then(res => res.json())
      .then(json => {
        if(json.hasOwnProperty('status')) {
          this.setState({
            toRedirect: true,
          });
        } else {
          this.setState({
            isLoaded: true,
            results: json,
          });
        } 
      });

    if(this.props.isLogged) {
      fetch(Friends, getSendingProps())
        .then(res => res.json())
        .then(json => {
          console.log('json.friends ' + json.friends);
          if(json.friends !== null) {
            this.validateIfSaved(json.friends, movieid);
          }
        });
    }
  }

  showFriends = () => {
    const friendsToShow = this.state.friendsToShow;

    if (friendsToShow !== null) {
      const friends = friendsToShow.map((friend) => {
        return (
          <div key={friend.userName} className='friends_content'> 
            <img src='lol.png' width='60px' height='60px' alt={friend.userName} />
            <span className='user_name'>{friend.userName}</span>
          </div>
        );
      });

      return friends;
    } else {
      return null;
    }
  }

  render() {
    if (!this.state.toRedirect) {
      return (
        <div id="moviepage" className="movie">
            <div className="card movie_card">
                <span className='movie_card_span'>{this.state.results.title}</span>
                <img className='movie_card_img' alt='' width='200px' height='300px' src={this.state.results.poster}/>
                <ul className='movie_card_element'>
                    <li>Type : {this.state.results.type}</li>
                    <li>Year : {this.state.results.year}</li>
                    <li>Plot : {this.state.results.plot}</li>
                </ul>
                <div className="friends">
                  { this.showFriends() }
                </div>
            </div>
        </div>
      );
    } else {
        return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);