import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { showElement,
  hideElement,
  showTitle,
  hideTitle } from '../Helpers/Animations';

import './homepage.css';

const movie_card_container = 'movie_card_container ';

class HomePage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      name: this.props.userName,
    }
  }

  render() {

    return (
      <div id="homePage">
        <div className="homepage_container">
          <section className="news_container">
            <div className="news">
              <div id="segment_1"
              className={movie_card_container + this.state.opacity_v75}
              onMouseEnter={hideElement}
              onMouseLeave={showElement}>
                <img src="a.jpg" alt='' />
                <div id="sub_segment_1">
                </div>
              </div>
              <div id="segment_2" 
              className={movie_card_container + this.state.opacity_v75}
              onMouseEnter={hideElement} 
              onMouseLeave={showElement}>
                <img src="aa.jpg" alt='' />
                <div id="sub_segment_2">
                </div>
              </div>
              <div id="segment_3" 
              className={movie_card_container + this.state.opacity_v75}
              onMouseEnter={hideElement} 
              onMouseLeave={showElement}>
                <img src="aaa.jpg" alt='' />
                <div id="sub_segment_3">
                </div>
              </div>
              <div id="segment_4" 
              className={movie_card_container + this.state.opacity_v75}
              onMouseEnter={hideElement} 
              onMouseLeave={showElement}>
                <img src="aaaa.jpg" alt='' />
                <div id="sub_segment_4">
                </div>
              </div>
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
                <span>A new Naruto main</span>
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

const mapStateToProps = state => {
  return {
    userName: state.userName,
  };
};

export default connect(mapStateToProps)(HomePage);