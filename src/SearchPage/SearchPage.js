import React, { Component } from 'react';
import { Input ,Button } from 'reactstrap';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { getSendingProps } from '../Helpers/SendingProps';
import { Redirect } from 'react-router-dom';
import { pushSearchPhrase,
        setupMovieId } from '../redux/reducer';
import { getMoviesByTitle, 
        getMovies,
        getMoviesByTitleWithUser } from '../Helpers/API';
import SaveMovie from '../Buttons/SaveMovie';

import './searchpage.css';

const masonryOptions = {
  transitionDuration: 0
};

const mapStateToProps = state => {
  return {
    userID: state.userID,
    isLogged: state.isLogged,
    userName: state.userName,
    phrase: state.phrase
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushSearchPhrase: (phrase) => dispatch(pushSearchPhrase(phrase)),
    setupMovieId: (movieid) => dispatch(setupMovieId(movieid)),
  };
}

class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      name: this.props.userName,
      toRedirect: false,
    }
  }

  componentDidMount() {
    if (this.props.phrase === null) {
      this.fetchSearchingData();
    } else {
      this.fetchSearchingData(this.props.phrase);
      this.props.pushSearchPhrase(null);
    }
  }

  saveMovieIdAndGo = (e) => {
    this.props.setupMovieId(e.currentTarget.attributes.getNamedItem("data-ref").value);

    this.setState({
      toRedirect: true,
    });
  }

  fetchSearchingData = (e) => {
    var URL = '';

    if(e == null) {
      URL = getMovies();
    } else {
      if(this.props.isLogged) {
        URL = getMoviesByTitleWithUser(e, this.props.userID);
      } else {
        URL = getMoviesByTitle(e);
      }
    }

    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          results: json.smovies
        })
      });
  }

  render() {

    if(this.state.toRedirect) return <Redirect to='/moviepage' push={true} />;

    const searchResult = this.state.results.map((result) => { 
      return (
           <li key={result.imdbID}  className="image-element-class">
            <div className="card film_card">
                <img className="card-img-top"
                    width="300px"
                    height="400px"
                    alt={result.title} 
                    data-ref={result.imdbID}
                    onClick={this.saveMovieIdAndGo}
                    onError={(e)=>{e.target.onerror = null; 
                    e.target.src='https://m.media-amazon.com/images/M/MV5BNzIxNTM5NTM2OV5BMl5BanBnXkFtZTgwNDQ2OTkwMzE@._V1_SX300.jpg'}}
                    src={result.poster} />
                  <div className="card-body">
                    <p className="card-title">{result.title}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Type: {result.type}</li>
                    <li className="list-group-item">Year: {result.year}</li>
                    { (!result.saved && this.props.isLogged) ? ( <li className="list-group-item noliststyle">
                      <SaveMovie  movieIMDBID={result.imdbID} userID={this.props.userID} />
                    </li> ) : (null) }
                  </ul>
            </div> 
           </li>
        );
    });

      return (
              <div className="App">
                      <div className="input-group">
                        <Input type="search" 
                              className='input'
                              name="search" 
                              id="search" 
                              onChange={e => this.fetchSearchingData(e.target.value)} 
                              placeholder="Search films..."/>
                        <span className="input-group-btn">
                          <Button className="btn-success">go</Button>
                        </span>
                      </div>
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




export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);