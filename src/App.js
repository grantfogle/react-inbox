import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Toolbar from './Toolbar'
import Messages from './Messages'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      read: false,
      checked: false,
      counter: 0,
      showComposeMessage: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messages: json })
    console.log(this.state.messages[0].labels)
  }

  //make a patch request

  toggleRead = (obj) => {
    this.setState(prevState => ({
      obj: {
        ...prevState.obj,
        read: true
      }
    }))
    console.log(obj.read)
  }

  toggleComposeMessage = () => {
    this.setState({ showComposeMessage: !this.state.showComposeMessage })
    console.log('cats')
  }

  toggleClass = (event) => {
    this.setState({ read: !this.state.read })
  }

  toggleSelected = (event) => {
    this.setState({ checked: !this.state.checked })
    // event.target.parentNode.parentNode.parentNode.parentNode.classList.toggle('selected');
  }

  render() {
    return (
      <>
        <Header />
        <Toolbar toggleComposeMessage={this.toggleComposeMessage}
          showComposeMessage={this.state.showComposeMessage}
        />
        <Messages messages={this.state.messages}
          toggleClass={this.toggleClass}
          toggleRead={this.toggleRead}
          toggleSelected={this.toggleSelected}
          read={this.state.read}
          checked={this.state.checked} />
      </>
    );
  }
}

export default App;
