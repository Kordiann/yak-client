import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSendingProps, postSendingProps } from '../Helpers/SendingProps';
import { getUsersForUsersPage,
         sendFriendRequest, 
         getAllUsers} from '../Helpers/API';
import { userProfile } from '../Helpers/Animations';
import { setupMovieId } from '../redux/reducer';
import { Redirect } from 'react-router-dom';

import './userspage.css';

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

class UsersPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],

      error: false,
      toRedirect: false,
    };
  }

  componentDidMount() {
    if(this.props.isLogged) {
      this.fetchData(getUsersForUsersPage(this.props.userID));  
    } else {
      this.fetchData(getAllUsers());
    }
  }

  fetchData = (api) => {
    fetch(api, getSendingProps())
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if(json !== null) {
          this.setState({
            users: json.users
          });
        } else {
          this.setState({
            error: true
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

  pushFriendRequest = (e, recipient) => {
    e.preventDefault();

    const userName = this.props.userName;

    const sendFriendReqAPI = sendFriendRequest(userName, recipient);

    fetch(sendFriendReqAPI, postSendingProps())
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  }

  getUsers = () => {
    const { users } = this.state;
    
    return users.map((user, i) => {
      return(
        <div key={user.userName}
             className='card profile'
             onClick={e => userProfile(e, i)}
             >
                <div className='avatar'>
                    <img width='80px'alt='' height='80px' src='lol.png'/>
                    <span>{user.userName}</span>
                </div>

                <div id={i} className='user_details display_none'>
                  {user.defaultUser && this.props.isLogged ? (<div className='btn friend_btn'
                   onClick={e => this.pushFriendRequest(e, user.userName)}>Add Friend</div>) :
                     (null)}
                  <span className='font'>Saved movies</span>
                  <div className='usermovies'>
                    {user.SavedMovies.slice(0, 12).map((movie, i) => {
                      return(
                        <div key={i} 
                        data-ref={movie.imdbID}
                        className='small-card'
                        onClick={e => this.saveMovieIdAndGo(e)}
                        >
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
  }

  render() {
    const { error, toRedirect } = this.state;

    const users = this.getUsers();

    if(error) {
      return <Redirect to='/' push={true} />
    }

    if(toRedirect === true) {
      return <Redirect to='/moviepage' push={true} />
    }

      return(
          <div id='userspage'>
            <div className='container flex'>
              <div className='input_container'>
                <input type="text" className="form-control input users_input form-control-lg" placeholder="Search Users" />
              </div>
              { users }
            </div>
          </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);