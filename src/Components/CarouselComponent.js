import React, { Component } from './node_modules/react';
import "./node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from './node_modules/react-responsive-carousel';
import { getSendingProps } from '../Helpers/getSendingProps';
import ReactResizeDetector from './node_modules/react-resize-detector';
 
var URL = "http://localhost:8080/movie/main";

class CarouselComponent extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          centerPercentage: 30,
          results: []
        }
    }

    componentDidMount() {
        this.fetchSearchingData();
    }

    fetchSearchingData = (e) => {
    
      fetch(URL, getSendingProps)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            results: json
          })
        });
    }

    render() {
        const childElements = this.state.results.map((result) => { 
            return (
            <div key={result.imdbID} className="carousel-div">
                <img  height="400px" src={result.poster} alt="pobrane" />
            </div>);
        });

        return (
            <Carousel 
            showStatus={false} 
            showArrows={false} 
            showIndicators={false} 
            showThumbs={false}
            autoPlay={true}
            interval={7000}
            emulateTouch={true}
            centerMode={true}
            centerSlidePercentage={this.state.centerPercentage}
            selectedItem={3}>
            {   childElements   }
                <ReactResizeDetector handleWidth onResize={this.onResize} />
            </Carousel>
        );
    }
// TODO Think about this
}

export default CarouselComponent;