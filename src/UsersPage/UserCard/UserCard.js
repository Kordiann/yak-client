import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendFriendRequest } from '../../Helpers/API';
import { postSendingProps } from '../../Helpers/SendingProps';
import { userProfile } from '../../Helpers/Animations';
import { setupRecipientID,
        setupMovieId } from '../../redux/reducer';
import { Redirect } from 'react-router-dom';


import './usercard.css';

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userID: state.userID,
    movieid: state.movieid,
    recipientID: state.recipientID,
    isLogged: state.isLogged
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setupMovieId: (movieid) => dispatch(setupMovieId(movieid)),
    setupRecipientID: (recipientID) => dispatch(setupRecipientID(recipientID)),
  };
}

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toMoviePage: false,
      toMessagesPage: false,

      isSend: false,
    };
  }

  saveMovieIdAndGo = (e) => {
    e.preventDefault();

    this.props.setupMovieId(e.currentTarget.attributes.getNamedItem("data-ref").value);

    this.setState({
      toMoviePage: true,
    });
  }

  pushFriendRequest = (e, recipient) => {
    e.preventDefault();

    const userName = this.props.userName;

    const sendFriendReqAPI = sendFriendRequest(userName, recipient);

    fetch(sendFriendReqAPI, postSendingProps())
      .then(res => res.json())
      .then(json => {
        if(json.response === "200") {
          this.setState({
            isSend: true,
          });
        }
      });
  }

  goToMessages = (e, recipientID) => {
    e.preventDefault();

    this.props.setupRecipientID(recipientID);

    this.setState({
      toMessagesPage: true,
    });
  }

  render() {
    const { user, i, isLogged} = this.props;
    const { isSend, toMoviePage, toMessagesPage } = this.state;

    if(toMoviePage) return <Redirect to='/moviepage' push={true} />

    if(toMessagesPage) return <Redirect to='/messages' push={true} />
    
    return (
      <div key={i}
        className='card profile'
        onClick={e => userProfile(e, i)}>
            <div className='avatar' >
                <img width='80px'alt='' height='80px' src='lol.png'/>
                <span>{user.userName}</span>
                { isLogged ? (<i onClick={e => this.goToMessages(e, user.id)} className="btn fas fa-paper-plane"></i>) : (null) }
            </div>

            <div id={i} className='user_details display_none'>
              { !isSend && user.defaultUser && isLogged ? (<div className='btn friend_btn'
              onClick={e => this.pushFriendRequest(e, user.userName) }>Add Friend</div>) :
                (null)}
              <span className='font'>Saved movies</span>
              <div className='usermovies'>
                {user.SavedMovies.slice(0, 8).map((movie, i) => {
                  return(
                    <div key={i} 
                    data-ref={movie.imdbID}
                    className='small-card'
                    onClick={e => this.saveMovieIdAndGo(e)}
                    >
                      <img alt='' src={(movie.poster === 'N/A') ?
                      ('https://m.media-amazon.com/images/M/MV5BMDA4NjQzN2ItZ'+
                      'DhhNC00ZjVlLWFjNTgtMTEyNDQyOGNjMDE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg') :
                      (movie.poster)} width='80px' height='80px' />
                    </div>
                  );
                })}
              </div>
            </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);