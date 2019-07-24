import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSendingProps } from '../Helpers/SendingProps';
import { getUserFriends } from '../Helpers/API';
import { userProfile } from '../Helpers/Animations';
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

class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
        users: [],
        noFriend: true,
    };
  }

  componentDidMount() {
    if(this.props.isLogged) {
      this.fetchUserFriends();
    }
  }

  fetchUserFriends = () => {
    const URL = getUserFriends(this.props.userID);

    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if(json.response === "200") {
          this.setState({
            users: json.users,
            noFriend: false
          });
        } 
      });
  }

  saveMovieIdAndGo = (e) => {
    this.props.setupMovieId(e.currentTarget.attributes.getNamedItem("data-ref").value);

    this.setState({
      toRedirect: true,
    });
  }

  render() {

    const { toRedirect } = this.state;

    if(toRedirect) return <Redirect to='/moviepage' push={true} />;   

    return (
        <div className="justify">
            <div className="parent">
                { this.state.noFriend? (null) :
                  (this.state.users.map((user, i) => { 
                    return (
                        <div key={user.userName}
                         className='card profile'
                         onClick={e => userProfile(e, i)}>
                            <div className='avatar'>
                                <img width='80px'alt='' height='80px' src='lol.png'/>
                                <span>{user.userName}</span>
                            </div>

                            <div id={i} className='user_details display_none'>
                              {user.recipient ? (<div className='btn req_btn'
                              onClick={e => this.pushFriendRequest(e, user.userName)}>Delete Friend Request</div>) :
                                (null)}
                              {user.sender ? (<div className='btn req_btn'
                              onClick={e => this.pushFriendRequest(e, user.userName)}>Accept Friend Request</div>) :
                                (null)}
                              <span className='font'>Saved movies</span>
                              <div className='usermovies'>
                                {user.SavedMovies.slice(0, 12).map((movie, i) => {
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
                  })) }
            </div>
        </div>
    );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);