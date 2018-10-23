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
      showComposeMessage: false,
      halfChecked: true
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messages: json })
    console.log(this.state.messages)
    this.checkedAmount();

  }

  //make a patch request

  toggleComposeMessage = () => this.setState({ showComposeMessage: !this.state.showComposeMessage })

  messageWasClicked = (id) => {
    this.setState(
      this.state.messages.map(message => {
        if (message.id === id) {
          this.patchItem([message.id], 'read', 'read', true);
        }
      })
    )
  }

  selectAll = async () => {
    let allMessageIds = this.state.messages.map(message => message.id)
    if (this.state.allSelected) {
      await this.patchItem(allMessageIds, 'allFalse')
      this.setState({ allSelected: false })
      this.checkedAmount()

    } else {
      await this.patchItem(allMessageIds, 'allTrue')
      this.setState({ allSelected: true })
      this.checkedAmount()
    }
  }

  selectOneMessage = async (id) => {
    await this.patchItem([id], 'select', 'selected', true);
    this.checkedAmount()
  }

  markMessagesRead = () => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          message.read = true
          this.patchItem([message.id], 'read', 'read', true);
        }
      })
    )
  }

  patchItem = async (id, command, attribute, value) => {
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

  markMessagesUnread = () => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          message.read = false
          this.patchItem([message.id], 'read', 'read', false);
        }
      })
    )
  }

  addLabels = (label) => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          this.patchItem([message.id], 'addLabel', 'label', label);
        }
      })
    )
  }

  removeLabels = (label) => {
    this.setState(
      this.state.messages.map(message => {
        if (message.selected) {
          this.patchItem([message.id], 'removeLabel', 'label', label);
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
    this.setState({ messages: [...this.state.messages, newMessage] })
  }



  deleteMessage = () => {
    let filteredArr = this.state.messages.filter(message => message.selected)
    let messageIds = filteredArr.map(item => item.id)
    this.patchItem(messageIds, 'delete', 'delete', true);
  }

  checkedAmount = () => {
    let count = 0;
    this.state.messages.map(message => {
      return message.selected ? count++ : '';
    })
    if (count > 0 && (count < this.state.messages.length)) {
      this.setState({ halfChecked: true })
      this.setState({ allSelected: false })
    } else if (count === 0) {
      this.setState({ halfChecked: false })
      this.setState({ allSelected: false })
    } else {
      this.setState({ halfChecked: false })
      this.setState({ allSelected: true })
    }
  }

  starClick = (id) => {
    this.state.messages.map(message => {
      if (message.id === id) {
        this.patchItem([message.id], 'star', 'star', true);
      }
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
          halfChecked={this.state.halfChecked}
          checkedAmount={this.checkedAmount}
        />
        <Messages messages={this.state.messages}
          toggleClass={this.toggleClass}
          toggleSelected={this.toggleSelected}
          allSelected={this.state.allSelected}
          read={this.state.read}
          checked={this.state.checked}
          selectOneMessage={this.selectOneMessage}
          messageWasClicked={this.messageWasClicked}
          checkedAmount={this.checkedAmount}
          starClick={this.starClick}
        />
      </>
    );
  }
}

export default App;
