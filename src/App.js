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
    console.log(this.state.messages)

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

  messageWasClicked = (id) => {
    this.setState(
      this.state.messages.map(message => {
        if (message.id === id) {
          message.read = true
        }
      })
    )
  }

  selectAll = () => {
    if (this.state.allSelected) {
      this.setState({ allSelected: false })
      this.setState(this.state.messages.map(message => message.selected = false))
    } else {
      this.setState({ allSelected: true })
      this.setState(this.state.messages.map(message => message.selected = true))
    }
  }

  selectOneMessage = (id) => {
    //map through arrray
    this.setState(
      this.state.messages.map(message => {
        if (message.id === id) {
          message.selected = !message.selected
        }
      })
    )
  }

  markMessagesRead = () => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          message.read = true
        }
      })
    )
  }

  markMessagesUnread = () => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          message.read = false
        }
      })
    )
  }

  addLabels = (label) => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          return message.labels.push(label)
        }
      })
    )
  }

  removeLabels = (label) => {
    console.log('copper')
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          return message.labels.splice(message.labels.indexOf(label), 1)
        }
      })
    )
  }

  composeMessage = (event, subject, message) => {
    event.preventDefault();
    let data = {
      body: message,
      id: this.state.messages.length + 1,
      labels: [],
      subject: subject,
      read: false,
      starred: false,
    }
    this.createItem(data)
  }

  async createItem(item) {
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const newMessage = await response.json()
    console.log(newMessage)
    this.setState({ messages: [...this.state.messages, newMessage] })
  }

  async patchItem(id, command, attribute, value) {
    let patch = {
      messageIds: id,
      command: command,
      [attribute]: value
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const posted = await response.json();
    this.setState({ messages: posted });
  }

  deleteMessage = () => {
    this.state.messages.map(message => {
      return message.selected ? this.patchItem(message.id, 'delete') : '';
    })
  }

  render() {
    return (
      <>
        <Header />
        <Toolbar toggleComposeMessage={this.toggleComposeMessage}
          showComposeMessage={this.state.showComposeMessage}
          selectAll={this.selectAll}
          allSelected={this.state.allSelected}
          markMessagesRead={this.markMessagesRead}
          markMessagesUnread={this.markMessagesUnread}
          messages={this.state.messages}
          addLabels={this.addLabels}
          removeLabels={this.removeLabels}
          composeMessage={this.composeMessage}
          deleteMessage={this.deleteMessage}
        />
        <Messages messages={this.state.messages}
          toggleClass={this.toggleClass}
          toggleRead={this.toggleRead}
          toggleSelected={this.toggleSelected}
          allSelected={this.state.allSelected}
          read={this.state.read}
          checked={this.state.checked}
          selectOneMessage={this.selectOneMessage}
          messageWasClicked={this.messageWasClicked}
        />
      </>
    );
  }
}

export default App;
