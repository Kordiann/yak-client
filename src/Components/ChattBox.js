import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card ,Input ,Button} from 'reactstrap';

class ChattBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'multipart/form-data'
    });

    let sentData = {
      header: header,
      mode: 'cors',
    }

    fetch('http://localhost:8080/message/all', sentData)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        })
      });

  }

  render() {

    var { isLoaded, items } = this.state;

    if(!isLoaded) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    else {
      return (
        <div className="App">

          <Card className="card">
            <ul className="chatt_content">
              {items.map((item) => (
                
                  <li key={item.id}>
                    {item.content}  <Moment format = "HH:mm" {...item.sentData} />
                  </li>
                
              ))}
            </ul>

            <div class="input-group">
                <Input type="message" name="message" id="content" placeholder="Lets talk about..." />
                <span class="input-group-btn">
                  <Button className="btn-success">Send</Button>
                </span>
                </div>

          </Card>

        </div>
      );
    }
  }
}

export default ChattBox;
