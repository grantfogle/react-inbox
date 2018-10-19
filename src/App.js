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
      allSelected: false,
      counter: 0,
      showComposeMessage: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messages: json })

  }

  //make a patch request

  toggleRead = (obj) => {
    this.setState(prevState => ({
      obj: {
        ...prevState.obj,
        read: true
      }
    }))
  }

  toggleComposeMessage = () => this.setState({ showComposeMessage: !this.state.showComposeMessage })

  toggleClass = (event) => {
    this.setState({ read: !this.state.read })
  }

  selectAll = () => {
    if (this.state.allSelected) {
      this.setState({ allSelected: false })
      this.setState(this.state.messages.map(message => message.checked = false))
    } else {
      this.setState({ allSelected: true })
      this.setState(this.state.messages.map(message => message.checked = true))
    }
    console.log(this.state.messages)
  }
  selectOneMessage = (id, ) => this.state.message.filter(message => {
    if (message.id === id) {
      this.setState({ checked: !this.state.message[id].checked })
    }
  })

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
          selectAll={this.selectAll}
          allSelected={this.state.allSelected}
        />
        <Messages messages={this.state.messages}
          toggleClass={this.toggleClass}
          toggleRead={this.toggleRead}
          toggleSelected={this.toggleSelected}
          allSelected={this.state.allSelected}
          read={this.state.read}
          checked={this.state.checked}
        />
      </>
    );
  }
}

export default App;
