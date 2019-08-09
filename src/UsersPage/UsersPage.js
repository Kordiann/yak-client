import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSendingProps } from '../Helpers/SendingProps';
import { getUsersForUsersPage, 
         getAllUsers} from '../Helpers/API';
import { Redirect } from 'react-router-dom';

import './userspage.css';
import UserCard from './UserCard/UserCard';

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
  };
}

class UsersPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],

      filteredUsers: [],
      isFiltered: false,

      error: false,
      toRedirect: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if(this.props.isLogged) {
      this.fetchData(getUsersForUsersPage(this.props.userID));  
    } else {
      this.fetchData(getAllUsers());
    }
  }

  filterList = (e) => {
    e.preventDefault();

    const { users } = this.state;

    let filteredUsers = users;

    filteredUsers = filteredUsers.filter(function(user) {
      return user.userName.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });

    this.setState({
      filteredUsers: filteredUsers,
      isFiltered: true,
    });
  } 

  fetchData = (api) => {
    fetch(api, getSendingProps())
      .then(res => res.json())
      .then(json => {
        if(json !== null) {
          console.log(json);
          this.setState({
            users: json.users,
            filteredUsers: json.users,
          });
        } else {
          this.setState({
            error: true
          });
        }
      });
  }

  render() {
    const { error, toRedirect } = this.state;

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
                <span>{this.state.koko}</span>
                <input type="text" 
                className="form-control input users_input form-control-lg" 
                onChange={e => this.filterList(e)} 
                placeholder="Search Users" />
              </div>
              {  this.state.filteredUsers.map((user, i) => {
                      return( <UserCard user={user} key={i} i={i} userName={this.props.userName} /> );
                    }) }
            </div>
          </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);