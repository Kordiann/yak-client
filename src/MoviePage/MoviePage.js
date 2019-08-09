import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';
import { getSendingProps } from '../Helpers/SendingProps'; 
import { getMovieById,
        getUserFriends,
        getMovieByIdWithUser } from '../Helpers/API';
import SaveMovie from '../Buttons/SaveMovie';


import './moviepage.css';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    userName: state.userName,
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
          if(movie.imdbID === movieValidate) {
            validatedFriends.push(friend);
          }
        });

        this.setState({
          friendsToShow: validatedFriends
        });
      }
    });
  }

  fetchSearchingData = (e) => {
    const movieid = this.props.movieid;
    
    if(this.props.isLogged) {
      const MoviesAPI = getMovieByIdWithUser(movieid, this.props.userID);

      fetch(MoviesAPI, getSendingProps())
      .then(res => res.json())
      .then(json => {
          this.setState({
            isLoaded: true,
            results: json.smovies,
          });
      });
    } else {
      const MoviesAPI = getMovieById(movieid);

      fetch(MoviesAPI, getSendingProps())
      .then(res => res.json())
      .then(json => {
          this.setState({
            isLoaded: true,
            results: json.smovies,
          });
      });
    }
    const Friends = getUserFriends(this.props.userID);

    

    if(this.props.isLogged) {
      fetch(Friends, getSendingProps())
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if(json.users !== null) {
            this.validateIfSaved(json.users, movieid);
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
    if (this.state.toRedirect)  return <Redirect to='/' />;

    const { results } = this.state;
    var result = results[0];

    if(result !== undefined && results !== undefined) {

      return (<div id="moviepage" className="movie">
              <div className="card movie_card">
                  <span className='movie_card_span'>{result.title}</span>
                  <img className='movie_card_img' alt='' width='200px' height='300px' src={result.poster}/>
                  <ul className='movie_card_element'>
                      <li>Type : {result.type}</li>
                      <li>Year : {result.year}</li>
                      <li>Plot : {result.plot}</li>
                  </ul>
                  <div className="friends">
                    { this.showFriends() }
                  </div>
                  { (!result.saved && this.props.isLogged) ? ( <div className="saveButton">
                        <SaveMovie movieIMDBID={result.imdbID} userID={this.props.userID} />
                      </div> ) : ( null ) }
              </div>
            </div>);
    } else {
      return (<div id="moviepage" className="movie">
              <div className="card movie_card">
                  <span className='movie_card_span'></span>
                  <img className='movie_card_img' alt='' width='200px' height='300px' src=''/>
                  <ul className='movie_card_element'>
                      <li>Type : </li>
                      <li>Year : </li>
                      <li>Plot : </li>
                  </ul>
                  <div className="friends">
                    { this.showFriends() }
                  </div>
              </div>
            </div>);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);