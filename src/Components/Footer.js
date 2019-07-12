import React from 'react';

import { iconOpacityOn,
        iconOpacityOff } from '../Helpers/Animations';

import './footer.css';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render(){
    return (
        <div id="footer">
            <div className="footer_container">
                <div className="footer_content">
                <span>This page was made by dev named
                    <a href='https://github.com/Kordiann' 
                    target="_blank"
                    rel="noopener noreferrer">
                    <i id='git_Icon' className="fab fa-github"></i> 
                    </a>
                    <a href='https://github.com/Kordiann' 
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={iconOpacityOn}
                    onMouseLeave={iconOpacityOff}> Kordiann </a>
                    just for practise.</span>
                </div>
            </div>
      </div>
    );
  }
}

export default Footer;
