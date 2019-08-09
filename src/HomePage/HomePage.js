import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMovieId } from '../redux/reducer';
import { getSendingProps } from '../Helpers/SendingProps';
import { Redirect } from 'react-router-dom';
import { getHomeMovies } from '../Helpers/API';

import  { showElement,
  hideElement,
  showTitle,
  hideTitle } from '../Helpers/Animations';

import './homepage.css';

const movie_card_container = 'movie_card_container ';

const mapStateToProps = state => {
  return {
    userName: state.userName,
    movieid: state.movieid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setupMovieId: (movieid) => dispatch(setupMovieId(movieid)),
  };
}

class HomePage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      name: this.props.userName,

      toRedirect: false,
      isLoaded: true,
    }
  }

  componentDidMount() {
    this.fetchSearchingData();
  }

  fetchSearchingData = (e) => {
    const homeMoviesAPI = getHomeMovies();

    fetch(homeMoviesAPI, getSendingProps())
      .then(res => res.json())
      .then(json => {
        if(json.response === "200") {
          this.setState({
            isLoaded: true,
            results: json.smovies
          });
        } else {
          this.setState({
            isLoaded: false,
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

    const { toRedirect, isLoaded } = this.state;

    if(toRedirect) return <Redirect to='/moviepage' push={true} />;

    const newsResult = this.state.results.map((result, i) => { 
      i++;
      return (
        <div id={"segment_" + i}
              key={result.imdbID}
              data-ref={result.imdbID}
              className={movie_card_container + this.state.opacity_v75}
              onMouseEnter={hideElement}
              onMouseLeave={showElement}
              onClick={e => this.saveMovieIdAndGo(e)}>
          <img src={result.poster} alt='' />
          <div id={"sub_segment_" + i}>
          </div>
        </div>
        );
    });

    return (
      <div id="homePage">
        { isLoaded ? (null) : (alert("Failed to connect to server!")) }
        <div className="homepage_container">
          <section className="news_container">
            <div className="news">
              {newsResult}
            </div>
          </section>

        <section className="posts_container">
          <div className="posts_nav">
            <span>New posts</span>
          </div>
          <div className="posts_content">
            <div id="11"
            className="posts"
            onMouseEnter={showTitle}
            onMouseLeave={hideTitle}>
              <div className="posts_title opacity_v50">
                <span>A new post</span>
              </div>
              <img src="b.jpg" alt='' />
            </div>
          </div>
        </section>
      </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);