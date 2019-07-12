import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/reducer';
import { connect } from 'react-redux';

import './navbar.css';
import Avatar from '../Helpers/Avatar';

const mapStateToProps = state => {
  return {
    userName: state.userName,
    isLogged: state.isLogged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: () => dispatch(deleteUser()),
  };
}

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,

      isLogged: false,
      userName: '',

      phrase: '',

      isFixed : false,
      fixedClassName : 'sub_nav fixed_nav',
      nonFixedClassName : 'sub_nav',

      isSearch : false,
      searchClassName : 'input_search',
      nonSearchClassName : '',

      opacity_v0: 'opacity_v0',
      opacity_v1: 'opacity_v1',

      translate_Z100 : 'translate_Z100',
      translate_Z150 : 'translate_Z150',
    };
    
    this.handleScroll = this.handleScroll.bind(this);
    this.makeSearch = this.makeSearch.bind(this);
    this.storePhrase = this.storePhrase.bind(this);
  }

  componentDidUpdate() {
    if(this.props.userName != undefined && this.state.isLogged == false) {
      this.setState({
        isLogged: true,
      });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let scrollY = window.scrollY;

    if (scrollY > 100) {
      this.setState({
        isFixed : true,
      });
    } else {
      this.setState({
        isFixed : false,
      });
    }
  }

  storePhrase = (e) => {
    this.setState({
      phrase: e.target.value,
    });
  }

  passPhrase = () => {

  }

  makeSearch = (e) => {
    e.preventDefault();
    if (!this.state.isSearch) {
      this.setState({
        isSearch : true,
      });
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
      return (
        <div id="root">
          <div className="nav">
          <Link to="/"><span>Yak</span></Link>
              <div className={
                this.state.isFixed ?
                (this.state.fixedClassName) :
                (this.state.nonFixedClassName)
              }>
                <ul>
                    <li className={
                            this.state.isFixed ?
                            ('') :
                            (this.state.translate_Z100)
                            }>
                            <Link to="/"><span id="nav_logo" className={
                            this.state.isFixed ?
                            (this.state.opacity_v1) :
                            (this.state.opacity_v0)
                            }>Yak</span></Link></li>
                    <li className={
                            this.state.isFixed ?
                            ('') :
                            (this.state.translate_Z100)
                            }><i className="fas fa-address-book"></i></li>
                    <li className={
                            this.state.isFixed ?
                            ('search ') :
                            ('search ' + this.state.translate_Z100)
                            }>
                      <input className='search_input' 
                              type="text" 
                              onChange={e => this.storePhrase(e)} 
                              placeholder="Search"></input>
                      <i className="fas fa-search"></i>
                    </li>
                    <li className={
                            this.state.isFixed ?
                            ('') :
                            (this.state.translate_Z100)
                            }><i className="fas fa-list-ul"></i></li>
                    <li> 
                      {this.props.isLogged ?
                      (<Avatar />) :
                      (<Link to='/login'><i className="fas fa-sign-in-alt"></i></Link>)}
                    </li>
                </ul>
              </div>    
        </div>
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);