import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pushSearchPhrase } from '../redux/reducer';
import './navbar.css';
import Avatar from '../Components/Avatar';

const mapStateToProps = state => {
  return {
    userName: state.userName,
    phrase: state.phrase,
    isLogged: state.isLogged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushSearchPhrase: (phrase) => dispatch(pushSearchPhrase(phrase)),
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
      isSearch: true,

      isFixed : false,
      fixedClassName : 'sub_nav fixed_nav',
      nonFixedClassName : 'sub_nav',

      searchClassName : 'input_search',
      nonSearchClassName : '',

      opacity_v0: 'opacity_v0',
      opacity_v1: 'opacity_v1',

      translate_Z100 : 'translate_Z100',
      translate_Z150 : 'translate_Z150',
    };
    
    this.handleScroll = this.handleScroll.bind(this);
    this.storePhrase = this.storePhrase.bind(this);
  }

  componentDidUpdate() {
    if(this.props.userName !== undefined && this.state.isLogged === false) {
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

  resetInput = () => {
    this.setState({
      phrase: '',
    });
  }

  storePhrase = (e) => {
    this.setState({
      phrase: e.target.value,
    });
    this.props.pushSearchPhrase(e.target.value);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isSearch, phrase } = this.state;
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
                            }><Link to="/userprofile"><span className='nav_span'>Users</span></Link></li>
                    <li className={
                            this.state.isFixed ?
                            ('search ') :
                            ('search ' + this.state.translate_Z100)
                            }>
                      {isSearch ? (<input className='search_input' 
                              type="text"
                              placeholder="Search"
                              onChange={e => this.storePhrase(e)}
                              value={phrase}></input>) :
                              (null)}
                      <Link onClick={this.resetInput} to='/search'><i className="fas fa-search"></i></Link>
                    </li>
                    <Link to='/movies'><li className={
                            this.state.isFixed ?
                            ('last') :
                            ('last ' + this.state.translate_Z100)
                            }><span className='nav_span'>Movie list</span></li> </Link>
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