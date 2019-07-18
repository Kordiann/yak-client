import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { getSendingProps } from '../Helpers/SendingProps';
import { Redirect } from 'react-router-dom';
import { setupMovieId } from '../redux/reducer';
import { getUserMovies } from '../Helpers/API';

import './mymoviespage.css';

const masonryOptions = {
    transitionDuration: 0
};  

const mapStateToProps = state => {
  return {
    userID: state.userID,
    movieid: state.movieid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setupMovieId: (movieid) => dispatch(setupMovieId(movieid)),
  };
}

class MyMoviesPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      toRedirect: false,
    }
  }

  componentDidMount() {
    this.fetchSearchingData();
  }

  fetchSearchingData = (e) => {
    var URL = getUserMovies(this.props.userID);
    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          results: json
        })
      });
  }

  saveMovieIdAndGo = (e) => {
    this.props.setupMovieId(e.currentTarget.attributes.getNamedItem("data-ref").value);

    this.setState({
      toRedirect: true,
    });
  }

  render() {
    if(this.state.toRedirect) return <Redirect to='/moviepage' push={true} />;

    const searchResult = this.state.results.map((result) => { 
        return (
             <li key={result.imdbID} 
                className="image-element-class">
              <div className="card film"
              data-ref={result.imdbID}
              onClick={e => this.saveMovieIdAndGo(e)}>
                  <img className="card-img-top"
                      width="300px"
                      height="300px"
                      alt={result.title} 
                      onError={(e)=>{e.target.onerror = null; 
                      e.target.src='https://m.media-amazon.com/images/M/MV5BNzIxNTM5NTM2OV5BMl5BanBnXkFtZTgwNDQ2OTkwMzE@._V1_SX300.jpg'}}
                      src={result.poster} />
                    <div className="card-body">
                      <p className="card-title">{result.title}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Type: {result.type}</li>
                      <li className="list-group-item">Year: {result.year}</li>
                      {this.props.userName != null ? ( <li className="list-group-item noliststyle">
                        <button type="button " onClick={(e) => this.saveMe(e, result.imdbID)}  className="btn ">Save</button>
                      </li> ) : (null) }
                    </ul>
              </div> 
             </li>
          );
      });
      return (
          <div id="mymoviespage">
              <Masonry
                      className={'my-gallery-class'}
                      elementType={'ul'} 
                      options={masonryOptions} 
                      disableImagesLoaded={false} 
                      updateOnEachImageLoad={false} 
                      >
                        {searchResult}
                  </Masonry>
          </div>
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMoviesPage);