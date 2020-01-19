import React, { Component } from 'react';
import axios from 'axios';
import Header from './includes/Header';
import Footer from './includes/Footer';
import Modal from './includes/Modal';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: '',
      data: []
    };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleAuthorChange(event) {
    this.setState({author: event.target.value});
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  async handleSubmit(event) {

    try {
          const response = await axios.post('http://localhost:3000' + '/api/posts', {
              text: this.state.text,
              author: this.state.author,
          });
      
      } catch (error) {
        console.log(error);
      }

      event.preventDefualt();

  }

  render() {
    return (
        <div>
          <Header />
          { this.props.children }
          <Footer />
          <Modal 
            handleAuthorChange={this.handleAuthorChange}
            handleTextChange={this.handleTextChange}
            handleSubmit={this.handleSubmit}/>
        </div>
    );
  }
}

export default App;
