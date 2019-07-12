import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './moviepage.css';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

class MoviePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
      return (
        <div id="moviepage" className="movie">
            <div className="card movie_card">
                <img className='movie_card_img' width='400px' height='600px' src='a.jpg'/>
                <ul className='movie_card_element'>
                    <li>23</li>
                </ul>
            </div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);