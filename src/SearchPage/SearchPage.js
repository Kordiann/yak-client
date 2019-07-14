import React, { Component } from 'react';
import { Input ,Button } from 'reactstrap';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { getSendingProps } from '../Helpers/SendingProps';

import './searchpage.css';

const API_URL_WITH_PARAM = 'http://localhost:8080/movies?title=';
const API_URL_FOR_ALL_MOVIES = 'http://localhost:8080/movies/main?count=10';
const API_ULR_TO_SAVE_MOVIE = 'http://localhost:8080/movies/save/movie?movieIMDBID=';

const masonryOptions = {
  transitionDuration: 0
};

const mapStateToProps = state => {
  return {
    userName: state.userName,
    phrase: state.phrase
  };
};

class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      name: this.props.userName,
    }

    this.saveMe = this.saveMe.bind(this);
  }

  componentDidMount() {
    if (this.props.phrase === null) {
      this.fetchSearchingData();
    } else {
      this.fetchSearchingData(this.props.phrase);
    }
  }

  fetchSearchingData = (e) => {
    var URL = '';

    if(e == null) {
      URL = API_URL_FOR_ALL_MOVIES;
    } else {
      URL = `${API_URL_WITH_PARAM}${e}`;
    }

    fetch(URL, getSendingProps())
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          results: json
        })
      });
  }

  saveMe = (e, imdbID) => {
    e.preventDefault();

    let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'multipart/form-data'
    });

    let sentData = {
      method: 'POST',
      header: header,
      mode: 'cors',
    }

    var URL = `${API_ULR_TO_SAVE_MOVIE}${imdbID}${'&userName='}${this.props.userName}`;

    fetch(URL, sentData)
      .then()
  }
  
  render() {
    const searchResult = this.state.results.map((result) => { 
      return (
           <li key={result.imdbID}  className="image-element-class">
            <div className="card film">
                <img className="card-img-top"
                    width="300px"
                    height="400px"
                    alt={result.title} 
                    onError={(e)=>{e.target.onerror = null; 
                    e.target.src='https://m.media-amazon.com/images/M/MV5BNzIxNTM5NTM2OV5BMl5BanBnXkFtZTgwNDQ2OTkwMzE@._V1_SX300.jpg'}}
                    src={result.poster} />
                  <div className="card-body">
                    <h5 className="card-title">{result.title}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Type: {result.type}</li>
                    <li className="list-group-item">Year: {result.year}</li>
                    {this.props.userName != null ? ( <li className="list-group-item noliststyle">
                      <button type="button " onClick={(e) => this.saveMe(e, result.imdbID)}  className="btn btn-success">Save</button>
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
                              name="search" 
                              id="search" 
                              onChange={e => this.fetchSearchingData(e.target.value)} 
                              placeholder="Search films..." 
                              value={this.props.phrase}/>
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




export default connect(mapStateToProps)(SearchPage);