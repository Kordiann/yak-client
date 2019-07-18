import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSendingProps, postSendingProps } from '../Helpers/SendingProps';
import { getAllUsers,
         sendFriendRequest,
         getUserFriends } from '../Helpers/API';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';

import './userprofile.css';

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

class MoviePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
        results: [],
        friends: [],
    };
  }

  componentDidMount() {
    this.fetchSearchingData();

    if(this.props.isLogged) {
      this.fetchUserFriends();
    }
  }

  fetchUserFriends = () => {
    const URL = getUserFriends(this.props.userID);

    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        console.log(json.Friends);

        this.setState({
          friends: json.Friends
        });
      });
  }

  fetchSearchingData = (e) => {
    const URL = getAllUsers();

    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        let result = [];

        json.forEach(element => {
          if(element.userName !== this.props.userName) {
            result.push(element);
          } 
        });

        this.setState({
          isLoaded: true,
          results: result
        });
    });
  }

  sendFriend = (sender, recipient) => {
    const URL = sendFriendRequest(sender, recipient);

    fetch(URL, postSendingProps());
  }

  userProfile = (e, i) => {
    const el = e.currentTarget;
    const condition = Boolean(el.classList.contains('profile'));

    if (condition) {
      el.classList.add('big_profile');
      el.classList.remove('profile');

      const child = document.getElementById(i);
      child.classList.remove('display_none');

    } else {
      el.classList.remove('big_profile');
      el.classList.add('profile');

      const child = document.getElementById(i);
      child.classList.add('display_none');
    }
  }

  saveMovieIdAndGo = (e) => {
    this.props.setupMovieId(e.currentTarget.attributes.getNamedItem("data-ref").value);

    this.setState({
      toRedirect: true,
    });
  }

  render() {

    if(this.state.toRedirect) return <Redirect to='/moviepage' push={true} />;

    const searchResult = this.state.results.map((result, i) => { 
        return (
            <div key={result.userName}
             className='card profile'
             onClick={e => this.userProfile(e, i)}>
                <div className='avatar'>
                    <img width='80px'alt='' height='80px' src='lol.png'/>
                    <span>{result.userName}</span>
                </div>

                <div id={i} className='user_details display_none'>
                  {this.props.isLogged ? 
                  (<div onClick={this.sendFriend(this.props.userName, result.userName)} 
                  className='btn friend'>Add Friend</div>) : 
                  (null)}
                  <span className='font'>Saved movies</span>
                  <div className='usermovies'>
                    {result.SavedMovies.slice(0, 12).map((movie, i) => {
                      return(
                        <div key={i} 
                        data-ref={movie.imdbID}
                        className='small-card'
                        onClick={e => this.saveMovieIdAndGo(e)}>
                          <img alt='' src={(movie.poster === 'N/A') ?
                          ('https://m.media-amazon.com/images/M/MV5BMDA4NjQzN2ItZDhhNC00ZjVlLWFjNTgtMTEyNDQyOGNjMDE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg') :
                          (movie.poster)} width='80px' height='80px' />
                        </div>
                      );
                    })}
                  </div>
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